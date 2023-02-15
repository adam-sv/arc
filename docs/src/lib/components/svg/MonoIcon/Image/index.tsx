import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-Image', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2.99998 5C2.99998 3.89543 3.89541 3 4.99998 3H19C20.1045 3 21 3.89543 21 5V19C21 20.1046 20.1045 21 19 21H4.99998C3.89541 21 2.99998 20.1046 2.99998 19V5ZM19 5H4.99998V19H19V5Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.37528 10.2191C8.7405 9.92696 9.25945 9.92696 9.62467 10.2191L13.9258 13.66L15.2929 12.2929C15.6834 11.9024 16.3166 11.9024 16.7071 12.2929L20.7071 16.2929C21.0976 16.6834 21.0976 17.3166 20.7071 17.7071C20.3166 18.0976 19.6834 18.0976 19.2929 17.7071L16 14.4142L14.7071 15.7071C14.3468 16.0674 13.7732 16.0992 13.3753 15.7809L8.99998 12.2806L4.62467 15.7809C4.19341 16.1259 3.56412 16.056 3.21911 15.6247C2.8741 15.1934 2.94402 14.5641 3.37528 14.2191L8.37528 10.2191Z'
    />
    <path d='M17 8.5C17 9.32843 16.3284 10 15.5 10C14.6715 10 14 9.32843 14 8.5C14 7.67157 14.6715 7 15.5 7C16.3284 7 17 7.67157 17 8.5Z' />
  </svg>
);
