import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-Heart', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 4.52765C9.64418 2.41689 6.02125 2.49347 3.75736 4.75736C1.41421 7.1005 1.41421 10.8995 3.75736 13.2426L10.5858 20.0711C11.3668 20.8521 12.6332 20.8521 13.4142 20.0711L20.2426 13.2426C22.5858 10.8995 22.5858 7.1005 20.2426 4.75736C17.9787 2.49347 14.3558 2.41689 12 4.52765ZM10.8284 6.17157C9.26633 4.60948 6.73367 4.60948 5.17157 6.17157C3.60948 7.73367 3.60948 10.2663 5.17157 11.8284L12 18.6569L18.8284 11.8284C20.3905 10.2663 20.3905 7.73367 18.8284 6.17157C17.2663 4.60948 14.7337 4.60948 13.1716 6.17157L12.7071 6.63604C12.3166 7.02656 11.6834 7.02656 11.2929 6.63604L10.8284 6.17157Z'
    />
  </svg>
);
