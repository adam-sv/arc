import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';
/* eslint-disable max-len */

export const MenuIcon = ({ className = '', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 270 230'
    className={cn('ARC-SVG-icon-MenuIcon', 'ARC-SVG-icon', className)}
    fillRule='nonzero'
    {...props}
  >
    <path d='M40 0h230v30H40zM110 200h160v30H110zM0 100h270v30H0z' />
  </svg>
);
