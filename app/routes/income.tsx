import type { Income } from '@/types';
import { columns } from '@/components/columns';
import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '@/components/datatable';
import { dbRemoveIncome } from '../db';
import { AddIncome } from '@/components/add-income';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import { allIncomesQueryOptions } from './index';

const removeIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income['id']) => d)
  .handler(async ({ data }) => {
    return await dbRemoveIncome(data);
  });

export const Route = createFileRoute('/income')({
  component: Incomes,
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(allIncomesQueryOptions);
  },
});

function Incomes() {
  const queryClient = useQueryClient();
  const { data: incomes } = useSuspenseQuery(allIncomesQueryOptions);

  const deleteMutation = useMutation({
    mutationFn: removeIncome,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
    },
  });

  const deleteIncome = async (id: Income['id']) => {
    if (!id) return;

    try {
      // Pass the correct structure expected by the server function
      // Wrap the id in { data: ... }
      deleteMutation.mutate({ data: id });
    } catch (error) {
      console.error('Failed to delete income:', error);
    }
  };

  const dataTableColumns = columns({ onDelete: deleteIncome });

  return (
    <div className="container">
      <AddIncome />
      <DataTable columns={dataTableColumns} data={incomes} />
    </div>
  );
}
