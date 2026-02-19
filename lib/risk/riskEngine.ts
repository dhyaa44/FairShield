export interface RiskInput {
  walletAgeDays: number;
  txCount: number;
  avgTxValue: number;
  lastActivityDays: number;
}

export interface RiskEvaluation {
  score: number;
  reasons: string[];
}

export function evaluateRisk(input: RiskInput): RiskEvaluation {
  let score = 0;
  const reasons: string[] = [];

  if (input.walletAgeDays < 30) {
    score += 25;
    reasons.push("new_wallet");
  }

  if (input.txCount < 10) {
    score += 20;
    reasons.push("low_tx_count");
  }

  if (input.avgTxValue > 10000) {
    score += 15;
    reasons.push("high_avg_tx_value");
  }

  if (input.lastActivityDays > 14) {
    score += 10;
    reasons.push("inactive_wallet");
  }

  return {
    score: Math.min(score, 100),
    reasons,
  };
}
