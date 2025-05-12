import { ColumnDef } from '@tanstack/react-table';
import type { Income } from '../types';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { formatCurrency } from '@/utils';

export interface ColumnsProps {
  onDelete: (id: Income['id']) => void;
}

export const columns = ({ onDelete }: ColumnsProps): ColumnDef<Income>[] => [
  {
    accessorKey: 'from',
    header: 'From',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('date') as Income['date'];
      // Translate date format locale
      return <span>{date.toLocaleDateString('en-US')}</span>;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as Income['amount'];

      return <span>{formatCurrency(amount)}</span>;
    },
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      const income = row.original;

      return (
        <Button
          className=" bg-white"
          size="icon"
          onClick={() => onDelete(income.id)}
          aria-label="Delete income" // Add accessible label
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      );
    },
  },
];
