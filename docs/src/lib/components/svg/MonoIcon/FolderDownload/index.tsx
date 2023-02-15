import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.scss';
/* eslint-disable max-len */

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('ARC-SVG-icon', 'MonoIcon-FolderDownload', className)}
    width='24'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2 6.00002C2 4.89545 2.89543 4.00002 4 4.00002H9C9.26522 4.00002 9.51957 4.10537 9.70711 4.29291L11.4142 6.00002H20C21.1046 6.00002 22 6.89545 22 8.00002V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6.00002ZM8.58579 6.00002L4 6.00002V18H20V8.00002H11C10.7348 8.00002 10.4804 7.89466 10.2929 7.70712L8.58579 6.00002ZM12 9.50002C12.5523 9.50002 13 9.94773 13 10.5V13.0858L13.2929 12.7929C13.6834 12.4024 14.3166 12.4024 14.7071 12.7929C15.0976 13.1834 15.0976 13.8166 14.7071 14.2071L12.7071 16.2071C12.3166 16.5976 11.6834 16.5976 11.2929 16.2071L9.29289 14.2071C8.90237 13.8166 8.90237 13.1834 9.29289 12.7929C9.68342 12.4024 10.3166 12.4024 10.7071 12.7929L11 13.0858V10.5C11 9.94773 11.4477 9.50002 12 9.50002Z'
    />
  </svg>
);