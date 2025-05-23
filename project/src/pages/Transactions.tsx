import React, { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';
import TransactionList from '../components/Transactions/TransactionList';
import AddTransactionForm from '../components/Transactions/AddTransactionForm';
import { useTheme } from '../contexts/ThemeContext';

interface TransactionsProps {
  userId: number;
}

const Transactions: React.FC<TransactionsProps> = ({ userId }) => {
  const api = useApi();
  const { theme } = useTheme();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.getTransactions(userId);
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to load transactions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [api, userId]);

  const handleAddTransaction = async (transactionData: any) => {
    try {
      await api.addTransaction(userId, transactionData);
      await fetchTransactions();
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding transaction:', error);
      return Promise.reject(error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredTransactions(transactions);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = transactions.filter(
      transaction =>
        transaction.category.toLowerCase().includes(lowercaseQuery) ||
        (transaction.description && 
         transaction.description.toLowerCase().includes(lowercaseQuery))
    );
    
    setFilteredTransactions(filtered);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {loading ? (
            <div className={`rounded-lg shadow-md p-8 text-center ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-4">Loading transactions...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              <p>{error}</p>
              <button 
                onClick={fetchTransactions} 
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <TransactionList 
              transactions={filteredTransactions}
              onSearchChange={handleSearch}
            />
          )}
        </div>
        
        <div>
          <AddTransactionForm onSubmit={handleAddTransaction} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;