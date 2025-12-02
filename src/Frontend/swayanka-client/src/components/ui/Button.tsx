import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'google';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "primary", className, ...props }) => {
  const baseStyle = "px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-3 tracking-wide text-lg";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-black",
    secondary: "bg-white text-black border-2 border-gray-100 hover:border-black",
    outline: "bg-transparent border-2 border-gray-200 text-gray-700 hover:border-black hover:text-black",
    ghost: "text-gray-500 hover:text-black",
    google: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};
