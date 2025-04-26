type CalculMode = 'rest' | 'to';

export const amountAfterUrssaf = (amount: number, mode: CalculMode = 'rest') => {
  const urssafPerc = 0.23;
  const coef = mode === 'rest' ? 1 - urssafPerc : urssafPerc;

  return (amount - amountAfterTVA(amount, 'to')) * coef;
};

export const amountAfterTVA = (amount: number, mode: CalculMode = 'rest') => {
  const tvaPerc = 0.2;
  const coef = mode === 'rest' ? 1 - tvaPerc : tvaPerc;

  return amount * coef;
};

export const amountAfterTaxes = (amount: number, mode: CalculMode = 'rest') => {
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

  return mode === 'rest' ? amount - taxAmount : taxAmount;
};

export const amountAfterAllTaxes = (amount: number, mode: 'rest' | 'to' = 'rest') => {
  const amountTaxes = amountAfterUrssaf(amount, 'to') + amountAfterTaxes(amount, 'to');

  return mode === 'rest' ? amount - amountTaxes : amountTaxes;
};
