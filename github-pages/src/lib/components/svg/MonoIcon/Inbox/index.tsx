import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-Inbox', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 14V19H19V14H16.7208L15.9487 16.3162C15.8126 16.7246 15.4304 17 15 17H9C8.56957 17 8.18743 16.7246 8.05132 16.3162L7.27924 14H5ZM19 12V5H5V12H7.27924C8.1401 12 8.90438 12.5509 9.17661 13.3675L9.72076 15H14.2792L14.8234 13.3675C15.0956 12.5509 15.8599 12 16.7208 12H19Z'
    />
  </svg>
);
