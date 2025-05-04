import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from './ui/input';

interface AddIncomeProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function AddIncome({ onSubmit }: AddIncomeProps) {
  const [inputValue, setInputValue] = useState('');

  const calculatedValue = parseFloat(inputValue || '0') * 0.8;
  const displayCalculatedValue = !isNaN(calculatedValue) ? calculatedValue.toFixed(2) : '';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add an income</Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-10">
        <form method="post" onSubmit={onSubmit} className="flex flex-col gap-4 items-center">
          <Input type="text" id="from" name="from" placeholder="Source (e.g., Client A)" required />
          <Input type="date" id="date" name="date" placeholder="Date" required />
          <Input
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.currentTarget.value);
            }}
            type="text"
            id="grossAmount"
            name="grossAmount"
            placeholder="Gross Amount"
            required
          />
          {inputValue && !isNaN(parseFloat(inputValue)) && (
            <div className="w-full">
              <label htmlFor="amountNet" className="text-sm text-muted-foreground">
                Net TVA
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="netAmount"
                name="netAmount"
                readOnly
                value={displayCalculatedValue}
              />
            </div>
          )}
          <Button type="submit" className="cursor-pointer w-full">
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
