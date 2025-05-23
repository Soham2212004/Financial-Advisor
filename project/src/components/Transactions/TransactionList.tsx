import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../UI/Card';
import { ArrowDownRight, ArrowUpRight, Search } from 'lucide-react';

interface Transaction {
  id: number;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  description?: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onSearchChange?: (query: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onSearchChange 
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryIcon = (category: string) => {
    // Simplified category icons (can be expanded)
    const firstLetter = category.charAt(0).toUpperCase();
    
    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center 
        ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {firstLetter}
        </span>
      </div>
    );
  };

  return (
    <Card title="Recent Transactions">
      {onSearchChange && (
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className={`pl-10 pr-4 py-2 w-full rounded-md ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white'
                : 'bg-white border-gray-300 placeholder-gray-400 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}

      <div className={`rounded-md overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${theme === 'dark' ? 'border border-gray-700' : 'border border-gray-200'}`}>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Category
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Description
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Date
                  </th>
                  <th scope="col" className={`px-6 py-3 text-right text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getCategoryIcon(transaction.category)}
                        <span className="ml-3 font-medium">
                          {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {transaction.description || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {formatDate(transaction.date)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end">
                        {transaction.type === 'income' ? (
                          <ArrowUpRight size={16} className="text-emerald-500 mr-1" />
                        ) : (
                          <ArrowDownRight size={16} className="text-red-500 mr-1" />
                        )}
                        <span 
                          className={
                            transaction.type === 'income' 
                              ? theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600' 
                              : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                          }
                        >
                          {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              No transactions found
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TransactionList;