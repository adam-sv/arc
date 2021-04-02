import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.css';

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('MonoIcon-ArrowLeftDown', className)}
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L9.41421 16L15 16C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18L7 18C6.44772 18 6 17.5523 6 17L6 9C6 8.44771 6.44772 8 7 8C7.55228 8 8 8.44771 8 9L8 14.5858L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289Z"
    />
  </svg>
);
