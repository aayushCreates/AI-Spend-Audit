-- CreateEnum
CREATE TYPE "ToolId" AS ENUM ('CURSOR', 'GITHUB_COPILOT', 'CLAUDE', 'CHATGPT', 'ANTHROPIC_API', 'OPENAI_API', 'GEMINI', 'WINDSURF');

-- CreateEnum
CREATE TYPE "UseCaseType" AS ENUM ('CODING', 'WRITING', 'DATA', 'RESEARCH', 'SUPPORT', 'MIXED');

-- CreateEnum
CREATE TYPE "RecommendationType" AS ENUM ('OPTIMAL', 'DOWNGRADE', 'OVERSPENDING', 'SWITCH');

-- CreateTable
CREATE TABLE "AuditTool" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "toolId" "ToolId" NOT NULL,
    "planId" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "monthlySpendOverride" DOUBLE PRECISION,

    CONSTRAINT "AuditTool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditUseCase" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "useCase" "UseCaseType" NOT NULL,

    CONSTRAINT "AuditUseCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditRecommendation" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "toolId" "ToolId" NOT NULL,
    "toolName" TEXT NOT NULL,
    "currentPlanId" TEXT NOT NULL,
    "currentPlanName" TEXT NOT NULL,
    "currentSpend" DOUBLE PRECISION NOT NULL,
    "recommendationType" "RecommendationType" NOT NULL,
    "recommendedAction" TEXT NOT NULL,
    "recommendedPlanId" TEXT,
    "savings" DOUBLE PRECISION NOT NULL,
    "reasoning" TEXT NOT NULL,

    CONSTRAINT "AuditRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audit" (
    "id" TEXT NOT NULL,
    "teamSize" INTEGER NOT NULL,
    "estimatedBudget" DOUBLE PRECISION NOT NULL,
    "profileName" TEXT,
    "profileCompany" TEXT,
    "profileRole" TEXT,
    "profileEmail" TEXT,
    "totalCurrentSpend" DOUBLE PRECISION NOT NULL,
    "totalMonthlySavings" DOUBLE PRECISION NOT NULL,
    "totalAnnualSavings" DOUBLE PRECISION NOT NULL,
    "aiSummary" TEXT,
    "summaryFallback" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyName" TEXT,
    "role" TEXT,
    "monthlySavings" DOUBLE PRECISION,
    "isHighValue" BOOLEAN NOT NULL DEFAULT false,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leads_auditId_key" ON "leads"("auditId");

-- CreateIndex
CREATE INDEX "leads_isHighValue_idx" ON "leads"("isHighValue");

-- CreateIndex
CREATE INDEX "leads_email_idx" ON "leads"("email");

-- AddForeignKey
ALTER TABLE "AuditTool" ADD CONSTRAINT "AuditTool_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditUseCase" ADD CONSTRAINT "AuditUseCase_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditRecommendation" ADD CONSTRAINT "AuditRecommendation_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
