import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../contexts/ApiContext';
import DashboardSummary from '../components/Dashboard/DashboardSummary';
import ExpenseChart from '../components/Dashboard/ExpenseChart';
import MonthlyTrendChart from '../components/Dashboard/MonthlyTrendChart';
import GoalProgress from '../components/Dashboard/GoalProgress';
import TransactionList from '../components/Transactions/TransactionList';

interface DashboardProps {
  userId: number;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const api = useApi();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [analyticsData, transactionsData, goalsData] = await Promise.all([
          api.getAnalytics(userId),
          api.getTransactions(userId, 5), // Limit to 5 recent transactions
          api.getGoals(userId),
        ]);
        
        setAnalytics(analyticsData);
        setTransactions(transactionsData);
        setGoals(goalsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [api, userId]);

  // Calculate savings rate
  const calculateSavingsRate = () => {
    if (!analytics || analytics.total_income === 0) return 0;
    return (analytics.net_savings / analytics.total_income) * 100;
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
      
      {analytics && (
        <DashboardSummary
          totalIncome={analytics.total_income || 0}
          totalExpenses={analytics.total_expenses || 0}
          netSavings={analytics.net_savings || 0}
          savingsRate={calculateSavingsRate()}
          goalsCount={goals.length}
        />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analytics && analytics.expenses_by_category && (
          <ExpenseChart data={analytics.expenses_by_category} />
        )}
        
        {analytics && analytics.monthly_trend && (
          <MonthlyTrendChart data={analytics.monthly_trend} />
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GoalProgress
          goals={goals}
          onViewAllClick={() => navigate('/goals')}
        />
        
        <TransactionList
          transactions={transactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;