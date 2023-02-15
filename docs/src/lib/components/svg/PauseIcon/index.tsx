import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';
/* eslint-disable max-len */

export const PauseIcon = ({ className = '', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={cn('ARC-SVG-icon', 'ARC-SVG-icon-PauseIcon', className)}
    preserveAspectRatio='xMidYMid meet'
    viewBox='-1 -1 55 55'
    fill='none'
    fillRule='evenodd'
    {...props}
  >
    <circle cx='26.5' cy='26.5' r='26.5' />
    <path
      strokeLinecap='round'
      strokeWidth='5'
      d='M33 17.26v18.23M21 17.26v18.23'
    />
  </svg>
);
