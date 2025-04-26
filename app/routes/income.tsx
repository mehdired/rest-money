import type { Income } from '../types';
import { columns } from '../components/columns';
import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '../components/datatable';
import { FormEvent, useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { selectIncomes, insertIncome, removeRow } from '../db';
import { createServerFn } from '@tanstack/react-start';
import { Trash2 } from 'lucide-react';

const addIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income) => d)
  .handler(async ({ data }) => {
    await insertIncome(data);
  });

const getIncome = createServerFn({ method: 'GET' }).handler(async () => {
  return await selectIncomes();
});

const removeIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income['id']) => d)
  .handler(async ({ data }) => {
    return await removeRow(data);
  });

export const Route = createFileRoute('/income')({
  component: RouteComponent,
  loader: () => {
    return getIncome();
  },
});

function RouteComponent() {
  const income = Route.useLoaderData();
  const [data, setData] = useState<Income[]>(income);
  const [showForm, setShowForm] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    addIncome({ data: newIncome });
    setData([...data, newIncome]);

    form.reset();
  };

  const onDelete = async (id: Income['id']) => {
    if (!id) return;

    const removedIncome = await removeIncome({ data: id });
    if (removedIncome) {
      setData(data.filter((income) => income.id !== id));
    }
  };

  const dataTableColumns = columns({ onDelete });

  return (
    <div className="container">
      <div>
        <Button onClick={() => setShowForm(!showForm)} className="cursor-pointer">
          {!showForm ? 'Add an income' : 'Hide the form'}
        </Button>
      </div>
      {showForm && (
        <form method="post" onSubmit={onSubmit} className="flex gap-4 items-center">
          <input type="text" id="from" name="from" placeholder="from" />
          <input type="date" id="date" name="date" placeholder="date" />
          <input type="number" id="amount" name="amount" placeholder="amount" />
          <Button className="cursor-pointer">Add</Button>
        </form>
      )}
      <DataTable columns={dataTableColumns} data={data} />
    </div>
  );
}
