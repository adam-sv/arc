import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-OptionsVertical', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z' />
    <path d='M10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6Z' />
    <path d='M10 18C10 19.1046 10.8954 20 12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18Z' />
  </svg>
);
