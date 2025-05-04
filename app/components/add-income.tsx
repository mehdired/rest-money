import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface AddIncomeProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function AddIncome({ onSubmit }: AddIncomeProps) {
  const [inputValue, setInputValue] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add an income</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <form method="post" onSubmit={onSubmit} className="flex flex-col gap-4 items-center">
          <input type="text" id="from" name="from" placeholder="from" />
          <input type="date" id="date" name="date" placeholder="date" />
          <input
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.currentTarget.value);
            }}
            type="text"
            id="grossAmount"
            name="grossAmount"
            placeholder="0"
          />
          <input
            type="text"
            id="netAmount"
            name="netAmount"
            readOnly
            value={inputValue ? (parseFloat(inputValue) * 0.8).toFixed(2) : 0}
          />
          <Button className="cursor-pointer">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
