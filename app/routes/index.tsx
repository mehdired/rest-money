import { getAllIncomes } from '../db';
import { createFileRoute } from '@tanstack/react-router';
import { amountAfterAllTaxes, amountAfterTaxes, amountAfterUrssaf } from '../utils';

export const Route = createFileRoute('/')({
  component: Index,
  loader: async () => await getAllIncomes(),
});

function Index() {
  const allIncomes = Route.useLoaderData();
  const totalAmout = allIncomes.reduce((acc, income) => acc + income.amount, 0);

  return (
    <div className="p-2">
      <div>{totalAmout}</div>
      <div>{amountAfterUrssaf(totalAmout, 'to')}</div>
      <div>{amountAfterTaxes(totalAmout, 'to')}</div>
      <div>{amountAfterAllTaxes(totalAmout)}</div>
    </div>
  );
}
