import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-Table', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2 5.5C2 4.39543 2.89543 3.5 4 3.5H20C21.1046 3.5 22 4.39543 22 5.5V18.5C22 19.6046 21.1046 20.5 20 20.5H4C2.89543 20.5 2 19.6046 2 18.5V5.5ZM11 5.5H4V8.5H11V5.5ZM13 5.5V8.5H20V5.5H13ZM20 10.5H13V13.5H20V10.5ZM20 15.5H13V18.5H20V15.5ZM11 18.5V15.5H4V18.5H11ZM4 13.5H11V10.5H4V13.5Z'
    />
  </svg>
);
