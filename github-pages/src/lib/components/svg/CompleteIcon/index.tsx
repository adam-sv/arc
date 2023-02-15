import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';
/* eslint-disable max-len */

export const CompleteIcon = ({ className = '', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={cn('ARC-SVG-icon', 'ARC-SVG-icon-CompleteIcon', className)}
    preserveAspectRatio='xMidYMid meet'
    viewBox='0 0 53 53'
    {...props}
  >
    <path d='M26.5 0A26.53 26.53 0 000 26.5 26.53 26.53 0 0026.5 53 26.53 26.53 0 0053 26.5 26.53 26.53 0 0026.5 0zm14.07 18.57L24.09 36.63a2.1 2.1 0 01-3.03.09l-8.55-8.38c-.81-.8-.82-2.1 0-2.9a2.1 2.1 0 012.95-.01l6.99 6.85 15.01-16.46a2.11 2.11 0 012.95-.15c.86.76.93 2.05.16 2.9z' />
  </svg>
);
