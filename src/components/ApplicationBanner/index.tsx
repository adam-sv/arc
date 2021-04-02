import {
  AirbusLogo,
  cn,
  MenuIcon,
  NotificationIcon,
  RenderableContent,
} from '@adam-sv/arc';
import React from 'react';
import './style.css';

export interface IApplicationBannerProps {
  className?: string;
  children?: RenderableContent;
  logoLink?: string;
  logo?: RenderableContent;
}

export const ApplicationBanner = ({ className, children, logo, logoLink }: IApplicationBannerProps) => (
  <div className={cn('ApplicationBanner', className)}>
    {logoLink && (
      <a className="ApplicationBanner-logoLink" href={logoLink}>
        {logo || <AirbusLogo className="ApplicationBanner-logo" />}
      </a>
    )}
    {!logoLink && (logo || <AirbusLogo className="ApplicationBanner-logo" />)}

    {children}
    {!children && (
      <>
        <div className="ApplicationBanner-profile">
          <div className="ApplicationBanner-profileImage" />
          <div className="ApplicationBanner-profileName">John Doe</div>
        </div>
        <NotificationIcon className="ApplicationBanner-notification" />
        <MenuIcon className="ApplicationBanner-menu" />
      </>
    )}
  </div>
);
