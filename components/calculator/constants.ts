export const CALCULATOR_TABS = {
  STOCKS: 'STOCKS',
  CRYPTO: 'CRYPTO',
} as const;

export type CalculatorTabsType = typeof CALCULATOR_TABS[keyof typeof CALCULATOR_TABS];

export const ERROR_MESSAGES = {
  CALCULATION_FAILED: 'Calculation failed. Please try again.',
  INVALID_DATES: 'Please select valid dates',
  NETWORK_ERROR: 'Network error. Please check your connection.',
} as const;
