import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative p-2 rounded-full transition-all duration-300 ${
        isAnimating ? 'scale-110' : ''
      } ${
        theme === 'dark'
          ? 'bg-gray-700 text-yellow-300'
          : 'bg-blue-100 text-blue-800'
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative">
        {theme === 'dark' ? (
          <Sun size={20} className={`transition-all duration-500 ${isAnimating ? 'rotate-180' : ''}`} />
        ) : (
          <Moon size={20} className={`transition-all duration-500 ${isAnimating ? 'rotate-180' : ''}`} />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;