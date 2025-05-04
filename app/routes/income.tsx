import type { Income } from '@/types';
import { columns } from '@/components/columns';
import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '@/components/datatable';
import { FormEvent, useState } from 'react';
import { getAllIncomes, addIncome, removeIncome } from '../db';
import { AddIncome } from '@/components/add-income';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/income')({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data: incomes } = useSuspenseQuery({
    queryKey: ['incomes'],
    queryFn: getAllIncomes,
  });

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

  const onSubmitIncome = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const from = formData.get('from') as string;
    const date = formData.get('date') as string;
    const amount = formData.get('netAmount');

    if (!from || !date || !amount) {
      alert('Tous les champs sont obligatoire');
      return;
    }

    const newIncome = {
      id: crypto.randomUUID(),
      from: from,
      date: new Date(date),
      amount: Number(amount),
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
