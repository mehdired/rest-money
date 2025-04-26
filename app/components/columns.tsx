import { ColumnDef } from '@tanstack/react-table';
import type { Income } from '../types';
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';

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
      return <span>{date.toLocaleDateString('fr-FR')}</span>;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as Income['amount'];
      const formatedAmount = amount.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      });
      return <span>{formatedAmount}</span>;
    },
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      return (
        <Button className="cursor-pointer" onClick={() => onDelete(row.original.id)}>
          <Trash2 />
        </Button>
      );
    },
  },
];
