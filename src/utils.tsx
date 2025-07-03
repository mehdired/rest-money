import { useQuery } from '@tanstack/react-query';
import { getSettingsQueryOptions } from './routes/settings';

export const calculateUrssaf = (amount: number): number => {
  const { data: allSettings } = useQuery(getSettingsQueryOptions);
  const urssafValue = allSettings?.find((setting) => setting.name.toLowerCase() === 'urssaf');
  const urssafPerc = Number(urssafValue?.value) / 100;

  return amount * urssafPerc;
};

export const calculateTaxes = (amount: number): number => {
  const abattement = 0.34;
  const incomeAfterUrssaf = amount - calculateUrssaf(amount);
  const taxableAmount = incomeAfterUrssaf * (1 - abattement);

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
      const taxableInBracket = Math.min(taxableAmount, bracket.max) - bracket.min;
      taxAmount += taxableInBracket * bracket.rate;
    }
  }

  return taxAmount;
};

export function formatCurrency(
  amount: number | null | undefined,
  currency = 'EUR',
  locale = 'fr-FR'
): string {
  if (amount === null || amount === undefined) {
    return '';
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
