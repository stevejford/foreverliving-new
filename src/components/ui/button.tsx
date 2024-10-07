import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'default', 
  ...props 
}) => {
  const baseStyles = "font-bold py-2 px-4 rounded";
  const variantStyles = {
    default: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
