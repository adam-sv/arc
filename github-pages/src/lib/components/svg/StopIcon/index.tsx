import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';
/* eslint-disable max-len */

export const StopIcon = ({ className = '', ...props }) => (
  <svg
    className={cn('ARC-SVG-icon', 'ARC-SVG-icon-StopIcon', className)}
    preserveAspectRatio='xMidYMid meet'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 60 60'
    {...props}
  >
    <g fill='none' fillRule='evenodd'>
      <circle className={'circle'} cx='30' cy='30' r='28' />
      <rect className={'square'} width='20' height='20' x='20' y='20' rx='3' />
    </g>
  </svg>
);
