import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-Archive', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V7C22 7.74708 21.5904 8.39848 20.9835 8.74188C20.9944 8.82638 21 8.91253 21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9C3 8.91253 3.00561 8.82638 3.0165 8.74188C2.40961 8.39848 2 7.74707 2 7V5ZM20 7V5H4V7H20ZM5 9V19H19V9H5ZM8 12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H9C8.44772 13 8 12.5523 8 12Z'
    />
  </svg>
);
