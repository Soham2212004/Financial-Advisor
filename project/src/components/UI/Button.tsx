import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const { theme } = useTheme();
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const variantClasses = {
    primary: theme === 'dark' 
      ? 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500'
      : 'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-400',
    secondary: theme === 'dark'
      ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
      : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400',
    outline: theme === 'dark'
      ? 'border border-gray-600 hover:bg-gray-700 text-gray-200 focus:ring-gray-500'
      : 'border border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-300',
    danger: theme === 'dark'
      ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
      : 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;