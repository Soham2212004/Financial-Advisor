import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../UI/Card';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

interface DashboardSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate?: number;
  goalsCount?: number;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  totalIncome,
  totalExpenses,
  netSavings,
  savingsRate = 0,
  goalsCount = 0,
}) => {
  const { theme } = useTheme();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      icon: <TrendingUp size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />,
      color: theme === 'dark' ? 'bg-emerald-900/20' : 'bg-emerald-50',
      textColor: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: <TrendingDown size={20} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />,
      color: theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50',
      textColor: theme === 'dark' ? 'text-red-400' : 'text-red-600',
    },
    {
      title: 'Net Savings',
      value: formatCurrency(netSavings),
      icon: <DollarSign size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />,
      color: theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50',
      textColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      icon: <Target size={20} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />,
      color: theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50',
      textColor: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className={`${card.color} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {card.title}
              </p>
              <p className={`text-2xl font-bold mt-1 ${card.textColor}`}>
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${card.color}`}>
              {card.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardSummary;