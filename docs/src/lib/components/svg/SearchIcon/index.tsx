import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';
/* eslint-disable max-len */

export const SearchIcon = ({ className = '', ...props }) => (
  <svg
    className={cn('ARC-SVG-icon', 'ARC-SVG-icon-SearchIcon', className)}
    preserveAspectRatio='xMidYMid meet'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    {...props}
  >
    <path d='M508.87 478.7L360.14 329.99a201.62 201.62 0 0045.2-127.31C405.33 90.92 314.41 0 202.66 0S0 90.92 0 202.67s90.92 202.66 202.67 202.66c48.2 0 92.48-16.98 127.3-45.19l148.74 148.74a10.67 10.67 0 0015.08 0l15.08-15.09a10.67 10.67 0 000-15.08zm-306.2-116.03c-88.23 0-160-71.77-160-160s71.77-160 160-160 160 71.77 160 160-71.77 160-160 160z' />
  </svg>
);
