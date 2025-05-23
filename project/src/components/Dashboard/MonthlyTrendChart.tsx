import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../UI/Card';
import { LineChart } from 'lucide-react';

interface MonthlyTrendChartProps {
  data: {
    month: string;
    income: number;
    expenses: number;
  }[];
}

const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ data }) => {
  const { theme } = useTheme();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    return `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' })}`;
  };

  const chartData = data.map(item => ({
    month: formatDate(item.month),
    income: item.income,
    expenses: item.expenses,
    savings: item.income - item.expenses
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-md shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card title="Monthly Trends" icon={<LineChart size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />}>
      <div className="h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0088FE" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF8042" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FF8042" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00C49F" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke={theme === 'dark' ? '#444' : '#eee'} 
              />
              <XAxis 
                dataKey="month" 
                tick={{ fill: theme === 'dark' ? '#ccc' : '#666' }} 
              />
              <YAxis 
                tickFormatter={formatCurrency} 
                tick={{ fill: theme === 'dark' ? '#ccc' : '#666' }} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="income" 
                name="Income"
                stroke="#0088FE" 
                fillOpacity={1} 
                fill="url(#colorIncome)" 
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                name="Expenses"
                stroke="#FF8042" 
                fillOpacity={1} 
                fill="url(#colorExpenses)" 
              />
              <Area 
                type="monotone" 
                dataKey="savings" 
                name="Savings"
                stroke="#00C49F" 
                fillOpacity={1} 
                fill="url(#colorSavings)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              No trend data available
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MonthlyTrendChart;