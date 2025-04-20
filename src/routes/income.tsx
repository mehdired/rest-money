import type { Income } from '../types';
import { columns } from '../components/columns';
import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '../components/datatable';
import { FormEvent, useState } from 'react';

const income: Income[] = [
  {
    id: 1,
    from: 'Redbox Media',
    date: new Date('2025-03-14'),
    amount: 1000,
  },
  {
    id: 2,
    from: 'Redbox Media',
    date: new Date('2025-03-18'),
    amount: 1000,
  },
  {
    id: 3,
    from: 'Todo Digital',
    date: new Date('2025-04-14'),
    amount: 2000,
  },
];

export const Route = createFileRoute('/income')({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] = useState<Income[]>(income);

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

    setData([
      ...data,
      {
        id: Math.max(0, ...data.map((item) => item.id)) + 1,
        from: from,
        date: new Date(date),
        amount: Number(amount),
      },
    ]);

    form.reset();
  };

  return (
    <div>
      <form method="post" onSubmit={onSubmit} className="flex gap-4 items-center">
        <input type="text" id="from" name="from" placeholder="from" />
        <input type="date" id="date" name="date" placeholder="date" />
        <input type="number" id="amount" name="amount" placeholder="amount" />
        <button>Add</button>
      </form>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
