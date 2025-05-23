import React, { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  icon, 
  className = '',
  onClick
}) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-800 text-white hover:shadow-lg hover:shadow-gray-700/20' 
          : 'bg-white text-gray-800 hover:shadow-lg hover:shadow-gray-200/50'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {(title || icon) && (
        <div className={`px-5 py-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} flex items-center`}>
          {icon && <span className="mr-2">{icon}</span>}
          {title && <h3 className="font-medium text-lg">{title}</h3>}
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default Card;