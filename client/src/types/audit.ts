export type ToolId =
  | "cursor"
  | "github_copilot"
  | "claude"
  | "chatgpt"
  | "anthropic_api"
  | "openai_api"
  | "gemini"
  | "windsurf";

export type UseCase =
  | "coding"
  | "writing"
  | "data"
  | "research"
  | "support"
  | "mixed";
export type RecommendationType =
  | "optimal"
  | "downgrade"
  | "overspending"
  | "switch";

export interface Plan {
  id: string;
  name: string;
  pricePerSeat: number;
  isApiDirect?: boolean;
  minSeats?: number;
  maxSeats?: number;
  bestFor: UseCase[];
}

export interface Tool {
  id: ToolId;
  name: string;
  plans: Plan[];
}

export interface ToolInput {
  toolId: ToolId;
  planId: string;
  seats: number;
  monthlySpendOverride?: number;
}

export interface AuditInput {
  teamSize: number;
  useCases: UseCase[];
  estimatedBudget: number;
  tools: ToolInput[];
  profile?: {
    name?: string;
    company?: string;
    role?: string;
    email?: string;
  };
}

export interface ToolRecommendation {
  toolId: ToolId;
  toolName: string;
  currentPlanId: string;
  currentPlanName: string;
  currentSpend: number;
  recommendationType: RecommendationType;
  recommendedAction: string;
  recommendedPlanId?: string;
  savings: number;
  reasoning: string;
}

export interface AuditResult {
  id: string;
  teamSize: number;
  estimatedBudget: number;
  useCases: { useCase: string }[];
  tools: { toolId: string; planId: string; seats: number }[];
  recommendations: ToolRecommendation[];
  totalCurrentSpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  aiSummary: string;
  summaryFallback: boolean;
  createdAt: string;
}
