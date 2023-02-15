// dependencies
import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import type { Location } from 'history';
// internals
import { AdamIcon, cn } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { RenderableContent } from '@adam-sv/arc';

export type ITopContentGenerator = (
  isOpen: boolean,
  hooks?: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }
) => RenderableContent;

export interface ILeftNavigationProps {
  className?: string;
  items: INavigationItem[];
  bottomItems?: INavigationItem[];
  topContent?: ITopContentGenerator;
  isOpenByDefault?: boolean;
}

export interface INavigationItem {
  className?: string;
  Icon: React.ElementType<any>;
  url: string;
  label: string;
}

export const LeftNavigation = ({
  className,
  items,
  bottomItems,
  topContent,
  isOpenByDefault = false,
}: ILeftNavigationProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const didClickToggle = () => setIsOpen(!isOpen);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomLinksRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn('ArcLeftNavigation', className, isOpen && 'is-open')}
      ref={navRef}
    >
      <div className='ArcLeftNavigation-top'>
        <AdamIcon className='ArcLeftNavigation-adamIcon' />
      </div>
      {topContent && (
        <div className='ArcLeftNavigation-topContent'>
          {topContent(isOpen, { setIsOpen })}
        </div>
      )}
      <div className={cn('ArcLeftNavigation-links')} ref={linksRef}>
        {items.map(ArcNavLink)}
      </div>
      <div className='ArcLeftNavigation-bottom' ref={bottomLinksRef}>
        {bottomItems?.map(ArcNavLink)}
      </div>
      <div className='ArcLeftNavigation-toggle' onClick={didClickToggle}></div>
    </div>
  );
};

export const ArcNavLink = ({
  Icon,
  url,
  label,
  className,
}: INavigationItem) => (
  <NavLink
    className={cn('ArcLeftNavigation-link', className)}
    activeClassName='is-selected'
    to={(location: Location) => ({ pathname: url, search: location.search })}
    key={label}
    title={label}
  >
    <Icon className='ArcLeftNavigation-linkIcon' />
    <p className='ArcLeftNavigation-linkText'>{label}</p>
  </NavLink>
);

export default LeftNavigation;
