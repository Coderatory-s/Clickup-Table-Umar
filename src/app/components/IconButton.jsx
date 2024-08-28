"use client"
import React from 'react';
import { Button } from '@/components/ui/button'; // Adjust the path based on your project structure

const IconButton = ({ children, onClick, ariaLabel, className, ...props }) => {
  return (
    <Button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`p-2 ${className}`} // You can customize padding, margin, etc.
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;
