import { getPlanById, getToolById } from "../constants/pricingData";
import {
  AuditInput,
  AuditResult,
  ToolId,
  ToolRecommendation,
} from "../types/audit";

function computeCurrentSpend(
  planId: string,
  toolId: string,
  seats: number,
  override?: number,
): number {
  if (override !== undefined) return override;

  const plan = getPlanById(toolId, planId);
  if (!plan) return 0;

  if (plan.isApiDirect) return override ?? 0;

  return plan.pricePerSeat * seats;
}

function auditTool(
  input: AuditInput,
  toolInput: {
    toolId: string;
    planId: string;
    seats: number;
    monthlySpendOverride?: number;
  },
): ToolRecommendation {
  const { toolId, planId, seats, monthlySpendOverride } = toolInput;
  const tool = getToolById(toolId);
  const currentPlan = getPlanById(toolId, planId);
  const useCases = input.useCases;

  if (!tool || !currentPlan) {
    throw new Error(`Unknown tool or plan: ${toolId}/${planId}`);
  }

  const currentSpend = computeCurrentSpend(
    planId,
    toolId,
    seats,
    monthlySpendOverride,
  );

  if (toolId == "cursor") {
    if (planId === "business" && seats <= 2) {
      const savings = (40 - 20) * seats;

      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend,
        recommendationType: "downgrade",
        recommendedPlanId: "pro",
        recommendedAction: `Switch ${seats} seat(s) from Business to Pro. It saves $${savings}/month with no meaningful feature loss for teams under 5.`,
        savings,
        reasoning: `Cursor Business ($40/seat) adds SSO, usage analytics, and enforced policies, features that matter at 10+ engineers. At ${seats} seat(s), you're paying a 100% premium over Pro ($20/seat) for admin controls you don't need yet. Switch to Pro and revisit at 10+ engineers.`,
      };
    }

    if (planId === "hobby" && useCases.includes("coding")) {
      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend: 0,
        recommendationType: "optimal",
        recommendedAction:
          "Hobby plan is fine if usage is light. Upgrade to Pro ($20/seat) if you hit request limits.",
        savings: 0,
        reasoning:
          "Cursor Hobby gives limited fast requests per month. If your developer hits the cap regularly, Pro at $20/seat pays for itself in productivity within a day.",
      };
    }

    if (planId === "pro") {
      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend,
        recommendationType: "optimal",
        recommendedAction: "Pro plan is right-sized for your team.",
        savings: 0,
        reasoning: `Cursor Pro at $20/seat is the sweet spot for teams under 10 engineers focused on coding. You get unlimited completions and fast requests without paying for enterprise admin features.`,
      };
    }
  }

  if (toolId === "github_copilot") {
    if (planId === "enterprise" && seats < 20) {
      const savings = (39 - 19) * seats;

      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend,
        recommendationType: "overspending",
        recommendedPlanId: "business",
        recommendedAction: `Downgrade to Business to saves $${savings}/month. Enterprise features (audit logs, SAML SSO) aren't relevant under 20 seats.`,
        savings,
        reasoning: `GitHub Copilot Enterprise ($39/seat) is designed for orgs with compliance requirements, SAML SSO, and audit trails. Under 20 seats, Business ($19/seat) provides the same AI coding assistance. You're paying a 105% premium for features you don't need yet.`,
      };
    }

    if (planId === "business" && seats === 1) {
      const savings = 19 - 10;

      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend,
        recommendationType: "downgrade",
        recommendedPlanId: "individual",
        recommendedAction: `Switch to Individual plan to saves $${savings}/month for a solo user.`,
        savings,
        reasoning: `GitHub Copilot Business ($19/seat) is built for teams: it adds policy controls and org management. As a solo user, Individual ($10/month) gives you identical AI assistance at nearly half the price.`,
      };
    }

    if (
      useCases.includes("coding") &&
      (planId === "individual" || planId === "business")
    ) {
      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend,
        recommendationType: "switch",
        recommendedAction: `Consider Cursor Pro ($20/seat) — purpose-built for AI-first coding with better context awareness than Copilot.`,
        savings: planId === "individual" ? 10 * seats - 20 * seats : 0,
        reasoning: `Copilot excels at inline completions inside VS Code/JetBrains. Cursor is an AI-native IDE with deeper codebase context, multi-file edits, and a more capable chat interface. Teams primarily doing AI-assisted development typically report higher productivity with Cursor. If your team is VS Code-first and happy, stay — but worth a trial.`,
      };
    }
  }

  if (toolId === "claude") {
    if (planId === "team" && seats === 1) {
      const savings = 30 - 20;

      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend,
        recommendationType: "downgrade",
        recommendedPlanId: "pro",
        recommendedAction: `Switch to Pro ($20/mo) from Team is for 2+ users. You're paying $10/mo extra for collaboration features you can't use solo.`,
        savings,
        reasoning: `Claude Team ($30/seat, min 2 seats) adds shared projects and admin controls for teams. As a single user, Claude Pro ($20/mo) provides the same model access and usage limits without the team overhead.`,
      };
    }

    if (
      planId === "max" &&
      !useCases.includes("research") &&
      !useCases.includes("data")
    ) {
      const savings = 100 - 20;

      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend,
        recommendationType: "downgrade",
        recommendedPlanId: "pro",
        recommendedAction: `Downgrade to Pro ($20/mo) from Max is for heavy research/data workloads. Saves $${savings}/mo.`,
        savings,
        reasoning: `Claude Max ($100/mo) provides 5x higher usage limits than Pro to justified for power users doing intensive research, long document analysis, or data work. For coding and writing use cases, Pro limits are rarely hit. Try Pro for a month; upgrade only if you hit the cap.`,
      };
    }

    if (planId === "pro" || planId === "api_direct") {
      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend: monthlySpendOverride ?? currentSpend,
        recommendationType: "optimal",
        recommendedAction: "Plan is well-matched to your usage.",
        savings: 0,
        reasoning: `Claude Pro ($20/mo) offers strong value for writing, research, and mixed workloads. API Direct is correct if you're integrating Claude into your own product to pay as you go scales better than flat-rate plans for variable usage.`,
      };
    }
  }

  if (toolId === "chatgpt") {
    if (planId === "team" && seats === 1) {
      const savings = 30 - 20;

      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend,
        recommendationType: "downgrade",
        recommendedPlanId: "plus",
        recommendedAction: `Switch to Plus ($20/mo) from Team plan requires 2+ users. Saves $${savings}/mo solo.`,
        savings,
        reasoning: `ChatGPT Team ($30/seat) adds admin controls, higher limits, and data privacy guarantees that built for orgs. Solo users get the same GPT-4o access on Plus at $20/mo.`,
      };
    }

    if (
      planId === "plus" &&
      input.tools.some((t) => t.toolId === "claude" && t.planId === "pro")
    ) {
      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend,
        recommendationType: "switch",
        recommendedAction: `You're paying for both ChatGPT Plus and Claude Pro ($40/mo combined). Consider consolidating to one.`,
        savings: 20,
        reasoning: `ChatGPT Plus and Claude Pro heavily overlap for writing, research, and general tasks. Unless you have specific workflows requiring both (e.g., comparing outputs, different system prompts), consolidating saves $20/mo. Claude Pro edges out for long documents and reasoning; ChatGPT Plus for browsing and image generation.`,
      };
    }
  }

  if (toolId === "gemini") {
    if (planId === "advanced" && useCases.includes("coding")) {
      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend,
        recommendationType: "switch",
        recommendedAction: `For coding workflows, Cursor Pro ($20/seat) or GitHub Copilot ($10-19/seat) outperforms Gemini Advanced.`,
        savings: 0,
        reasoning: `Gemini Advanced ($20/mo) is strong for Google Workspace integration and multimodal tasks. For pure coding assistance, purpose-built tools like Cursor or Copilot provide better IDE integration, codebase context, and inline completion quality. If coding is your primary use case, consider switching.`,
      };
    }
  }

  if (toolId === "windsurf") {
    if (planId === "teams" && seats <= 2) {
      const savings = (35 - 15) * seats;

      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend,
        recommendationType: "downgrade",
        recommendedPlanId: "pro",
        recommendedAction: `Switch to Pro ($15/seat) from Teams features aren't needed under 3 seats. Saves $${savings}/month.`,
        savings,
        reasoning: `Windsurf Teams ($35/seat) adds shared context, admin controls, and team analytics. Under 3 developers, Pro ($15/seat) provides the same AI coding capability at less than half the price.`,
      };
    }
  }

  if (toolId === "anthropic_api" || toolId === "openai_api") {
    const spend = monthlySpendOverride ?? 0;

    if (spend > 500) {
      return {
        toolId,
        toolName: tool.name,
        currentPlanId: planId,
        currentPlanName: currentPlan.name,
        currentSpend: spend,
        recommendationType: "overspending",
        recommendedAction: `At $${spend}/month in API spend, Credex discounted credits could reduce this by 15-30%.`,
        savings: Math.round(spend * 0.2),
        reasoning: `API spend above $500/month is where Credex credits become compelling. Credex sources AI infrastructure credits from companies that overforecast to the discount is real and passes through to you. At your current spend, that's an estimated $${Math.round(spend * 0.2)}/mo saved.`,
      };
    }
    return {
      toolId,
      toolName: tool.name,
      currentPlanId: planId,
      currentPlanName: currentPlan.name,
      currentSpend: spend,
      recommendationType: "optimal",
      recommendedAction:
        "API usage looks proportionate. Monitor with usage alerts.",
      savings: 0,
      reasoning: `Pay as you go API access is efficient at this spend level. Set budget alerts in your dashboard to catch unexpected spikes early.`,
    };
  }

  return {
    toolId: toolId as ToolId,
    toolName: tool.name,
    currentPlanId: planId,
    currentPlanName: currentPlan.name,
    currentSpend,
    recommendationType: "optimal",
    recommendedAction: "No changes recommended based on your profile.",
    savings: 0,
    reasoning:
      "Your current plan appears well-matched to your team size and use case.",
  };
}

export function runAudit(
  input: AuditInput,
): Omit<AuditResult, "id" | "aiSummary" | "summaryFallback"> {
  const recommendations = input.tools.map((t) => auditTool(input, t));

  const totalCurrentSpend = recommendations.reduce(
    (sum, r) => sum + r.currentSpend,
    0,
  );
  const totalMonthlySavings = recommendations.reduce(
    (sum, r) => sum + r.savings,
    0,
  );

  return {
    input: {
      teamSize: input.teamSize,
      useCases: input.useCases,
      estimatedBudget: input.estimatedBudget,
      tools: input.tools,
    },
    recommendations,
    totalCurrentSpend,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    createdAt: new Date().toISOString(),
  };
}
