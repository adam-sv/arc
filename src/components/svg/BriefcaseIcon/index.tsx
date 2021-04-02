import { cn } from '@adam-sv/arc';
import React from 'react';
import style from './style.module.css';

export const BriefcaseIcon = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={cn(style.container, className)}
    preserveAspectRatio="xMinYMid meet"
    viewBox="0 0 20 19"
    {...props}
  >
    <path d="M18 4h-3V2a2 2 0 00-2-2H7a2 2 0 00-2 2v2H2a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zM7 2h6v2H7V2zm11 15H2v-2h16v2zm0-5H2V6h3v2h2V6h6v2h2V6h3v6z" />
  </svg>
);
