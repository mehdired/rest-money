import type { Income } from 'src/types';
import { columns } from 'src/components/columns';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { DataTable } from 'src/components/datatable';
import { dbRemoveIncome } from '../db';
import { AddIncome } from 'src/components/add-income';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import { allIncomesQueryOptions } from './dashboard';
import { PageLayout } from 'src/components/layout';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';

const removeIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income['id']) => d)
  .handler(async ({ data }) => {
    return await dbRemoveIncome(data);
  });

export const Route = createFileRoute('/income')({
  component: Incomes,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/' });
    }
  },
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(allIncomesQueryOptions);
  },
});

function Incomes() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { data: incomes } = useSuspenseQuery(allIncomesQueryOptions);
  const isAddIncomeAllowed =
    session?.user.name === 'Mehdi' || (session?.user.name === 'Test' && incomes.length < 5);

  const deleteMutation = useMutation({
    mutationFn: removeIncome,
    onSuccess: () => {
      toast.success('Revenu supprimé avec succès');
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
    },
    onError: (error) => {
      console.error('Failed to delete income:', error);
      toast.error('Erreur lors de la suppression du revenu');
    },
  });

  const deleteIncome = async (id: Income['id']) => {
    if (!id) return;

    try {
      deleteMutation.mutate({ data: id });
    } catch (error) {
      console.error('Failed to delete income:', error);
      toast.error('Erreur lors de la suppression du revenu');
    }
  };

  const handleEdit = (income: Income) => {
    // TODO: Implémenter l'édition
    toast.info("Fonction d'édition à implémenter");
  };

  const handleView = (income: Income) => {
    // TODO: Implémenter la vue détaillée
    toast.info('Vue détaillée à implémenter');
  };

  const dataTableColumns = columns({
    onDelete: deleteIncome,
    onEdit: handleEdit,
    onView: handleView,
  });

  return (
    <PageLayout
      title="Gestion des revenus"
      description="Suivez et gérez tous vos revenus de freelance"
    >
      <div className="space-y-6">
        <AddIncome isAddIncomeAllowed={isAddIncomeAllowed} />
        <DataTable columns={dataTableColumns} data={incomes} getRowCanExpand={() => true} />
      </div>
    </PageLayout>
  );
}
