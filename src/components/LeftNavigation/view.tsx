// dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';
// internals
import { AdamIcon, cn } from '@adam-sv/arc';
// style
import './style.css';
// types
import type { RenderableContent } from '@adam-sv/arc';
import type { ITopContentGenerator } from '.';

export interface INavigationItem {
  Icon: React.ElementType<any>;
  url: string;
  label: string;
}

interface IViewProps {
  className?: string;
  onToggleClick: (event: React.MouseEvent) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  items: any[];
  bottomItems: any[];
  topContent: ITopContentGenerator;
}

const Link = ({ Icon, url, label }: INavigationItem) => (
  <NavLink
    className="LeftNavigation-link"
    activeClassName="is-selected"
    to={location => ({ pathname: url, search: location.search })}
    key={label}
    title={label}
  >
    <Icon className="LeftNavigation-linkIcon" />
    <p className="LeftNavigation-linkText">{label}</p>
  </NavLink>
);

export const View = ({
  className,
  onToggleClick,
  isOpen = false,
  setIsOpen,
  items = [],
  bottomItems = [],
  topContent,
}: IViewProps) => (
  <div className={cn('LeftNavigation', className, isOpen && 'is-open')}>
    <div className="LeftNavigation-top">
      <AdamIcon className="LeftNavigation-adamIcon" />
    </div>
    <div className="LeftNavigation-topContent">
      {typeof topContent === 'function' && topContent(isOpen, { setIsOpen })}
    </div>
    <div className="LeftNavigation-links">{items.map(Link)}</div>
    <div className="LeftNavigation-bottomLinks">{bottomItems.map(Link)}</div>
    <div className="LeftNavigation-toggle" onClick={onToggleClick}></div>
  </div>
);
