import { getSettingsQueryOptions } from '@/routes/settings';
import { calculateTaxes, calculateUrssaf } from '@/utils';
import { useQuery } from '@tanstack/react-query';

export function useTaxesRate() {
  const { data: allSettings } = useQuery(getSettingsQueryOptions);

  return allSettings?.reduce<Record<string, number>>((acc, rate) => {
    acc[rate.name] = Number(rate.value);

    return acc;
  }, {});
}
