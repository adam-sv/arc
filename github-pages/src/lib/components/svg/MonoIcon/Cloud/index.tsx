import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-Cloud', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M5 10C5 6.68629 7.68629 4 11 4C13.627 4 15.858 5.68745 16.6713 8.03713C19.669 8.37085 22 10.9132 22 14C22 17.3137 19.3137 20 16 20H7C4.23858 20 2 17.7614 2 15C2 12.9436 3.24073 11.1787 5.01385 10.4103C5.00466 10.2746 5 10.1378 5 10ZM11 6C8.79086 6 7 7.79086 7 10C7 10.3029 7.03348 10.5967 7.09656 10.8785C7.21716 11.4173 6.8783 11.9519 6.33958 12.0727C5.00015 12.3732 4 13.571 4 15C4 16.6569 5.34315 18 7 18H16C18.2091 18 20 16.2091 20 14C20 11.7909 18.2091 10 16 10C15.9732 10 15.9465 10.0003 15.9198 10.0008C15.4368 10.0102 15.0161 9.67312 14.9201 9.19971C14.5499 7.37395 12.9343 6 11 6Z'
    />
  </svg>
);
