import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.css';

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('MonoIcon-DocumentRemove', className)}
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 4C4 2.89543 4.89543 2 6 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM17.5858 8H14V4.41421L17.5858 8ZM12 4V9C12 9.55228 12.4477 10 13 10H18V20H6V4L12 4ZM9 15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16H10C9.44772 16 9 15.5523 9 15Z"
    />
  </svg>
);
