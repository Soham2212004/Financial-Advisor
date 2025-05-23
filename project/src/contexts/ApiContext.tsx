import React, { createContext, useContext, ReactNode } from 'react';
import { apiGet, apiPost, apiPut } from '../services/api';

interface ApiContextType {
  getUserProfile: (userId: number) => Promise<any>;
  updateUserProfile: (userId: number, data: any) => Promise<any>;
  getTransactions: (userId: number, limit?: number) => Promise<any>;
  addTransaction: (userId: number, data: any) => Promise<any>;
  getAnalytics: (userId: number) => Promise<any>;
  getGoals: (userId: number) => Promise<any>;
  addGoal: (userId: number, data: any) => Promise<any>;
  updateGoalProgress: (goalId: number, currentAmount: number) => Promise<any>;
  chatWithBot: (userId: number, message: string) => Promise<any>;
  getChatHistory: (userId: number, limit?: number) => Promise<any>;
  getFinancialAdvice: (userId: number, data: any) => Promise<any>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const getUserProfile = (userId: number) => {
    return apiGet(`/api/user/${userId}`);
  };

  const updateUserProfile = (userId: number, data: any) => {
    return apiPut(`/api/user/${userId}`, data);
  };

  const getTransactions = (userId: number, limit = 50) => {
    return apiGet(`/api/transactions/${userId}?limit=${limit}`);
  };

  const addTransaction = (userId: number, data: any) => {
    return apiPost('/api/transactions', { ...data, user_id: userId });
  };

  const getAnalytics = (userId: number) => {
    return apiGet(`/api/analytics/${userId}`);
  };

  const getGoals = (userId: number) => {
    return apiGet(`/api/goals/${userId}`);
  };

  const addGoal = (userId: number, data: any) => {
    return apiPost('/api/goals', { ...data, user_id: userId });
  };

  const updateGoalProgress = (goalId: number, currentAmount: number) => {
    return apiPut(`/api/goals/${goalId}`, { current_amount: currentAmount });
  };

  const chatWithBot = (userId: number, message: string) => {
    return apiPost('/api/chat', { message, user_id: userId });
  };

  const getChatHistory = (userId: number, limit = 20) => {
    return apiGet(`/api/chat/history/${userId}?limit=${limit}`);
  };

  const getFinancialAdvice = (userId: number, data: any) => {
    return apiPost('/api/financial-advice', { ...data, user_id: userId });
  };

  const value = {
    getUserProfile,
    updateUserProfile,
    getTransactions,
    addTransaction,
    getAnalytics,
    getGoals,
    addGoal,
    updateGoalProgress,
    chatWithBot,
    getChatHistory,
    getFinancialAdvice,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};