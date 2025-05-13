import { type FormEvent, useState } from 'react';
import type { Income } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from './ui/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dbGetSettings, dbInsertIncome } from '@/db';
import { createServerFn } from '@tanstack/react-start';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { getSettingsQueryOptions } from '@/routes/settings';

const addIncomeFn = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income) => d)
  .handler(async ({ data }) => {
    await dbInsertIncome(data);
  });

export function AddIncome() {
  const queryClient = useQueryClient();
  const { data: allSettings } = useQuery(getSettingsQueryOptions);
  const tvaValue = allSettings?.find((setting) => setting.name === 'tva');
  const [inputValue, setInputValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [includeTVA, setIncludeTVA] = useState(true);

  const calculatedValue = parseFloat(inputValue || '0') / (1 + Number(tvaValue?.value) / 100);
  console.log(tvaValue);
  const displayCalculatedValue = !isNaN(calculatedValue) ? calculatedValue.toFixed(2) : '';

  const addMutation = useMutation({
    mutationFn: addIncomeFn,
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
    const amountName = includeTVA ? 'netAmount' : 'grossAmount';
    const amountString = formData.get(amountName) as string;

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
      setOpenDialog(false);
      setInputValue('');
    } catch (error) {
      console.error('Failed to add income:', error);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Button
        className="cursor-pointer"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        Add an income
      </Button>

      <DialogContent className="bg-white p-10">
        <DialogTitle>Add an income</DialogTitle>
        <form method="post" onSubmit={onSubmitIncome} className="flex flex-col gap-4 items-center">
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
          <div className="flex items-center gap-2 w-full">
            <Checkbox
              name="withTva"
              id="withTVA"
              checked={includeTVA}
              onCheckedChange={() => {
                setIncludeTVA(!includeTVA);
              }}
            />
            <Label htmlFor="withTVA">Amount With TVA</Label>
          </div>
          {includeTVA && inputValue && (
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
