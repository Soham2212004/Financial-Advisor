import React, { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';
import GoalsList from '../components/Goals/GoalsList';
import AddGoalForm from '../components/Goals/AddGoalForm';
import { useTheme } from '../contexts/ThemeContext';

interface GoalsProps {
  userId: number;
}

const Goals: React.FC<GoalsProps> = ({ userId }) => {
  const api = useApi();
  const { theme } = useTheme();
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.getGoals(userId);
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
      setError('Failed to load goals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [api, userId]);

  const handleAddGoal = async (goalData: any) => {
    try {
      await api.addGoal(userId, goalData);
      await fetchGoals();
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding goal:', error);
      return Promise.reject(error);
    }
  };

  const handleUpdateProgress = async (goalId: number, currentAmount: number) => {
    try {
      await api.updateGoalProgress(goalId, currentAmount);
      await fetchGoals();
      return Promise.resolve();
    } catch (error) {
      console.error('Error updating goal progress:', error);
      return Promise.reject(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Financial Goals</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {loading ? (
            <div className={`rounded-lg shadow-md p-8 text-center ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-4">Loading goals...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              <p>{error}</p>
              <button 
                onClick={fetchGoals} 
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <GoalsList 
              goals={goals}
              onUpdateProgress={handleUpdateProgress}
            />
          )}
        </div>
        
        <div>
          <AddGoalForm onSubmit={handleAddGoal} />
        </div>
      </div>
    </div>
  );
};

export default Goals;