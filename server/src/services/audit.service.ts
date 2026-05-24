import { runAudit } from "../config/auditEngine.config";
import { AuditInput } from "../types/audit";
import { generateSummary } from "../lib/auditSummary";
import { sendAuditEmail } from "../lib/email";
import { prisma } from "../config/prisma";

export class AuditServices {
  static async getResult(inputData: AuditInput) {
    const auditResult = runAudit(inputData);
    const { summary, fallback } = await generateSummary(auditResult, inputData);

    return prisma.audit.create({
      data: {
        teamSize: inputData.teamSize,
        estimatedBudget: inputData.estimatedBudget,
        profileName: inputData.profile?.name ?? null,
        profileCompany: inputData.profile?.company ?? null,
        profileRole: inputData.profile?.role ?? null,
        profileEmail: inputData.profile?.email ?? null,
        totalCurrentSpend: auditResult.totalCurrentSpend,
        totalMonthlySavings: auditResult.totalMonthlySavings,
        totalAnnualSavings: auditResult.totalAnnualSavings,
        aiSummary: summary,
        summaryFallback: fallback,
        tools: {
          create: inputData.tools.map((t) => ({
            toolId: t.toolId.toUpperCase() as any,
            planId: t.planId,
            seats: t.seats,
            monthlySpendOverride: t.monthlySpendOverride ?? null,
          })),
        },
        useCases: {
          create: inputData.useCases.map((uc) => {
            let mapped = uc.toUpperCase();
            if (mapped === "DATA ANALYSIS") mapped = "DATA";
            if (mapped === "CUSTOMER SUPPORT") mapped = "SUPPORT";
            return { useCase: mapped as any };
          }),
        },
        recommendations: {
          create: auditResult.recommendations.map((r) => ({
            toolId: r.toolId.toUpperCase() as any,
            toolName: r.toolName,
            currentPlanId: r.currentPlanId,
            currentPlanName: r.currentPlanName,
            currentSpend: r.currentSpend,
            recommendationType: r.recommendationType.toUpperCase() as any,
            recommendedAction: r.recommendedAction,
            recommendedPlanId: r.recommendedPlanId ?? null,
            savings: r.savings,
            reasoning: r.reasoning,
          })),
        },
      },
    });
  }

  static async getAuditResult(id: string) {
    const audit = await prisma.audit.findUnique({
      where: { id },
      select: {
        id: true,
        teamSize: true,
        estimatedBudget: true,
        totalCurrentSpend: true,
        totalMonthlySavings: true,
        totalAnnualSavings: true,
        aiSummary: true,
        summaryFallback: true,
        createdAt: true,
        tools: { select: { toolId: true, planId: true, seats: true } },
        useCases: { select: { useCase: true } },
        recommendations: {
          select: {
            toolId: true,
            toolName: true,
            currentPlanId: true,
            currentPlanName: true,
            currentSpend: true,
            recommendationType: true,
            recommendedAction: true,
            savings: true,
            reasoning: true,
          },
        },
      },
    });

    if (!audit) throw new Error("Audit not found");

    return audit;
  }

  static async sendAuditResultViaEmail(id: string, email: string) {
    const audit = await prisma.audit.findUnique({
      where: { id },
      select: { totalMonthlySavings: true, profileCompany: true },
    });

    if (!audit) throw new Error("Audit not found");

    const isHighValue = audit.totalMonthlySavings > 500;

    await prisma.lead.upsert({
      where: { auditId: id },
      create: {
        auditId: id,
        email,
        monthlySavings: audit.totalMonthlySavings,
        isHighValue,
      },
      update: { email },
    });

    return sendAuditEmail({
      email,
      companyName: audit.profileCompany ?? undefined,
      monthlySavings: audit.totalMonthlySavings,
      isHighValue,
      resultUrl: `${process.env.APP_URL}/audit/${id}`,
    });
  }
}
