import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { Target, CalendarClock } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date?: string;
  status: string;
}

interface GoalsListProps {
  goals: Goal[];
  onUpdateProgress: (goalId: number, amount: number) => Promise<void>;
}

const GoalsList: React.FC<GoalsListProps> = ({ goals, onUpdateProgress }) => {
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

  const getTimeLeft = (dateStr: string | undefined) => {
    if (!dateStr) return null;
    
    const targetDate = new Date(dateStr);
    const today = new Date();
    
    // Set time to beginning of day for accurate day calculation
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 30) return `${diffDays} days left`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} left`;
    }
    
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} left`;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return theme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-500';
    if (progress >= 75) return theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-400';
    if (progress >= 50) return theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500';
    if (progress >= 25) return theme === 'dark' ? 'bg-yellow-600' : 'bg-yellow-500';
    return theme === 'dark' ? 'bg-red-600' : 'bg-red-500';
  };

  const [editingGoalId, setEditingGoalId] = React.useState<number | null>(null);
  const [newAmount, setNewAmount] = React.useState<string>('');

  const handleUpdateProgress = async (goalId: number) => {
    if (!newAmount || isNaN(parseFloat(newAmount)) || parseFloat(newAmount) < 0) {
      return;
    }
    
    await onUpdateProgress(goalId, parseFloat(newAmount));
    setEditingGoalId(null);
    setNewAmount('');
  };

  return (
    <Card title="Your Financial Goals" icon={<Target size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />}>
      {goals.length > 0 ? (
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = Math.min(Math.round((goal.current_amount / goal.target_amount) * 100), 100);
            const timeLeft = getTimeLeft(goal.target_date);
            
            return (
              <div 
                key={goal.id} 
                className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{goal.title}</h3>
                  <span className={`text-sm px-2 py-0.5 rounded-full ${
                    goal.status === 'completed' 
                      ? theme === 'dark' ? 'bg-emerald-900/50 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                      : goal.status === 'active'
                      ? theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                      : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Progress: {formatCurrency(goal.current_amount)} of {formatCurrency(goal.target_amount)}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Target date: {formatDate(goal.target_date)}
                    </p>
                  </div>
                  
                  {timeLeft && (
                    <div className={`flex items-center text-sm ${
                      timeLeft === 'Overdue' 
                        ? theme === 'dark' ? 'text-red-400' : 'text-red-600' 
                        : theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      <CalendarClock size={16} className="mr-1" />
                      {timeLeft}
                    </div>
                  )}
                </div>
                
                <div className="mb-3">
                  <div className={`h-2 w-full rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(progress)} transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-1 text-right text-sm font-medium">
                    {progress}%
                  </div>
                </div>
                
                {editingGoalId === goal.id ? (
                  <div className="mt-3 flex space-x-2">
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      placeholder="New amount"
                      className={`block w-full rounded-md shadow-sm py-2 px-3 ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                      min="0"
                      step="0.01"
                    />
                    <Button
                      onClick={() => handleUpdateProgress(goal.id)}
                      size="sm"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingGoalId(null);
                        setNewAmount('');
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setEditingGoalId(goal.id);
                      setNewAmount(goal.current_amount.toString());
                    }}
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="mt-2"
                    disabled={goal.status === 'completed'}
                  >
                    Update Progress
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-6 text-center">
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            You haven't set any financial goals yet.
          </p>
          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Add a goal to start tracking your progress!
          </p>
        </div>
      )}
    </Card>
  );
};

export default GoalsList;