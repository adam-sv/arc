import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-ClipboardList', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11 16.5C11 15.9477 11.4477 15.5 12 15.5H15C15.5523 15.5 16 15.9477 16 16.5C16 17.0523 15.5523 17.5 15 17.5H12C11.4477 17.5 11 17.0523 11 16.5Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11 13.5C11 12.9477 11.4477 12.5 12 12.5H15C15.5523 12.5 16 12.9477 16 13.5C16 14.0523 15.5523 14.5 15 14.5H12C11.4477 14.5 11 14.0523 11 13.5Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11 10.5C11 9.94772 11.4477 9.5 12 9.5H15C15.5523 9.5 16 9.94772 16 10.5C16 11.0523 15.5523 11.5 15 11.5H12C11.4477 11.5 11 11.0523 11 10.5Z'
    />
    <path d='M10 10.5C10 11.0523 9.55228 11.5 9 11.5C8.44772 11.5 8 11.0523 8 10.5C8 9.94772 8.44772 9.5 9 9.5C9.55228 9.5 10 9.94772 10 10.5Z' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4 5C4 3.89543 4.89543 3 6 3H9C9.55228 3 10 3.44772 10 4C10 4.55228 9.55228 5 9 5H6V20H18V5H15C14.4477 5 14 4.55228 14 4C14 3.44772 14.4477 3 15 3H18C19.1046 3 20 3.89543 20 5V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V5Z'
    />
    <path d='M10 13.5C10 14.0523 9.55228 14.5 9 14.5C8.44772 14.5 8 14.0523 8 13.5C8 12.9477 8.44772 12.5 9 12.5C9.55228 12.5 10 12.9477 10 13.5Z' />
    <path d='M10 16.5C10 17.0523 9.55228 17.5 9 17.5C8.44772 17.5 8 17.0523 8 16.5C8 15.9477 8.44772 15.5 9 15.5C9.55228 15.5 10 15.9477 10 16.5Z' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V6C16 6.55228 15.5523 7 15 7H9C8.44772 7 8 6.55228 8 6V3ZM10 4V5H14V4H10Z'
    />
  </svg>
);
