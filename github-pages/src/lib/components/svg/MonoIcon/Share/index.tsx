import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-Share', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711C15.3166 7.09763 14.6834 7.09763 14.2929 6.70711L13 5.41421V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V5.41421L9.70711 6.70711C9.31658 7.09763 8.68342 7.09763 8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289L11.2929 2.29289ZM4 11C4 9.89543 4.89543 9 6 9H8C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11H6V20H18V11H16C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9H18C19.1046 9 20 9.89543 20 11V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V11Z'
    />
  </svg>
);
