import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';
/* eslint-disable max-len */

export const LightbulbIcon = ({ className = '', ...props }) => (
  <svg
    className={cn('ARC-SVG-icon-LightbulbIcon', 'ARC-SVG-icon', className)}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 22'
    preserveAspectRatio='xMinYMid meet'
    {...props}
  >
    <path d='M2.62 17.81l1.57 1.57 1.89-1.88-1.47-1.47-2 1.78zm7.86 4.09h2.1v-3.04h-2.1v3.04zM3.14 9.43H0v2.1h3.14v-2.1zm11.53-4.4V0H8.38v5.03a6.3 6.3 0 003.14 11.73 6.3 6.3 0 003.15-11.73zm5.23 4.4v2.1h3.15v-2.1H19.9zm-2.93 8.07l1.89 1.88 1.46-1.47-1.88-1.88-1.47 1.47z' />
  </svg>
);
