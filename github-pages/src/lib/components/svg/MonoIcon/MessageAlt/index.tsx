import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-MessageAlt', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V17C22 18.1046 21.1046 19 20 19H15.4142L12.7071 21.7071C12.3166 22.0976 11.6834 22.0976 11.2929 21.7071L8.58579 19H4C2.89543 19 2 18.1046 2 17V6ZM20 6H4V17H9C9.26522 17 9.51957 17.1054 9.70711 17.2929L12 19.5858L14.2929 17.2929C14.4804 17.1054 14.7348 17 15 17H20V6Z'
    />
    <path d='M13.5 11.5C13.5 12.3284 12.8284 13 12 13C11.1716 13 10.5 12.3284 10.5 11.5C10.5 10.6716 11.1716 10 12 10C12.8284 10 13.5 10.6716 13.5 11.5Z' />
    <path d='M17.5 11.5C17.5 12.3284 16.8284 13 16 13C15.1716 13 14.5 12.3284 14.5 11.5C14.5 10.6716 15.1716 10 16 10C16.8284 10 17.5 10.6716 17.5 11.5Z' />
    <path d='M9.5 11.5C9.5 12.3284 8.82843 13 8 13C7.17157 13 6.5 12.3284 6.5 11.5C6.5 10.6716 7.17157 10 8 10C8.82843 10 9.5 10.6716 9.5 11.5Z' />
  </svg>
);
