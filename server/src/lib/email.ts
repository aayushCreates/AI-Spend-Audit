import { Resend } from "resend";
import dotenv from 'dotenv'

dotenv.config();

interface EmailParams {
  email: string;
  companyName?: string;
  monthlySavings?: number;
  isHighValue: boolean;
  resultUrl: string;
}

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendAuditEmail({
  email,
  companyName,
  monthlySavings,
  isHighValue,
  resultUrl,
}: EmailParams) {
  try {
    const savingsLine =
      monthlySavings && monthlySavings > 0
        ? `Your audit found $${monthlySavings}/month ($${monthlySavings * 12}/year) in potential savings.`
        : `Your audit is complete from your stack looks well-optimised.`;

    const highValueLine = isHighValue
      ? `\n\nBecause your savings opportunity exceeds $500/month, a Credex advisor will reach out within 1 business day to walk through how discounted AI credits could help.`
      : "";

    const emailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM!,

      to: email,

      subject: `Your AI Spend Audit${monthlySavings ? ` — $${monthlySavings}/mo in savings found` : ""}`,

      html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Your AI Spend Audit is Ready</h2>

                <p>
                    Hi${companyName ? ` ${companyName}` : ""},
                </p>

                <p>
                    ${savingsLine}
                </p>

                <p>
                    <a href="${resultUrl}">
                    View Full Audit Report
                    </a>
                </p>

                ${isHighValue
          ? `
                    <p>
                        Because your savings opportunity exceeds $500/month,
                        a Credex advisor will reach out within 1 business day.
                    </p>
                    `
          : ""
        }

                <hr />

                <p>
                    — SpendLens by Credex
                </p>
                
            </div>`,
    });

    return emailResult;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
