import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';
/* eslint-disable max-len */

export const ChartIcon = ({ className = '', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 22 22'
    className={cn('ARC-SVG-icon', 'ARC-SVG-icon-ChartIcon', className)}
    {...props}
    fill='#FFF'
  >
    <path
      fillRule='nonzero'
      d='M9.63 7.88V0C4.28.55 0 5.27 0 11s4.28 10.45 9.63 11v-7.88A3.57 3.57 0 017.48 11a3.57 3.57 0 012.13-3.12zm4.73 1.75H22A10.53 10.53 0 0012.37 0v7.66c1.07.32 1.63 1.05 2 1.96zm-1.98 4.71V22c5.34-.5 9.1-4.55 9.62-9.63h-7.64c-.36.92-.92 1.65-1.98 1.97z'
    />
  </svg>
);
