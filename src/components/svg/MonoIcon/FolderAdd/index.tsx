import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.css';

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('MonoIcon-FolderAdd', className)}
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 6C2 4.89543 2.89543 4 4 4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289L11.4142 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM8.58579 6L4 6V18H20V8H11C10.7348 8 10.4804 7.89464 10.2929 7.70711L8.58579 6ZM12 10C12.5523 10 13 10.4477 13 11V12H14C14.5523 12 15 12.4477 15 13C15 13.5523 14.5523 14 14 14H13V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V14H10C9.44772 14 9 13.5523 9 13C9 12.4477 9.44772 12 10 12H11V11C11 10.4477 11.4477 10 12 10Z"
    />
  </svg>
);
