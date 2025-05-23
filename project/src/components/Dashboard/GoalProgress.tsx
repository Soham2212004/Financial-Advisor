import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../UI/Card';
import { Target } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date?: string;
  status: string;
}

interface GoalProgressProps {
  goals: Goal[];
  onViewAllClick: () => void;
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goals, onViewAllClick }) => {
  const { theme } = useTheme();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return 'No deadline';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return theme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-500';
    if (progress >= 75) return theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-400';
    if (progress >= 50) return theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500';
    if (progress >= 25) return theme === 'dark' ? 'bg-yellow-600' : 'bg-yellow-500';
    return theme === 'dark' ? 'bg-red-600' : 'bg-red-500';
  };

  return (
    <Card 
      title="Financial Goals" 
      icon={<Target size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />}
    >
      {goals.length > 0 ? (
        <div className="space-y-4">
          {goals.slice(0, 3).map((goal) => {
            const progress = Math.min(Math.round((goal.current_amount / goal.target_amount) * 100), 100);
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{goal.title}</h4>
                  <span className={`text-sm px-2 py-0.5 rounded-full ${
                    goal.status === 'completed' 
                      ? theme === 'dark' ? 'bg-emerald-900/50 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                      : goal.status === 'active'
                      ? theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                      : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {formatCurrency(goal.current_amount)} of {formatCurrency(goal.target_amount)}
                  </span>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    {formatDate(goal.target_date)}
                  </span>
                </div>
                
                <div className={`h-2 w-full rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(progress)} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
          
          {goals.length > 3 && (
            <button 
              onClick={onViewAllClick}
              className={`mt-2 text-sm font-medium ${
                theme === 'dark' ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
              }`}
            >
              View all {goals.length} goals
            </button>
          )}
        </div>
      ) : (
        <div className="py-4 text-center">
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            No financial goals set yet
          </p>
          <button 
            onClick={onViewAllClick}
            className={`mt-2 text-sm font-medium ${
              theme === 'dark' ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
            }`}
          >
            Create your first goal
          </button>
        </div>
      )}
    </Card>
  );
};

export default GoalProgress;