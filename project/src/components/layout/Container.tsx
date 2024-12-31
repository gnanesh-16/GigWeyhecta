import React from 'react';
export const runtime = "edge";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  duration?: string; // Add
  actions?: number;  // Add
  size?: string;     // Add
}

export default function Container({ 
  children, 
  className = '', 
  duration, 
  actions, 
  size 
}: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {duration && actions !== undefined && size && (
        <div className="mb-4 text-gray-300 text-sm flex gap-4">
          <span>Duration: {duration}</span>
          <span>Actions: {actions}</span>
          <span>Size: {size}</span>
        </div>
      )}
      {children}
    </div>
  );
}