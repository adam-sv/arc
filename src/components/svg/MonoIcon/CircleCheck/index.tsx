import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.css';

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('MonoIcon-CircleCheck', className)}
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM16.6644 8.75259C17.0771 9.11951 17.1143 9.75158 16.7474 10.1644L11.4141 16.1644C11.2243 16.3779 10.9523 16.5 10.6667 16.5C10.381 16.5 10.109 16.3779 9.91926 16.1644L7.25259 13.1644C6.88567 12.7516 6.92285 12.1195 7.33564 11.7526C7.74842 11.3857 8.38049 11.4229 8.74741 11.8356L10.6667 13.9948L15.2526 8.83564C15.6195 8.42285 16.2516 8.38567 16.6644 8.75259Z"
    />
  </svg>
);
