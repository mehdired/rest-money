import type { Income } from '@/types';
import { columns } from '@/components/columns';
import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '@/components/datatable';
import { type FormEvent } from 'react';
import { allIncomesQueryOptions, addIncome, removeIncome } from '../db';
import { AddIncome } from '@/components/add-income';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/income')({
  component: Incomes,
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(allIncomesQueryOptions);
  },
});

function Incomes() {
  const queryClient = useQueryClient();
  const { data: incomes } = useSuspenseQuery(allIncomesQueryOptions);

  const addMutation = useMutation({
    mutationFn: addIncome,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: removeIncome,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
    },
  });

  const onSubmitIncome = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const from = formData.get('from') as string;
    const date = formData.get('date') as string;
    // Corrected to get 'amount' which is the name of the input field
    const amountString = formData.get('amount') as string;

    // Translate alert message
    if (!from || !date || !amountString) {
      alert('All fields are required');
      return;
    }

    // Convert amount string to number
    const amount = parseFloat(amountString);

    if (isNaN(amount)) {
      alert('Invalid amount entered.'); // Add validation for number conversion
      return;
    }

    const newIncome = {
      id: crypto.randomUUID(),
      from: from,
      date: new Date(date),
      amount: amount, // Use the parsed number
    };

    try {
      addMutation.mutate({ data: newIncome });

      form.reset();
    } catch (error) {
      console.error('Failed to add income:', error);
    }
  };

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
      <AddIncome onSubmit={onSubmitIncome} />
      <DataTable columns={dataTableColumns} data={incomes} />
    </div>
  );
}
