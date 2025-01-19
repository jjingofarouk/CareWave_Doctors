// utils/currencyConverter.js
export const CURRENCIES = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.91 },
  GBP: { symbol: '£', rate: 0.79 },
  UGX: { symbol: 'USh', rate: 3850 }, // Ugandan Shilling
  KES: { symbol: 'KSh', rate: 132.5 }, // Kenyan Shilling
  TZS: { symbol: 'TSh', rate: 2530 }, // Tanzanian Shilling
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const inUSD = amount / CURRENCIES[fromCurrency].rate;
  return inUSD * CURRENCIES[toCurrency].rate;
};