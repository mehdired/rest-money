type CalculMode = 'rest' | 'to';

export const calculateUrssaf = (amount: number) => {
  const urssafPerc = 0.23;

  return amount * urssafPerc;
};

export const calculateTaxes = (amount: number) => {
  const abattement = 0.34;
  const taxableAmount = amount * (1 - abattement);

  const brackets = [
    { min: 0, max: 11497, rate: 0 },
    { min: 11497, max: 29315, rate: 0.11 },
    { min: 29315, max: 83823, rate: 0.3 },
    { min: 83823, max: 180294, rate: 0.41 },
    { min: 180294, max: Infinity, rate: 0.45 },
  ];

  let taxAmount = 0;

  for (const bracket of brackets) {
    if (taxableAmount > bracket.min) {
      const taxable = Math.min(taxableAmount, bracket.max) - bracket.min;
      taxAmount += taxable * bracket.rate;
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
    return ''; // Ou retourner '0,00 €' ou une autre valeur par défaut
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
