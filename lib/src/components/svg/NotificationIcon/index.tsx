import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';
/* eslint-disable max-len */

export const NotificationIcon = ({ className = '', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={cn('ARC-SVG-icon', 'ARC-SVG-icon-NotificationIcon', className)}
    preserveAspectRatio='xMidYMid meet'
    viewBox='0 0 22 25'
    {...props}
  >
    <path d='M18.96 21.67c.14-.72-.2-2.17-.07-2.94.23-1.4 2.34-5.24 2.34-5.24a8.63 8.63 0 00-1.84-9.76A3.04 3.04 0 0017.53.25a3.27 3.27 0 00-3.9 1.11A9.27 9.27 0 005 6.81s-1.43 4.11-2.33 5.24C2.17 12.67.7 13.7.26 14.3c-.65.86 0 2.12.99 2.52l15.48 6.05a1.6 1.6 0 002.23-1.2M1.04 21a3.5 3.5 0 001.99 3.72c1.43.64 3.06.15 3.97-1.07L1.04 21' />
  </svg>
);
