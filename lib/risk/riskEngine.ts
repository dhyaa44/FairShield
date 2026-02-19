export type RiskTier = "HIGH" | "MEDIUM" | "LOW"

export interface AllocationConfig {
  multiplier: number
  vestingDays: number
  claimDelayHours: number
}

export interface RiskProfile {
  tier: RiskTier
  config: AllocationConfig
}

const RISK_CONFIG: Record<RiskTier, AllocationConfig> = {
  HIGH: {
    multiplier: 0.4,
    vestingDays: 30,
    claimDelayHours: 24,
  },
  MEDIUM: {
    multiplier: 1,
    vestingDays: 7,
    claimDelayHours: 0,
  },
  LOW: {
    multiplier: 1.4,
    vestingDays: 0,
    claimDelayHours: 0,
  },
}

export function getRiskTier(score: number): RiskTier {
  if (score < 300) return "HIGH"
  if (score <= 700) return "MEDIUM"
  return "LOW"
}

export function getRiskProfile(score: number): RiskProfile {
  const tier = getRiskTier(score)
  const config = RISK_CONFIG[tier]

  return {
    tier,
    config,
  }
}

export function simulateAllocation(
  baseAllocation: number,
  score: number
) {
  const { tier, config } = getRiskProfile(score)

  const adjustedAllocation = baseAllocation * config.multiplier

  return {
    tier,
    adjustedAllocation,
    vestingDays: config.vestingDays,
    claimDelayHours: config.claimDelayHours,
  }
}
