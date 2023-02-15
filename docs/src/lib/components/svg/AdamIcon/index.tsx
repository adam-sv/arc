import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';

export const AdamIcon = ({ className = '', ...props }) => (
  <svg
    className={cn('ARC-SVG-icon', 'ARC-SVG-icon-AdamIcon', className)}
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='xMinYMid meet'
    viewBox='0 0 22 37'
    {...props}
  >
    <path d='M8.36 1h-.1L1.01 36h6.2l4.71-26.83 3.63 21.4h5.94L15.4 1z' />
  </svg>
);
