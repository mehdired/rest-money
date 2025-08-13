import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { calculateTaxes, calculateUrssaf, formatCurrency } from '../utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import { dbSelectAllIncomes } from 'src/db';
import {
  TrendingUp,
  Euro,
  Receipt,
  Calculator,
  Wallet,
  FileText,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { PageLayout, PageSection } from 'src/components/layout';
import { Button } from 'src/components/ui/button';
import { Link } from '@tanstack/react-router';
import { EmptyState } from 'src/components/ui/empty-state';
import { authMiddleware } from '@/lib/auth-middleware';

const getAllIncomes = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return await dbSelectAllIncomes(context.user.id!);
  });

export const allIncomesQueryOptions = queryOptions({
  queryKey: ['incomes'],
  queryFn: getAllIncomes,
});

export const Route = createFileRoute('/dashboard')({
  component: Index,
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(allIncomesQueryOptions);
  },
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/' });
    }
  },
});

// Colors cohérentes avec le thème
const COLORS = {
  net: '#16a34a', // Vert pour le net
  urssaf: '#ea580c', // Orange pour URSSAF
  impot: '#dc2626', // Rouge pour impôts
  gross: '#3b82f6', // Bleu pour le brut
};

function Index() {
  const { data: allIncomes } = useSuspenseQuery(allIncomesQueryOptions);
  const navigate = useNavigate();

  const totalGross = allIncomes.reduce((acc, income) => {
    const isTva = income.isTva;
    const amount = isTva ? income.amount / (1 + 0.2) : income.amount;
    return acc + amount;
  }, 0);
  const totalUrssaf = allIncomes.reduce((acc, income) => {
    const isTva = income.isTva;
    const amount = isTva ? income.amount / (1 + 0.2) : income.amount;
    return acc + calculateUrssaf(amount);
  }, 0);
  const totalImpot = allIncomes.reduce((acc, income) => {
    const isTva = income.isTva;
    const amount = isTva ? income.amount / (1 + 0.2) : income.amount;
    return acc + calculateTaxes(amount);
  }, 0);
  const totalNet = Math.max(0, totalGross - totalUrssaf - totalImpot);

  // Calculs pour les pourcentages
  const urssafPercentage = totalGross > 0 ? ((totalUrssaf / totalGross) * 100).toFixed(1) : 0;
  const impotPercentage = totalGross > 0 ? ((totalImpot / totalGross) * 100).toFixed(1) : 0;
  const netPercentage = totalGross > 0 ? ((totalNet / totalGross) * 100).toFixed(1) : 0;

  const pieChartData = [
    { name: 'Net Restant', value: totalNet, fill: COLORS.net },
    { name: 'URSSAF', value: totalUrssaf, fill: COLORS.urssaf },
    { name: 'Impôts', value: totalImpot, fill: COLORS.impot },
  ];

  const recentIncomes = allIncomes
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = totalGross > 0 ? ((data.value / totalGross) * 100).toFixed(1) : 0;
      return (
        <div className="bg-secondary-background p-3 border-2 border-border rounded-base shadow-shadow text-sm">
          <p className="font-heading text-foreground">{`${data.name}`}</p>
          <p className="text-foreground" style={{ color: data.payload.fill }}>
            {`${formatCurrency(data.value)} (${percentage}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <PageLayout showBreadcrumbs={false} className="bg-background">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-main border-2 border-border rounded-base shadow-shadow">
            <TrendingUp className="h-8 w-8 text-main-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-heading text-foreground">Dashboard</h1>
            <p className="text-foreground/70">Aperçu de vos revenus de freelance</p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="flex gap-3 flex-wrap">
          <Link to="/income">
            <Button className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Voir tous les revenus
            </Button>
          </Link>
          {/* <Link to="/income">
            <Button variant="neutral" className="flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Ajouter un revenu
            </Button>
          </Link> */}
        </div>
      </div>

      {/* Métriques principales */}
      <PageSection title="Vue d'ensemble" className="mb-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Nombre d'entrées */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Revenus enregistrés
              </CardTitle>
              <FileText className="h-4 w-4 text-main" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading text-foreground">{allIncomes.length}</div>
              <p className="text-xs text-foreground/60 flex items-center gap-1 mt-1">
                <Calendar className="h-3 w-3" />
                Total des entrées
              </p>
            </CardContent>
          </Card>

          {/* Total brut */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Chiffre d'affaires
              </CardTitle>
              <Euro className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading text-foreground">
                {formatCurrency(totalGross)}
              </div>
              <p className="text-xs text-foreground/60 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                Montant brut total
              </p>
            </CardContent>
          </Card>

          {/* URSSAF */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Cotisations URSSAF
              </CardTitle>
              <Receipt className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading text-orange-600">
                -{formatCurrency(totalUrssaf)}
              </div>
              <p className="text-xs text-foreground/60 flex items-center gap-1 mt-1">
                <Target className="h-3 w-3" />
                {urssafPercentage}% du CA
              </p>
            </CardContent>
          </Card>

          {/* Impôts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Impôts estimés
              </CardTitle>
              <Calculator className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading text-red-600">
                -{formatCurrency(totalImpot)}
              </div>
              <p className="text-xs text-foreground/60 flex items-center gap-1 mt-1">
                <Target className="h-3 w-3" />
                {impotPercentage}% du CA
              </p>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      {/* Section principale avec graphique et résumé */}
      <PageSection title="Répartition des revenus" className="mb-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Graphique */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-main" />
                Répartition du chiffre d'affaires
              </CardTitle>
              <CardDescription>
                Visualisation des déductions et du montant net restant
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] w-full">
              {allIncomes.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      strokeWidth={2}
                      stroke="var(--color-border)"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState
                  title="Aucun revenu enregistré"
                  description="Commencez par ajouter vos premiers revenus pour voir apparaître le graphique de répartition."
                  action={{
                    label: 'Ajouter un revenu',
                    onClick: () => navigate({ to: '/income' }),
                  }}
                />
              )}
            </CardContent>
          </Card>

          {/* Montant net + récents revenus */}
          <div className="space-y-6">
            {/* Net total */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Net estimé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-heading text-green-600 mb-2">
                  {formatCurrency(totalNet)}
                </div>
                <p className="text-sm text-foreground/70 mb-3">
                  {netPercentage}% de votre chiffre d'affaires
                </p>
                <div className="text-xs text-foreground/60 space-y-1">
                  <p>Après déduction des charges :</p>
                  <p>• URSSAF : {formatCurrency(totalUrssaf)}</p>
                  <p>• Impôts : {formatCurrency(totalImpot)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Revenus récents */}
            {recentIncomes.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Revenus récents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentIncomes.map((income) => (
                    <div
                      key={income.id}
                      className="flex justify-between items-center py-2 border-b border-border/20 last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-foreground text-sm">{income.from}</p>
                        <p className="text-xs text-foreground/60">
                          {new Date(income.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">
                          {formatCurrency(income.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Link to="/income">
                    <Button variant="neutral" size="sm" className="w-full mt-3">
                      Voir tous les revenus
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
