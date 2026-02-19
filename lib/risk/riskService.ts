import { evaluateRisk, RiskInput } from "./riskEngine";

export interface RiskResult {
  score: number;
  level: "low" | "medium" | "high";
  reasons: string[];
}

export function getRiskProfile(input: RiskInput): RiskResult {
  const { score, reasons } = evaluateRisk(input);

  let level: RiskResult["level"];

  if (score < 30) level = "low";
  else if (score < 70) level = "medium";
  else level = "high";

  return { score, level, reasons };
}
