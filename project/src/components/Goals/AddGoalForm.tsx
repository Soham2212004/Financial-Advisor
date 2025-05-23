import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { Target, Calendar, DollarSign } from 'lucide-react';

interface AddGoalFormProps {
  onSubmit: (goal: {
    title: string;
    target_amount: number;
    current_amount: number;
    target_date?: string;
  }) => Promise<void>;
}

const AddGoalForm: React.FC<AddGoalFormProps> = ({ onSubmit }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    target_amount: '',
    current_amount: '',
    target_date: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Goal title is required';
    }
    
    if (!formData.target_amount) {
      newErrors.target_amount = 'Target amount is required';
    } else if (isNaN(parseFloat(formData.target_amount)) || parseFloat(formData.target_amount) <= 0) {
      newErrors.target_amount = 'Target amount must be a positive number';
    }
    
    if (formData.current_amount && (isNaN(parseFloat(formData.current_amount)) || parseFloat(formData.current_amount) < 0)) {
      newErrors.current_amount = 'Current amount must be a non-negative number';
    }
    
    if (formData.target_date) {
      const targetDate = new Date(formData.target_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (targetDate < today) {
        newErrors.target_date = 'Target date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await onSubmit({
        title: formData.title,
        target_amount: parseFloat(formData.target_amount),
        current_amount: formData.current_amount ? parseFloat(formData.current_amount) : 0,
        target_date: formData.target_date || undefined,
      });
      
      // Reset form after successful submission
      setFormData({
        title: '',
        target_amount: '',
        current_amount: '',
        target_date: '',
      });
    } catch (error) {
      console.error('Error adding goal:', error);
    } finally {
      setLoading(false);
    }
  };

  // Common goal suggestions
  const goalSuggestions = [
    'Emergency Fund',
    'Down Payment',
    'Vacation Fund',
    'Retirement',
    'Education',
    'Car Purchase',
    'Debt Payoff',
    'Home Renovation',
  ];

  return (
    <Card title="Add Financial Goal" icon={<Target size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Goal Title"
          name="title"
          type="text"
          placeholder="e.g., Emergency Fund"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />

        <div className="mb-4">
          <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            Goal Suggestions
          </label>
          <div className="flex flex-wrap gap-2">
            {goalSuggestions.map(suggestion => (
              <button
                key={suggestion}
                type="button"
                className={`text-xs px-3 py-1 rounded-full ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, title: suggestion }))}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Target Amount"
          name="target_amount"
          type="number"
          placeholder="0.00"
          value={formData.target_amount}
          onChange={handleChange}
          icon={<DollarSign size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />}
          error={errors.target_amount}
          min="0.01"
          step="0.01"
        />

        <Input
          label="Current Amount (Optional)"
          name="current_amount"
          type="number"
          placeholder="0.00"
          value={formData.current_amount}
          onChange={handleChange}
          icon={<DollarSign size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />}
          error={errors.current_amount}
          min="0"
          step="0.01"
        />

        <Input
          label="Target Date (Optional)"
          name="target_date"
          type="date"
          value={formData.target_date}
          onChange={handleChange}
          icon={<Calendar size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />}
          error={errors.target_date}
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
          className="mt-2"
        >
          {loading ? 'Adding...' : 'Add Goal'}
        </Button>
      </form>
    </Card>
  );
};

export default AddGoalForm;