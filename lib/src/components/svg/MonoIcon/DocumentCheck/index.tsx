import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-DocumentCheck', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4 4C4 2.89543 4.89543 2 6 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM17.5858 8H14V4.41421L17.5858 8ZM12 4V9C12 9.55228 12.4477 10 13 10H18V20H6V4L12 4ZM15.7071 12.2929C16.0976 12.6834 16.0976 13.3166 15.7071 13.7071L11.7071 17.7071C11.3166 18.0976 10.6834 18.0976 10.2929 17.7071L8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929L11 15.5858L14.2929 12.2929C14.6834 11.9024 15.3166 11.9024 15.7071 12.2929Z'
    />
  </svg>
);
