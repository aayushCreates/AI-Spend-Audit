import Antrhopic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";
import { AuditInput, AuditResult } from "../types/audit";
import dotenv from 'dotenv';

dotenv.config();

const client = new Antrhopic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const geminiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateSummary(
  audit: Omit<AuditResult, "id" | "aiSummary" | "summaryFallback">,
  input: AuditInput,
): Promise<{ summary: string; fallback: boolean }> {
  const topSavings = audit.recommendations
    .filter((rec) => rec.savings > 0)
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 3)
    .map((rec) => `${rec.toolName}: ${rec.recommendedAction}`)
    .join("\n");

  const prompt = `You are a CFO-level advisor reviewing an AI tool spend audit for a startup.

    Audit data:
        - Team size: ${input.teamSize} people
        - Primary use cases: ${input.useCases.join(", ")}
        - Current monthly AI spend: $${audit.totalCurrentSpend}
        - Potential monthly savings: $${audit.totalMonthlySavings}
        - Top recommendations:
        ${topSavings || "No savings found — spending is already optimised."}

    Write a ~100-word personalized summary paragraph for this team. Be direct, specific, and encouraging. 
    Mention the biggest saving opportunity by name if savings > $0. 
    If savings are <$100, acknowledge they're spending well and suggest monitoring.
    Do not use bullet points. Write in second person ("Your team...").
    Do not mention Credex.`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 500,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const summary = message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join(" ");

    return { summary, fallback: false };
  } catch (err) {
    console.error("Anthropic API failed:", err);

    try {
      console.log("Attempting Gemini fallback...");
      const response = await geminiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const summary = response.text || "";

      console.log("Summary Response: ", summary);

      return { summary, fallback: false };
    } catch (geminiErr) {
      console.error("Gemini API failed:", geminiErr);

      const summary =
        audit.totalMonthlySavings > 0
          ? `Your team is spending $${audit.totalCurrentSpend}/month across AI tools, with $${audit.totalMonthlySavings}/month in identified savings — $${audit.totalAnnualSavings}/year. The biggest opportunity is ${audit.recommendations.find((r) => r.savings > 0)?.toolName ?? "plan optimisation"}. Acting on these recommendations now means your AI budget works harder without cutting capability.`
          : `Your team's AI spend of $${audit.totalCurrentSpend}/month is well-optimised across your current stack. You're on the right plans for your team size and use cases. We'll flag new optimisation opportunities as pricing changes or better alternatives emerge.`;

      return { summary, fallback: true };
    }
  }
}
