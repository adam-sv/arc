import { cn } from '@adam-sv/arc';
import React from 'react';
import style from './style.module.css';

export const StartIcon = ({ className = '', ...props }) => (
  <svg
    className={cn(style.container, className)}
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-1 -1 55 55"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        fillRule="nonzero"
        d="M21.04 38.68c.71 0 1.47-.24 2.23-.7l13.39-8.03c1.3-.78 2.04-1.91 2.04-3.11s-.74-2.34-2.04-3.12l-13.4-8.03a4.36 4.36 0 00-2.22-.69C19.52 15 18 16.14 18 18.67V35c0 2.54 1.52 3.68 3.04 3.68zm-1.18-20c0-.55.11-1.82 1.18-1.82.37 0 .8.15 1.27.42l13.4 8.04c.72.43 1.13.99 1.13 1.52s-.41 1.08-1.14 1.52l-13.39 8.03c-.46.28-.9.43-1.27.43-1.07 0-1.18-1.27-1.18-1.82V18.67z"
      />
      <circle cx="26.5" cy="26.5" r="26.5" />
    </g>
  </svg>
);
