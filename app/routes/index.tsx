import { getAllIncomes } from '../db';
import { createFileRoute } from '@tanstack/react-router';
import { calculateTaxes, calculateUrssaf, formatCurrency } from '../utils';
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export const Route = createFileRoute('/')({
  component: Index,
  loader: async () => await getAllIncomes(),
});

// Couleurs pour le graphique (vous pouvez les personnaliser)
const COLORS = {
  net: '#16a34a',
  urssaf: '#ea580c',
  impot: '#dc2626',
};

function Index() {
  const allIncomes = Route.useLoaderData();
  const totalAmout = allIncomes.reduce((acc, income) => acc + income.amount, 0);

  const summary = useMemo(() => {
    if (!allIncomes) {
      return {
        count: 0,
        totalGross: 0,
        totalUrssaf: 0,
        totalImpot: 0,
        totalNet: 0,
      };
    }

    let totalGross = 0;
    let totalUrssaf = 0;
    let totalImpot = 0;

    allIncomes.forEach((income) => {
      const grossAmount = income.amount ?? 0;
      totalGross += grossAmount;
      totalUrssaf += calculateUrssaf(grossAmount);
      totalImpot += calculateTaxes(grossAmount);
    });

    const totalNet = totalGross - totalUrssaf - totalImpot;

    return {
      count: allIncomes.length,
      totalGross,
      totalUrssaf,
      totalImpot,
      totalNet: Math.max(0, totalNet),
    };
  }, [allIncomes]);

  const pieChartData = useMemo(() => {
    const data = [];
    if (summary.totalNet > 0) {
      data.push({ name: 'Net Restant', value: summary.totalNet, fill: COLORS.net });
    }
    if (summary.totalUrssaf > 0) {
      data.push({ name: 'URSSAF', value: summary.totalUrssaf, fill: COLORS.urssaf });
    }
    if (summary.totalImpot > 0) {
      data.push({ name: 'Impôts', value: summary.totalImpot, fill: COLORS.impot });
    }

    return data.length > 0 ? data : [{ name: 'Aucune donnée', value: 1, fill: '#cccccc' }];
  }, [summary]);

  // Fonction pour personnaliser le contenu du Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      // Calcule le pourcentage par rapport au total brut
      const percentage =
        summary.totalGross > 0 ? ((data.value / summary.totalGross) * 100).toFixed(1) : 0;
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-lg text-sm">
          <p className="font-bold">{`${data.name}`}</p>
          <p style={{ color: data.payload.fill }}>
            {`${formatCurrency(data.value)} (${percentage}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Tableau de Bord</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nombre d'entrées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.count}</div>
            <p className="text-xs text-muted-foreground">Total des revenus enregistrés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Brut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.totalGross)}</div>
            <p className="text-xs text-muted-foreground">Montant total avant déductions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total URSSAF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              -{formatCurrency(summary.totalUrssaf)}
            </div>
            <p className="text-xs text-muted-foreground">Cotisations sociales estimées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impôts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              -{formatCurrency(summary.totalImpot)}
            </div>
            <p className="text-xs text-muted-foreground">Impôts estimés</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition du Revenu Brut</CardTitle>
            <CardDescription>
              Visualisation des déductions (URSSAF, Impôts) et du net restant.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            {pieChartData.length > 0 && pieChartData[0].name !== 'Aucune donnée' ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} /> {/* Tooltip personnalisé */}
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Pas de données à afficher pour le graphique.
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Net Estimé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold" style={{ color: COLORS.net }}>
              {formatCurrency(summary.totalNet)}
            </div>
            <p className="text-sm text-muted-foreground pt-1">
              Montant restant après URSSAF et Impôts estimés
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
