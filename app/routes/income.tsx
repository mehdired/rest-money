import type { Income } from '../types';
import { columns } from '../components/columns';
import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '../components/datatable';
import { FormEvent, useState } from 'react';
import { Button } from '../components/ui/button';
import { selectIncomes, insertIncome } from '../db';
import { createServerFn } from '@tanstack/react-start';

const addIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income) => d)
  .handler(async ({ data }) => {
    await insertIncome(data);
  });

const getIncome = createServerFn({ method: 'GET' }).handler(async () => {
  return await selectIncomes();
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

  return (
    <div>
      <div>
        <Button onClick={() => setShowForm(!showForm)} className="cursor-pointer">
          Add an income
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
