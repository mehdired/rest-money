import { useMemo } from 'react';

export interface TvaCalculationParams {
  amount: string;
  tvaRate: number;
  hasTVA: boolean;
  includeTVA: boolean;
}

export interface TvaCalculationResult {
  numericAmount: number;
  netAmount: number;
  tvaAmount: number;
  grossAmount: number;
  isValid: boolean;
}

export function useTvaCalculation({
  amount,
  tvaRate,
  hasTVA,
  includeTVA,
}: TvaCalculationParams): TvaCalculationResult {
  return useMemo(() => {
    const numericAmount = parseFloat(amount || '0');

    const isValid = !isNaN(numericAmount) && numericAmount > 0;

    if (!isValid) {
      return {
        numericAmount: 0,
        netAmount: 0,
        tvaAmount: 0,
        grossAmount: 0,
        isValid: false,
      };
    }

    let netAmount: number;
    let tvaAmount: number;
    let grossAmount: number;

    if (!hasTVA) {
      netAmount = numericAmount;
      tvaAmount = 0;
      grossAmount = numericAmount;
    } else {
      if (includeTVA) {
        grossAmount = numericAmount;
        netAmount = numericAmount / (1 + tvaRate / 100);
        tvaAmount = grossAmount - netAmount;
      } else {
        // Montant saisi HT (hors taxes)
        netAmount = numericAmount;
        tvaAmount = numericAmount * (tvaRate / 100);
        grossAmount = netAmount + tvaAmount;
      }
    }

    return {
      numericAmount,
      netAmount: Math.round(netAmount * 100) / 100, // Arrondir à 2 décimales
      tvaAmount: Math.round(tvaAmount * 100) / 100,
      grossAmount: Math.round(grossAmount * 100) / 100,
      isValid: true,
    };
  }, [amount, tvaRate, hasTVA, includeTVA]);
}

/**
 * Hook simplifié pour les calculs TVA avec des valeurs par défaut
 * Utile quand on a juste besoin d'un calcul rapide
 */
export function useSimpleTvaCalculation(
  amount: string,
  tvaRate: number = 20,
  includeTVA: boolean = true
) {
  return useTvaCalculation({
    amount,
    tvaRate,
    hasTVA: true,
    includeTVA,
  });
}

/**
 * Utilitaire pour formater les résultats de calcul TVA
 * pour l'affichage dans l'interface
 */
export function formatTvaCalculation(
  calculation: TvaCalculationResult,
  formatter: (amount: number) => string
) {
  if (!calculation.isValid) {
    return {
      netAmount: '0,00 €',
      tvaAmount: '0,00 €',
      grossAmount: '0,00 €',
    };
  }

  return {
    netAmount: formatter(calculation.netAmount),
    tvaAmount: formatter(calculation.tvaAmount),
    grossAmount: formatter(calculation.grossAmount),
  };
}
