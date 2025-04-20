import { ColumnDef } from '@tanstack/react-table';
import type { Income } from '../types';
import React from 'react';

export const defaultColumn: Partial<ColumnDef<Income>> = {
  cell: function Cell({ getValue }) {
    const initialValue = getValue();

    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return <input value={value as string} onChange={(event) => setValue(event.target.value)} />;
  },
};

export const columns: ColumnDef<Income>[] = [
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
];
