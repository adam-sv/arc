import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-FolderCheck', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2 6C2 4.89543 2.89543 4 4 4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289L11.4142 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM8.58579 6L4 6V18H20V8H11C10.7348 8 10.4804 7.89464 10.2929 7.70711L8.58579 6ZM15.7071 10.2929C16.0976 10.6834 16.0976 11.3166 15.7071 11.7071L11.7071 15.7071C11.5196 15.8946 11.2652 16 11 16C10.7348 16 10.4804 15.8946 10.2929 15.7071L8.29289 13.7071C7.90237 13.3166 7.90237 12.6834 8.29289 12.2929C8.68342 11.9024 9.31658 11.9024 9.70711 12.2929L11 13.5858L14.2929 10.2929C14.6834 9.90237 15.3166 9.90237 15.7071 10.2929Z'
    />
  </svg>
);
