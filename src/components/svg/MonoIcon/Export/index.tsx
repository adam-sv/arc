import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.css';

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('MonoIcon-Export', className)}
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L16.7071 6.29289C17.0976 6.68342 17.0976 7.31658 16.7071 7.70711C16.3166 8.09763 15.6834 8.09763 15.2929 7.70711L13 5.41421V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V5.41421L8.70711 7.70711C8.31658 8.09763 7.68342 8.09763 7.29289 7.70711C6.90237 7.31658 6.90237 6.68342 7.29289 6.29289L11.2929 2.29289ZM5 17C5.55228 17 6 17.4477 6 18V20H18V18C18 17.4477 18.4477 17 19 17C19.5523 17 20 17.4477 20 18V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V18C4 17.4477 4.44772 17 5 17Z"
    />
  </svg>
);
