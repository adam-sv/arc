import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-LogOut', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2 6C2 4.89543 2.89543 4 4 4L13 4C14.1046 4 15 4.89543 15 6L15 8C15 8.55229 14.5523 9 14 9C13.4477 9 13 8.55228 13 8L13 6L4 6L4 18H13V16C13 15.4477 13.4477 15 14 15C14.5523 15 15 15.4477 15 16V18C15 19.1046 14.1046 20 13 20H4C2.89543 20 2 19.1046 2 18L2 6ZM17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071L18.7071 15.7071C18.3166 16.0976 17.6834 16.0976 17.2929 15.7071C16.9024 15.3166 16.9024 14.6834 17.2929 14.2929L18.5858 13H9C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11L18.5858 11L17.2929 9.70711C16.9024 9.31658 16.9024 8.68342 17.2929 8.29289Z'
    />
  </svg>
);
