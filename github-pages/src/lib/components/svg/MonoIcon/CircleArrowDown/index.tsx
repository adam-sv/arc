import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-CircleArrowDown', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 6C12.5523 6 13 6.44772 13 7V14.5858L15.2929 12.2929C15.6834 11.9024 16.3166 11.9024 16.7071 12.2929C17.0976 12.6834 17.0976 13.3166 16.7071 13.7071L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071L7.29289 13.7071C6.90237 13.3166 6.90237 12.6834 7.29289 12.2929C7.68342 11.9024 8.31658 11.9024 8.70711 12.2929L11 14.5858V7C11 6.44772 11.4477 6 12 6Z'
    />
  </svg>
);
