import type { Income } from '../types';
import { columns } from '../components/columns';
import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '../components/datatable';
import { FormEvent, useState } from 'react';
import { dbSelectAllIncomes, dbInsertIncome, dbRemoveIncome } from '../db';
import { createServerFn } from '@tanstack/react-start';
import { AddIncome } from '../components/add-income';

const addIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income) => d)
  .handler(async ({ data }) => {
    await dbInsertIncome(data);
  });

const getAllIncomes = createServerFn({ method: 'GET' }).handler(async () => {
  return await dbSelectAllIncomes();
});

const removeIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income['id']) => d)
  .handler(async ({ data }) => {
    return await dbRemoveIncome(data);
  });

export const Route = createFileRoute('/income')({
  component: RouteComponent,
  loader: async () => {
    return await getAllIncomes();
  },
});

function RouteComponent() {
  const income = Route.useLoaderData();
  const [data, setData] = useState<Income[]>(income);

  const onSubmitIncome = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const from = formData.get('from') as string;
    const date = formData.get('date') as string;
    const amount = formData.get('amount');

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
      await addIncome({ data: newIncome });
      setData([...data, newIncome]);

      form.reset();
    } catch (error) {
      console.error('Failed to add income:', error);
    }
  };

  const deleteIncome = async (id: Income['id']) => {
    if (!id) return;

    try {
      const removedIncome = await removeIncome({ data: id });
      if (removedIncome) {
        setData(data.filter((income) => income.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete income:', error);
    }
  };

  const dataTableColumns = columns({ onDelete: deleteIncome });

  return (
    <div className="container">
      <AddIncome onSubmit={onSubmitIncome} />
      <DataTable columns={dataTableColumns} data={data} />
    </div>
  );
}
