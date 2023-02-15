import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';
/* eslint-disable max-len */

export const TaskOverdueIcon = ({ className = '', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={cn('ARC-SVG-icon', 'ARC-SVG-icon-TaskOverdueIcon', className)}
    preserveAspectRatio='xMinYMid meet'
    viewBox='0 0 18 20'
    {...props}
  >
    <path d='M16 2h-4.18A3.01 3.01 0 009 0C7.7 0 6.6.84 6.18 2H2a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14a2 2 0 002-2V4a2 2 0 00-2-2zm-6 15H8v-2h2v2zm0-4H8V7h2v6zM9 4a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1z' />
  </svg>
);
