// dependencies
import React, { useState, useRef, ReactNode } from 'react';
import { NavLink } from 'react-router';
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
  topIconProps?: React.SVGProps<SVGElement>;
}

export interface INavigationItem {
  className?: string;
  icon: ReactNode;
  url: string;
  label: string;
}

export const LeftNavigation = ({
  className,
  items,
  bottomItems,
  topContent,
  isOpenByDefault = false,
  topIconProps = {},
}: ILeftNavigationProps): React.ReactElement<any> => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const didClickToggle = () => {
    setIsOpen(!isOpen);
  };
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomLinksRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn('ArcLeftNavigation', className, isOpen && 'is-open')}
      ref={navRef}
    >
      <div className='ArcLeftNavigation-top'>
        <AdamIcon className='ArcLeftNavigation-adamIcon' {...topIconProps} />
      </div>
      {topContent && (
        <div className='ArcLeftNavigation-topContent'>
          {topContent(isOpen, { setIsOpen })}
        </div>
      )}
      <div className={cn('ArcLeftNavigation-linksContainer')} ref={linksRef}>
        <div className={cn('ArcLeftNavigation-links')}>
          {items.map(ArcNavLink)}
        </div>
      </div>
      <div className='ArcLeftNavigation-bottom' ref={bottomLinksRef}>
        {bottomItems?.map(ArcNavLink)}
      </div>
      <div className='ArcLeftNavigation-toggle' onClick={didClickToggle}></div>
    </div>
  );
};

export const ArcNavLink = ({
  icon,
  url,
  label,
  className,
}: INavigationItem) => (
  // isActive = url matches 'to', isPending = data is loading
  <NavLink
    className={({ isActive, isPending }) =>
      cn(
        'ArcLeftNavigation-link',
        className,
        isPending && 'pending',
        !isPending && isActive && 'active'
      )
    }
    to={url}
    key={label}
    title={label}
  >
    {icon}
    <p className='ArcLeftNavigation-linkText'>{label}</p>
  </NavLink>
);

export default LeftNavigation;
