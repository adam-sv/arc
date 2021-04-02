import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.css';

export const PersonTagIcon = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 24"
    className={cn('PersonTagIcon', className)}
    {...props}
  >
    <path
      fillRule="nonzero"
      d="M19.56 2.4h-5.11a3.68 3.68 0 00-6.9 0h-5.1A2.43 2.43 0 000 4.8v16.8C0 22.92 1.1 24 2.44 24h17.12A2.43 2.43 0 0022 21.6V4.8c0-1.32-1.1-2.4-2.44-2.4zM11 2.4c.67 0 1.22.54 1.22 1.2 0 .66-.55 1.2-1.22 1.2-.67 0-1.22-.54-1.22-1.2 0-.66.55-1.2 1.22-1.2zm0 4.8c2.03 0 3.67 1.6 3.67 3.6s-1.64 3.6-3.67 3.6a3.63 3.63 0 01-3.67-3.6c0-2 1.64-3.6 3.67-3.6zm7.33 14.4H3.67v-1.68c0-2.4 4.89-3.72 7.33-3.72 2.44 0 7.33 1.32 7.33 3.72v1.68z"
    />
  </svg>
);
