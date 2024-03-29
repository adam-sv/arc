import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-Play', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M6 6.74105C6 5.19747 7.67443 4.23573 9.00774 5.01349L18.0231 10.2725C19.3461 11.0442 19.3461 12.9558 18.0231 13.7276L9.00774 18.9865C7.67443 19.7643 6 18.8026 6 17.259V6.74105ZM17.0154 12L8 6.74105V17.259L17.0154 12Z'
    />
  </svg>
);
