import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';
/* eslint-disable max-len */

export const WalletIcon = ({ className = '', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={cn('ARC-SVG-icon', 'ARC-SVG-icon-WalletIcon', className)}
    viewBox='0 0 23 22'
    {...props}
  >
    <path
      fillRule='nonzero'
      d='M21.79 18.33v1.23A2.44 2.44 0 0119.37 22H2.42A2.43 2.43 0 010 19.56V2.44A2.43 2.43 0 012.42 0h16.95c1.33 0 2.42 1.1 2.42 2.44v1.23h-10.9A2.43 2.43 0 008.47 6.1v9.78a2.43 2.43 0 002.42 2.44h10.9zm-10.9-2.44H23V6.1H10.9v9.78zm4.85-3.06c-1 0-1.82-.82-1.82-1.83a1.82 1.82 0 113.63 0c0 1.01-.8 1.83-1.81 1.83z'
    />
  </svg>
);
