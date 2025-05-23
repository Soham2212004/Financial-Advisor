import React, { InputHTMLAttributes, forwardRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    const { theme } = useTheme();
    
    const baseInputClasses = 'block w-full rounded-md shadow-sm focus:ring-2 focus:outline-none';
    
    const themeInputClasses = theme === 'dark'
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400';
    
    const errorInputClasses = error
      ? theme === 'dark'
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : '';
    
    return (
      <div className="mb-4">
        {label && (
          <label 
            className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`${baseInputClasses} ${themeInputClasses} ${errorInputClasses} ${
              icon ? 'pl-10' : 'pl-3'
            } py-2 ${className}`}
            {...props}
          />
        </div>
        
        {error && (
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Input;