import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.css';

export const CalendarIcon = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 24"
    className={cn('CalendarIcon', className)}
    {...props}
    fill="#FFF"
  >
    <path
      fillRule="nonzero"
      d="M19.56 2.4h-1.23V0H15.9v2.4H6.1V0H3.67v2.4H2.44A2.41 2.41 0 00.01 4.8L0 21.6C0 22.92 1.09 24 2.44 24h17.12A2.43 2.43 0 0022 21.6V4.8c0-1.32-1.1-2.4-2.44-2.4zm0 19.2H2.44V8.4h17.12v13.2zM4.89 10.8H11v6H4.89v-6z"
    />
  </svg>
);
