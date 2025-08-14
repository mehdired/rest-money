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
