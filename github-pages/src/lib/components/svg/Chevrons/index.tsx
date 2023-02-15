// dependencies
import React from 'react';
// internals
import { cn } from '@adam-sv/arc';
// style
import './style.scss';
/* eslint-disable max-len */

interface IChevronProps {
  className?: string;
}
export const ChevronLeft = ({ className }: IChevronProps) => (
  <svg
    className={cn(
      'ARC-SVG-icon',
      'ARC-SVG-icon-Chevron',
      'ARC-SVG-icon-Chevron-left',
      className
    )}
    viewBox='0 0 24 24'
    height='24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      xmlns='http://www.w3.org/2000/svg'
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14.7071 5.29289C15.0976 5.68342 15.0976 6.31658 14.7071 6.70711L9.41421 12L14.7071 17.2929C15.0976 17.6834 15.0976 18.3166 14.7071 18.7071C14.3166 19.0976 13.6834 19.0976 13.2929 18.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L13.2929 5.29289C13.6834 4.90237 14.3166 4.90237 14.7071 5.29289Z'
    />
  </svg>
);

export const ChevronRight = ({ className }: IChevronProps) => (
  <svg
    className={cn(
      'ARC-SVG-icon',
      'ARC-SVG-icon-Chevron',
      'ARC-SVG-icon-Chevron-right',
      className
    )}
    viewBox='0 0 24 24'
    height='24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      xmlns='http://www.w3.org/2000/svg'
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z'
    />
  </svg>
);

export const ChevronUp = ({ className }: IChevronProps) => (
  <svg
    className={cn(
      'ARC-SVG-icon',
      'ARC-SVG-icon-Chevron',
      'ARC-SVG-icon-Chevron-up',
      className
    )}
    viewBox='0 0 24 24'
    height='24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      xmlns='http://www.w3.org/2000/svg'
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289L18.7071 13.2929C19.0976 13.6834 19.0976 14.3166 18.7071 14.7071C18.3166 15.0976 17.6834 15.0976 17.2929 14.7071L12 9.41421L6.70711 14.7071C6.31658 15.0976 5.68342 15.0976 5.29289 14.7071C4.90237 14.3166 4.90237 13.6834 5.29289 13.2929L11.2929 7.29289Z'
    />
  </svg>
);

export const ChevronDown = ({ className }: IChevronProps) => (
  <svg
    className={cn(
      'ARC-SVG-icon',
      'ARC-SVG-icon-Chevron',
      'ARC-SVG-icon-Chevron-down',
      className
    )}
    viewBox='0 0 24 24'
    height='24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      xmlns='http://www.w3.org/2000/svg'
      fillRule='evenodd'
      clipRule='evenodd'
      d='M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z'
    />
  </svg>
);
