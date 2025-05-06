import { allIncomesQueryOptions } from '../db';
import { createFileRoute } from '@tanstack/react-router';
import { calculateTaxes, calculateUrssaf, formatCurrency } from '../utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/')({
  component: Index,
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(allIncomesQueryOptions);
  },
});

// Colors for the chart (you can customize them)
const COLORS = {
  net: '#16a34a',
  urssaf: '#ea580c',
  impot: '#dc2626',
};

function Index() {
  const { data: allIncomes } = useSuspenseQuery(allIncomesQueryOptions);

  const totalGross = allIncomes.reduce((acc, income) => acc + income.amount, 0);
  const totalUrssaf = allIncomes.reduce((acc, income) => acc + calculateUrssaf(income.amount), 0);
  const totalImpot = allIncomes.reduce((acc, income) => acc + calculateTaxes(income.amount), 0);
  const totalNet = Math.max(0, totalGross - totalUrssaf - totalImpot);

  const pieChartData = [
    { name: 'Remaining Net', value: totalNet, fill: COLORS.net },
    { name: 'URSSAF', value: totalUrssaf, fill: COLORS.urssaf },
    { name: 'Taxes', value: totalImpot, fill: COLORS.impot },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = totalGross > 0 ? ((data.value / totalGross) * 100).toFixed(1) : 0;
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
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Number of Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allIncomes.length}</div>
            <p className="text-xs text-muted-foreground">Total recorded incomes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalGross)}</div>
            <p className="text-xs text-muted-foreground">Total amount before deductions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total URSSAF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">-{formatCurrency(totalUrssaf)}</div>
            <p className="text-xs text-muted-foreground">Estimated social contributions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Taxes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">-{formatCurrency(totalImpot)}</div>
            <p className="text-xs text-muted-foreground">Estimated taxes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gross Income Distribution</CardTitle>
            <CardDescription>
              Visualization of deductions (URSSAF, Taxes) and remaining net.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            {allIncomes.length > 0 ? (
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
                  <Tooltip content={<CustomTooltip />} /> {/* Custom Tooltip */}
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No data to display for the chart.
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Estimated Net Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold" style={{ color: COLORS.net }}>
              {formatCurrency(totalNet)}
            </div>
            <p className="text-sm text-muted-foreground pt-1">
              Amount remaining after estimated URSSAF and Taxes
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
