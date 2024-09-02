import React from 'react';

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  customClassName?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  customClassName,
  onClick,
  children,
  disabled,
}) => (
  <button
    className={customClassName || `text-white-standard text-sm font-medium px-4 py-2 rounded-md duration-300 hover:bg-red-900 focus:outline-none ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-10'}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>

);
export default Button;
