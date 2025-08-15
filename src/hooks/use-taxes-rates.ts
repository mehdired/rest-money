import { useSettings } from './use-settings';

export function useTaxesRate() {
  const allSettings = useSettings();

  return allSettings.reduce<Record<string, number>>((acc, rate) => {
    acc[rate.name] = Number(rate.value);

    return acc;
  }, {});
}
