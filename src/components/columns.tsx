import { ColumnDef } from '@tanstack/react-table';
import type { Income } from '../types';
import { Trash2, Plus, Minus, Building2, Calendar, Euro } from 'lucide-react';
import { Button } from './ui/button';
import { formatCurrency } from 'src/utils';
import { type TaxRates, totalsCaltulation } from 'src/utils/taxes';

// Helper functions pour les calculs dans les colonnes
const calculateUrssafForColumn = (income: Income, taxRates: TaxRates): number => {
  const calculation = totalsCaltulation(income.amount, income.isTva, taxRates);
  return calculation.urssaf;
};

const calculateTaxesForColumn = (income: Income, taxRates: TaxRates): number => {
  const calculation = totalsCaltulation(income.amount, income.isTva, taxRates);
  return calculation.taxes;
};

const calculateNetForColumn = (income: Income, taxRates: TaxRates): number => {
  const calculation = totalsCaltulation(income.amount, income.isTva, taxRates);
  return calculation.final;
};

export interface ColumnsProps {
  onDelete: (id: Income['id']) => void;

  taxRates: TaxRates;
}

export const columns = ({ onDelete, taxRates }: ColumnsProps): ColumnDef<Income>[] => [
  {
    id: 'expand',
    header: '',
    meta: { displayName: 'Détails' },
    enableHiding: false,
    enableSorting: false,
    size: 50,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          variant="neutral"
          size="sm"
          onClick={row.getToggleExpandedHandler()}
          className="w-8 h-8 p-0"
          aria-label={row.getIsExpanded() ? 'Masquer les détails' : 'Afficher les détails'}
        >
          {row.getIsExpanded() ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
        </Button>
      ) : null;
    },
  },
  {
    accessorKey: 'from',
    header: ({ column }) => (
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-main" />
        <span>Client</span>
      </div>
    ),
    meta: { displayName: 'Client' },
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const from = row.getValue('from') as string;
      return <div className="font-medium text-foreground">{from}</div>;
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-main" />
        <span>Date</span>
      </div>
    ),
    meta: { displayName: 'Date' },
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const date = row.getValue('date') as Income['date'];
      const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      return <div className="text-foreground">{formattedDate}</div>;
    },
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <div className="flex items-center gap-2">
        <Euro className="h-4 w-4 text-main" />
        <span>Montant brut (HT)</span>
      </div>
    ),
    meta: { displayName: 'Montant brut' },
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const income = row.original;
      const calculation = totalsCaltulation(income.amount, income.isTva, taxRates);
      return (
        <div className="font-heading text-foreground">{formatCurrency(calculation.exclVat)}</div>
      );
    },
    sortingFn: 'alphanumeric',
  },
  {
    id: 'isTva',
    accessorKey: 'isTva',
    header: 'Soumis à TVA',
    meta: { displayName: 'isTva' },
    enableSorting: true,
    enableHiding: true,

    cell: ({ row }) => {
      const isTva = row.getValue('isTva') as Income['isTva'];

      return <div className="font-medium text-blue-600">{isTva ? 'Oui' : 'Non'}</div>;
    },
  },
  {
    id: 'urssaf',
    header: 'URSSAF',
    meta: { displayName: 'URSSAF' },
    enableSorting: true,
    enableHiding: true,
    accessorFn: (row) => calculateUrssafForColumn(row, taxRates),
    cell: ({ row }) => {
      const income = row.original;
      const urssaf = calculateUrssafForColumn(income, taxRates);
      return <div className="font-medium text-orange-600">-{formatCurrency(urssaf)}</div>;
    },
  },
  {
    id: 'taxes',
    header: 'Impôts',
    meta: { displayName: 'Impôts' },
    enableSorting: true,
    enableHiding: true,
    accessorFn: (row) => calculateTaxesForColumn(row, taxRates),
    cell: ({ row }) => {
      const income = row.original;
      const taxes = calculateTaxesForColumn(income, taxRates);
      return <div className="font-medium text-red-600">-{formatCurrency(taxes)}</div>;
    },
  },
  {
    id: 'net',
    header: 'Net estimé',
    meta: { displayName: 'Net estimé' },
    enableSorting: true,
    enableHiding: true,
    accessorFn: (row) => calculateNetForColumn(row, taxRates),
    cell: ({ row }) => {
      const income = row.original;
      const net = calculateNetForColumn(income, taxRates);

      return <div className="font-heading text-green-600">{formatCurrency(net)}</div>;
    },
  },
  {
    id: 'actions',
    header: '',
    meta: { displayName: 'Actions' },
    enableHiding: false,
    enableSorting: false,
    size: 80,
    cell: ({ row }) => {
      const income = row.original;

      return (
        <div className="flex items-center gap-1">
          {/* Action rapide de suppression */}
          <Button
            variant="neutral"
            size="sm"
            onClick={() => onDelete(income.id)}
            className="w-8 h-8 p-0 hover:bg-red-50 hover:border-red-200"
            aria-label="Supprimer ce revenu"
          >
            <Trash2 className="h-3 w-3 text-red-500" />
          </Button>
        </div>
      );
    },
  },
];
