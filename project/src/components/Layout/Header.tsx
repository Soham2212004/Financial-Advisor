import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useApi } from '../../contexts/ApiContext';
import { Moon, Sun, User, Bell } from 'lucide-react';
import ThemeToggle from '../UI/ThemeToggle';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const api = useApi();
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<number>(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await api.getUserProfile(1);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUser();
  }, [api]);

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md z-10 transition-colors duration-300`}>
      <div className="h-full mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-lg md:text-xl font-bold flex items-center">
            <span className="hidden md:inline">Financial</span>
            <span className="md:hidden">Fin</span>
            <span className={`ml-1 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>Advisor</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <div className="relative">
            <Bell size={20} className="cursor-pointer hover:text-emerald-500 transition-colors" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-emerald-700' : 'bg-emerald-100'}`}>
              <User size={16} className={theme === 'dark' ? 'text-emerald-200' : 'text-emerald-700'} />
            </div>
            <span className="ml-2 hidden md:block font-medium">
              {user ? user.name : 'User'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;