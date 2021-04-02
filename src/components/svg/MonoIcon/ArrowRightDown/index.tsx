import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.css';

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('MonoIcon-ArrowRightDown', className)}
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L16 14.5858L16 9C16 8.44772 16.4477 8 17 8C17.5523 8 18 8.44772 18 9L18 17C18 17.5523 17.5523 18 17 18H9C8.44771 18 8 17.5523 8 17C8 16.4477 8.44771 16 9 16H14.5858L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289Z"
    />
  </svg>
);
