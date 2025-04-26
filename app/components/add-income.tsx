import { FormEvent, useState } from 'react';
import { Button } from '../components/ui/button';

interface AddIncomeProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function AddIncome({ onSubmit }: AddIncomeProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
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
    </>
  );
}
