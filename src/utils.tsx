import { useQuery } from '@tanstack/react-query';
import { getSettingsQueryOptions } from './routes/settings';

export const calculateUrssaf = (amount: number): number => {
  const { data: allSettings } = useQuery(getSettingsQueryOptions);
  const urssafValue = allSettings?.find((setting) => setting.name.toLowerCase() === 'urssaf');
  const urssafPerc = Number(urssafValue?.value) / 100;
  console.log(urssafPerc);
  return amount * urssafPerc;
};

export const calculateTaxes = (amount: number): number => {
  // Assuming 'amount' is the gross income *before* URSSAF deduction
  // If taxes are calculated *after* URSSAF, adjust the input to this function

  // Abattement forfaitaire pour frais professionnels (example for micro-entreprise BNC)
  const abattement = 0.34; // 34% allowance
  const incomeAfterUrssaf = amount - calculateUrssaf(amount); // Calculate income after social contributions
  const taxableAmount = incomeAfterUrssaf * (1 - abattement); // Apply allowance

  // Progressive income tax brackets (example for 2024 rates for one part)
  // These should be updated yearly and adjusted based on the user's situation (parts fiscales, etc.)
  const brackets = [
    { min: 0, max: 11294, rate: 0 }, // Up to €11,294
    { min: 11294, max: 28797, rate: 0.11 }, // €11,294 to €28,797
    { min: 28797, max: 82341, rate: 0.3 }, // €28,797 to €82,341
    { min: 82341, max: 177106, rate: 0.41 }, // €82,341 to €177,106
    { min: 177106, max: Infinity, rate: 0.45 }, // Above €177,106
  ];

  let taxAmount = 0;

  for (const bracket of brackets) {
    if (taxableAmount > bracket.min) {
      // Calculate the portion of income within this bracket
      const taxableInBracket = Math.min(taxableAmount, bracket.max) - bracket.min;
      // Add the tax for this portion
      taxAmount += taxableInBracket * bracket.rate;
    }
  }

  // This is a simplified calculation. Real income tax depends on many factors.
  return taxAmount;
};

export function formatCurrency(
  amount: number | null | undefined,
  currency = 'EUR',
  // Keep locale as fr-FR for currency formatting unless specifically requested otherwise
  locale = 'fr-FR'
): string {
  if (amount === null || amount === undefined) {
    return ''; // Or return '0,00 €' or another default value
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
