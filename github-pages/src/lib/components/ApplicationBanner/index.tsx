import React from 'react';
import { AdamLogo, cn, MenuIcon, NotificationIcon } from '@adam-sv/arc';
import './style.scss';
import type { IARCProps, RenderableContent } from '@adam-sv/arc';

export interface IApplicationBannerProps extends IARCProps {
  className?: string;
  logoLink?: string;
  logo?: RenderableContent;
}

export const ApplicationBanner = ({
  className,
  children,
  id,
  logo,
  logoLink,
  style,
}: IApplicationBannerProps) => (
  <div className={cn('ArcApplicationBanner', className)} id={id} style={style}>
    {logoLink && (
      <a className='ArcApplicationBanner-logoLink' href={logoLink}>
        {logo || <AdamLogo className='ArcApplicationBanner-logo' />}
      </a>
    )}
    {!logoLink && (logo || <AdamLogo className='ArcApplicationBanner-logo' />)}

    {children}
    {!children && (
      <>
        <div className='ArcApplicationBanner-profile'>
          <div className='ArcApplicationBanner-profileImage' />
          <div className='ArcApplicationBanner-profileName'>John Doe</div>
        </div>
        <NotificationIcon className='ArcApplicationBanner-notification' />
        <MenuIcon className='ArcApplicationBanner-menu' />
      </>
    )}
  </div>
);
