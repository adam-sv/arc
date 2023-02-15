import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-Warning', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 14C11.4477 14 11 13.5523 11 13V10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10V13C13 13.5523 12.5523 14 12 14Z'
    />
    <path d='M10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5Z' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M10.2301 3.2156C10.98 1.79093 13.02 1.79092 13.7698 3.2156L22.1135 19.0685C22.8144 20.4003 21.8486 22 20.3436 22H3.65635C2.15133 22 1.18556 20.4003 1.88651 19.0685L10.2301 3.2156ZM20.3436 20L12 4.1471L3.65635 20L20.3436 20Z'
    />
  </svg>
);
