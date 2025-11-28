import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'google';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "primary", className, ...props }) => {
  const baseStyle = "px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-3 tracking-wide text-lg";
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100",
    secondary: "bg-white text-gray-900 border-2 border-gray-100 hover:border-purple-600 hover:text-purple-600",
    outline: "bg-transparent border-2 border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900",
    ghost: "text-gray-500 hover:text-gray-900",
    google: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};
