import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;