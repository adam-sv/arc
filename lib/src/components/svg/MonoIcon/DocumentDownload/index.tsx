import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-DocumentDownload', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4 4C4 2.89543 4.89543 2 6 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM17.5858 8H14V4.41421L17.5858 8ZM12 4V9C12 9.55228 12.4477 10 13 10H18V20H6V4L12 4ZM12 11.5C12.5523 11.5 13 11.9477 13 12.5V15.0858L13.2929 14.7929C13.6834 14.4024 14.3166 14.4024 14.7071 14.7929C15.0976 15.1834 15.0976 15.8166 14.7071 16.2071L12.7071 18.2071C12.3166 18.5976 11.6834 18.5976 11.2929 18.2071L9.29289 16.2071C8.90237 15.8166 8.90237 15.1834 9.29289 14.7929C9.68342 14.4024 10.3166 14.4024 10.7071 14.7929L11 15.0858L11 12.5C11 11.9477 11.4477 11.5 12 11.5Z'
    />
  </svg>
);
