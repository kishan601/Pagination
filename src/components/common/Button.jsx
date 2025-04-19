import React from 'react';
import './Button.css';

const Button = ({ children, onClick, disabled, className, type = 'button' }) => {
  return (
    <button 
      type={type}
      className={`button ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;