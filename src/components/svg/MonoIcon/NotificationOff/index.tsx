import React from 'react';
import { cn } from '@adam-sv/arc';
import './style.css';

interface IProps {
  className?: string;
}

export default ({ className }: IProps) => (
  <svg
    className={cn('MonoIcon-NotificationOff', className)}
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 10C19 6.77579 16.8202 4.06072 13.8539 3.24812C13.5567 2.51616 12.8386 2 12 2C11.1614 2 10.4433 2.51616 10.1461 3.24812C9.58605 3.40155 9.054 3.62281 8.55937 3.90252L10.051 5.39411C10.6499 5.14035 11.3086 5 12 5C14.7614 5 17 7.23858 17 10V12.3431L19 14.3431V10Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.1753 17.4343L5 14.6972V9.99999C5 8.94987 5.23124 7.95375 5.64557 7.05978L3.29289 4.70711C2.90237 4.31658 2.90237 3.68342 3.29289 3.29289C3.68342 2.90237 4.31658 2.90237 4.70711 3.29289L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L17.5858 19H15.4646C15.2219 20.6961 13.7632 22 12 22C10.2368 22 8.77806 20.6961 8.53544 19H4.01296C3.91555 19.0014 3.81743 18.9885 3.72186 18.9608C3.59602 18.9244 3.48038 18.864 3.38026 18.7849C3.16669 18.616 3.02368 18.3618 3.00268 18.0738C2.9935 17.9509 3.0069 17.8258 3.04421 17.7051C3.07424 17.6076 3.11878 17.5165 3.1753 17.4343ZM5.86851 17H15.5858L7.19575 8.60997C7.0683 9.05126 7 9.51765 7 9.99999V15C7 15.1974 6.94156 15.3904 6.83205 15.5547L5.86851 17ZM10.5854 19C10.7913 19.5826 11.3469 20 12 20C12.6531 20 13.2087 19.5826 13.4146 19H10.5854Z"
    />
  </svg>
);
