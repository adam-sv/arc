import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-CircleArrowLeft', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.7071 7.29289C12.0976 7.68342 12.0976 8.31658 11.7071 8.70711L9.41421 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H9.41421L11.7071 15.2929C12.0976 15.6834 12.0976 16.3166 11.7071 16.7071C11.3166 17.0976 10.6834 17.0976 10.2929 16.7071L6.29289 12.7071C5.90237 12.3166 5.90237 11.6834 6.29289 11.2929L10.2929 7.29289C10.6834 6.90237 11.3166 6.90237 11.7071 7.29289Z'
    />
  </svg>
);
