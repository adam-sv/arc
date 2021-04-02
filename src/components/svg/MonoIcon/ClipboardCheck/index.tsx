import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.css';

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('MonoIcon-ClipboardCheck', className)}
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3H18C19.1046 3 20 3.89543 20 5V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V5C4 3.89543 4.89543 3 6 3H8ZM8 5H6V20H18V5H16V6C16 6.55228 15.5523 7 15 7H9C8.44772 7 8 6.55228 8 6V5ZM14 4H10V5H14V4ZM15.7071 10.7929C16.0976 11.1834 16.0976 11.8166 15.7071 12.2071L11.7071 16.2071C11.3166 16.5976 10.6834 16.5976 10.2929 16.2071L8.29289 14.2071C7.90237 13.8166 7.90237 13.1834 8.29289 12.7929C8.68342 12.4024 9.31658 12.4024 9.70711 12.7929L11 14.0858L14.2929 10.7929C14.6834 10.4024 15.3166 10.4024 15.7071 10.7929Z"
    />
  </svg>
);
