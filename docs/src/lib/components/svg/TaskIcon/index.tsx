import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';
/* eslint-disable max-len */

export const TaskIcon = ({ className = '', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={cn('ARC-SVG-icon', 'ARC-SVG-icon-TaskIcon', className)}
    preserveAspectRatio='xMinYMid meet'
    viewBox='0 0 18 20'
    {...props}
  >
    <path d='M16 2h-4.18A3.01 3.01 0 009 0C7.7 0 6.6.84 6.18 2H2a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14a2 2 0 002-2V4a2 2 0 00-2-2zM9 2a1 1 0 011 1 1 1 0 01-1 1 1 1 0 01-1-1 1 1 0 011-1zm2 14H4v-2h7v2zm3-4H4v-2h10v2zm0-4H4V6h10v2z' />
  </svg>
);
