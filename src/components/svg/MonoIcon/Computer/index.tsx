import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.css';

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('MonoIcon-Computer', className)}
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V16C22 17.1046 21.1046 18 20 18H13V20H16C16.5523 20 17 20.4477 17 21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21C7 20.4477 7.44772 20 8 20H11V18H4C2.89543 18 2 17.1046 2 16V5ZM20 16V5H4V16H20Z"
    />
  </svg>
);
