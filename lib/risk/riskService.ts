import { evaluateRisk } from "./riskEngine";

export interface RiskInput {
  walletAgeDays: number;
  txCount: number;
  avgTxValue: number;
  lastActivityDays: number;
}

export interface RiskResult {
  score: number;
  level: "low" | "medium" | "high";
}

export function getRiskProfile(input: RiskInput): RiskResult {
  const score = evaluateRisk(input);

  let level: RiskResult["level"];

  if (score < 30) level = "low";
  else if (score < 70) level = "medium";
  else level = "high";

  return { score, level };
}
