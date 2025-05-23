import React, { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { BarChart3, TrendingUp, FileText } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface AnalyticsProps {
  userId: number;
}

const Analytics: React.FC<AnalyticsProps> = ({ userId }) => {
  const api = useApi();
  const { theme } = useTheme();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [advice, setAdvice] = useState<string>('');
  const [adviceLoading, setAdviceLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await api.getAnalytics(userId);
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to load analytics. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [api, userId]);

  const handleGetAdvice = async () => {
    if (!analytics) return;
    
    setAdviceLoading(true);
    
    try {
      const userData = {
        income: analytics.total_income || 0,
        expenses: analytics.expenses_by_category || [],
        savings_goal: analytics.net_savings * 3 || 0, // Example: 3x current savings
        age: 30, // Default age
        investment_experience: 'beginner',
      };
      
      const response = await api.getFinancialAdvice(userId, userData);
      setAdvice(response.advice);
    } catch (error) {
      console.error('Error getting financial advice:', error);
      setError('Failed to get financial advice. Please try again.');
    } finally {
      setAdviceLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Prepare data for charts
  const prepareExpenseData = () => {
    if (!analytics || !analytics.expenses_by_category) return [];
    
    return analytics.expenses_by_category.map((item: any) => ({
      category: item.category.charAt(0).toUpperCase() + item.category.slice(1),
      amount: item.amount,
    }));
  };

  const prepareTrendData = () => {
    if (!analytics || !analytics.monthly_trend) return [];
    
    return analytics.monthly_trend.map((item: any) => {
      const [year, month] = item.month.split('-');
      const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' });
      
      return {
        month: monthName,
        income: item.income,
        expenses: item.expenses,
        savings: item.income - item.expenses,
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Financial Analytics</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card title="Expense Analysis" icon={<BarChart3 size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prepareExpenseData()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#444' : '#eee'} />
                <XAxis 
                  dataKey="category" 
                  tick={{ fill: theme === 'dark' ? '#ccc' : '#666' }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={60} 
                />
                <YAxis tickFormatter={formatCurrency} tick={{ fill: theme === 'dark' ? '#ccc' : '#666' }} />
                <Tooltip 
                  formatter={(value: any) => formatCurrency(value)} 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#333' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#333',
                    border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                  }} 
                />
                <Legend />
                <Bar 
                  dataKey="amount" 
                  name="Amount" 
                  fill={theme === 'dark' ? '#10b981' : '#059669'} 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Monthly Income vs. Expenses" icon={<TrendingUp size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prepareTrendData()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#444' : '#eee'} />
                <XAxis dataKey="month" tick={{ fill: theme === 'dark' ? '#ccc' : '#666' }} />
                <YAxis tickFormatter={formatCurrency} tick={{ fill: theme === 'dark' ? '#ccc' : '#666' }} />
                <Tooltip 
                  formatter={(value: any) => formatCurrency(value)} 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#333' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#333',
                    border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
                  }} 
                />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#0088FE" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#FF8042" radius={[4, 4, 0, 0]} />
                <Bar dataKey="savings" name="Savings" fill="#00C49F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Financial Advice" icon={<FileText size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />}>
          {advice ? (
            <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              {advice.split('\n\n').map((paragraph, index) => (
                <p key={index} className={`${index > 0 ? 'mt-4' : ''}`}>
                  {paragraph}
                </p>
              ))}
              <Button
                onClick={handleGetAdvice}
                className="mt-6"
                disabled={adviceLoading}
              >
                {adviceLoading ? 'Loading...' : 'Refresh Advice'}
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="mb-4">Get personalized financial advice based on your spending patterns and financial goals.</p>
              <Button
                onClick={handleGetAdvice}
                disabled={adviceLoading}
              >
                {adviceLoading ? 'Loading...' : 'Get Financial Advice'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Analytics;