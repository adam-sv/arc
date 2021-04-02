import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.css';

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('MonoIcon-List', className)}
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 7C4 6.44772 4.44772 6 5 6H6C6.55228 6 7 6.44772 7 7C7 7.55228 6.55228 8 6 8H5C4.44772 8 4 7.55228 4 7ZM9 7C9 6.44772 9.44772 6 10 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H10C9.44772 8 9 7.55228 9 7ZM4 12C4 11.4477 4.44772 11 5 11H6C6.55228 11 7 11.4477 7 12C7 12.5523 6.55228 13 6 13H5C4.44772 13 4 12.5523 4 12ZM9 12C9 11.4477 9.44772 11 10 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H10C9.44772 13 9 12.5523 9 12ZM4 17C4 16.4477 4.44772 16 5 16H6C6.55228 16 7 16.4477 7 17C7 17.5523 6.55228 18 6 18H5C4.44772 18 4 17.5523 4 17ZM9 17C9 16.4477 9.44772 16 10 16H19C19.5523 16 20 16.4477 20 17C20 17.5523 19.5523 18 19 18H10C9.44772 18 9 17.5523 9 17Z"
    />
  </svg>
);