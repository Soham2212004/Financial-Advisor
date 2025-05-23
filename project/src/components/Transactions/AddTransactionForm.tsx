import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { CircleDollarSign, Plus, Minus, Calendar } from 'lucide-react';

interface AddTransactionFormProps {
  onSubmit: (transaction: {
    category: string;
    amount: number;
    type: 'income' | 'expense';
    description: string;
    date: string;
  }) => Promise<void>;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onSubmit }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    description: '',
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleTypeChange = (type: 'income' | 'expense') => {
    setFormData(prev => ({ ...prev, type }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
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
        ...formData,
        amount: parseFloat(formData.amount),
      });
      
      // Reset form after successful submission
      setFormData({
        category: '',
        amount: '',
        type: 'expense',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  // Common categories for transactions
  const categories = [
    'Salary', 'Bonus', 'Investment', 'Gift',
    'Rent', 'Groceries', 'Utilities', 'Transportation', 
    'Dining', 'Entertainment', 'Healthcare', 'Shopping', 
    'Education', 'Travel', 'Savings', 'Other'
  ];

  return (
    <Card title="Add Transaction" icon={<CircleDollarSign size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            Transaction Type
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center ${
                formData.type === 'expense'
                  ? theme === 'dark'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-500 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              } transition-colors`}
              onClick={() => handleTypeChange('expense')}
            >
              <Minus size={16} className="mr-2" />
              Expense
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center ${
                formData.type === 'income'
                  ? theme === 'dark'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-500 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              } transition-colors`}
              onClick={() => handleTypeChange('income')}
            >
              <Plus size={16} className="mr-2" />
              Income
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`block w-full rounded-md shadow-sm py-2 px-3 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.category ? 'border-red-500' : ''
            }`}
          >
            <option value="">Select a category</option>
            {categories
              .filter(cat => formData.type === 'income' 
                ? ['Salary', 'Bonus', 'Investment', 'Gift', 'Other'].includes(cat) 
                : !['Salary', 'Bonus', 'Investment'].includes(cat))
              .map(category => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))
            }
          </select>
          {errors.category && (
            <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
              {errors.category}
            </p>
          )}
        </div>

        <Input
          label="Amount"
          name="amount"
          type="number"
          placeholder="0.00"
          value={formData.amount}
          onChange={handleChange}
          icon={<CircleDollarSign size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />}
          error={errors.amount}
          min="0.01"
          step="0.01"
        />

        <Input
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          icon={<Calendar size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />}
          error={errors.date}
        />

        <div className="mb-4">
          <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            Description (Optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add details about this transaction"
            className={`block w-full rounded-md shadow-sm py-2 px-3 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            rows={3}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
          className="mt-2"
        >
          {loading ? 'Adding...' : 'Add Transaction'}
        </Button>
      </form>
    </Card>
  );
};

export default AddTransactionForm;