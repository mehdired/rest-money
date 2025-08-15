interface IncomeCalculation {
  gross: number;
  exclVat: number;
  urssaf: number;
  taxes: number;
  final: number;
}

export interface TaxRates {
  [key: string]: number;
}

export const exclVatAmount = (grossAmount: number, vatRate: number) => {
  return grossAmount / (1 - vatRate / 100);
};

export const urssafAmount = (exclVatAmount: number, urssafRate: number) => {
  return exclVatAmount * (urssafRate / 100);
};

export const taxesAmount = (amountNetTva: number): number => {
  const abattement = 0.34;
  const taxableAmount = amountNetTva * (1 - abattement);

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

export const totalsCaltulation = (
  amount: number,
  hasTVA: boolean,
  rates: TaxRates
): IncomeCalculation => {
  const gross = amount;
  const exclVat = hasTVA ? exclVatAmount(gross, rates.TVA) : gross;
  const urssaf = urssafAmount(exclVat, rates.URSSAF);
  const taxes = taxesAmount(exclVat);
  const final = Math.max(0, exclVat - urssaf - taxes);

  return {
    gross,
    exclVat,
    urssaf,
    taxes,
    final,
  };
};
