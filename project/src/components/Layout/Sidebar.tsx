import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  BarChart3, 
  CircleDollarSign, 
  Target, 
  MessageCircle, 
  LayoutDashboard,
  UserRound,
  Menu,
  X
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/transactions', label: 'Transactions', icon: <CircleDollarSign size={20} /> },
    { path: '/goals', label: 'Goals', icon: <Target size={20} /> },
    { path: '/chat', label: 'Advisor Chat', icon: <MessageCircle size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { path: '/profile', label: 'Profile', icon: <UserRound size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <button 
        onClick={toggleSidebar}
        className={`md:hidden fixed bottom-4 right-4 z-30 p-3 rounded-full shadow-lg ${
          theme === 'dark' ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav 
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } fixed md:static top-16 left-0 bottom-0 w-64 ${
          theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
        } shadow-lg md:shadow-none transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex-1 mt-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? theme === 'dark'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                        : theme === 'dark'
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={`${isActive(item.path) ? theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="ml-3 font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={`mt-auto pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className="text-sm font-medium">Need help?</p>
              <p className="text-xs opacity-75 mt-1">Chat with our financial advisor</p>
              <Link
                to="/chat"
                className={`mt-2 flex items-center justify-center p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                } transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={16} className="mr-2" />
                <span className="text-sm">Start Chat</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;