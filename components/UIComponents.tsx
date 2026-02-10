import React from 'react';
import { PainterStyle } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  styleData: PainterStyle;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const WowButton: React.FC<ButtonProps> = ({ 
  children, 
  active, 
  styleData, 
  variant = 'primary', 
  className = '',
  ...props 
}) => {
  let bgClass = '';
  if (variant === 'primary') {
    bgClass = active ? 'bg-opacity-100 ring-2 ring-offset-2' : 'bg-opacity-20 hover:bg-opacity-40';
  } else if (variant === 'secondary') {
    bgClass = 'bg-transparent border border-current';
  }

  return (
    <button
      className={`px-4 py-2 rounded-lg transition-all duration-300 font-bold shadow-lg 
      ${bgClass} ${styleData.borderColor} ${styleData.fontFamily} ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? (active ? undefined : 'rgba(0,0,0,0.2)') : undefined,
        color: 'inherit'
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; styleData: PainterStyle; className?: string }> = ({ 
  children, 
  styleData, 
  className = '' 
}) => {
  return (
    <div className={`p-6 rounded-xl shadow-2xl border ${styleData.cardBg} ${styleData.borderColor} ${styleData.textColor} ${styleData.fontFamily} transition-all duration-500 ${className}`}>
      {children}
    </div>
  );
};

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { styleData: PainterStyle }> = ({ 
  styleData, 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <select
      className={`px-3 py-2 rounded-md bg-white/20 border ${styleData.borderColor} focus:outline-none focus:ring-2 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
