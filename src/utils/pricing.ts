export type CurrencyCode = 'USD' | 'NGN' | 'EUR' | 'GBP';

export interface PlanPricing {
  monthlyUsd: number;
  yearlyUsd: number;
}

export const BASE_PLANS = {
  free: {
    id: 'free',
    name: 'Starter Learner',
    description: 'Perfect for exploring AI capabilities and beginner courses',
    monthlyUsd: 0,
    yearlyUsd: 0,
  },
  pro: {
    id: 'pro',
    name: 'Nexora Pro Architect',
    description: 'Unlimited access to all courses, prompt library, AI tools, and certificates',
    monthlyUsd: 29,
    yearlyUsd: 249, // Save $99/yr
  },
  team: {
    id: 'team',
    name: 'Studio Enterprise',
    description: 'For dev studios, teams & agencies building AI products together',
    monthlyUsd: 89,
    yearlyUsd: 799,
  }
};

export const EXCHANGE_RATES: Record<CurrencyCode, { rate: number; symbol: string; prefix: boolean }> = {
  USD: { rate: 1, symbol: '$', prefix: true },
  NGN: { rate: 1550, symbol: '₦', prefix: true },
  EUR: { rate: 0.92, symbol: '€', prefix: true },
  GBP: { rate: 0.78, symbol: '£', prefix: true },
};

/**
 * Calculates pricing for a given plan and billing interval.
 */
export function calculatePlanCost(
  planId: 'free' | 'pro' | 'team',
  interval: 'monthly' | 'yearly',
  currency: CurrencyCode = 'USD'
): { amount: number; formatted: string; savingsUsd: number } {
  const plan = BASE_PLANS[planId];
  const usdAmount = interval === 'monthly' ? plan.monthlyUsd : plan.yearlyUsd;
  const savingsUsd = interval === 'yearly' && plan.monthlyUsd > 0
    ? (plan.monthlyUsd * 12) - plan.yearlyUsd
    : 0;

  const { rate, symbol } = EXCHANGE_RATES[currency];
  const converted = Math.round(usdAmount * rate);

  let formatted = '';
  if (currency === 'NGN') {
    formatted = `${symbol}${converted.toLocaleString()}`;
  } else {
    formatted = `${symbol}${converted}`;
  }

  return {
    amount: converted,
    formatted,
    savingsUsd,
  };
}
