import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../UI/Card';
import { BarChart3 } from 'lucide-react';

interface ExpenseChartProps {
  data: {
    category: string;
    amount: number;
  }[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const { theme } = useTheme();

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
    '#82CA9D', '#F77FBE', '#A569BD', '#5DADE2', '#F4D03F'
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format and sort data for the chart
  const chartData = data
    .sort((a, b) => b.amount - a.amount)
    .map(item => ({
      name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
      value: item.amount,
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-md shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <p className="font-medium">{payload[0].name}</p>
          <p className={`text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card title="Expenses by Category" icon={<BarChart3 size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />}>
      <div className="h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                formatter={(value, entry, index) => (
                  <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              No expense data available
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExpenseChart;