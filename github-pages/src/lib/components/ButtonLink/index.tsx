// dependencies
import React, { useRef } from 'react';
// internals
import { cn, getSizeClassName } from '@adam-sv/arc';
// styles are from Button/style.scss directly
// types
import type { IButtonLinkProps } from './types';
import { Link } from 'react-router-dom';

const typeClasses = {
  default: 'default',
  primary: 'default',
  secondary: 'secondary',
  tertiary: 'tertiary',
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'error',
  error: 'error',
  custom: 'custom',
};

export function ButtonLink({
  arcRef,
  children,
  className,
  componentSize,
  disabled,
  id,
  onClick,
  overrideDefaultClassName,
  style,
  type,
  to,
}: IButtonLinkProps): JSX.Element {
  let buttonRef = useRef<HTMLAnchorElement | null>(null);
  if (arcRef) buttonRef = arcRef;

  function clickedButton(e: React.MouseEvent<HTMLElement>) {
    if (buttonRef.current) {
      (buttonRef.current! as HTMLElement).blur();
    }

    if (disabled) {
      return;
    }

    if (onClick) onClick(e);
  }

  const props = {
    className: cn(
      !overrideDefaultClassName && 'ArcButton',
      className,
      type && typeClasses[type] && `ArcButton-${typeClasses[type]}`,
      disabled && 'ArcButton-disabled',
      componentSize && getSizeClassName(componentSize)
    ),
    disabled,
    id,
    onClick: clickedButton,
    ref: buttonRef,
    style,
  };

  // if to is specified, we should use a link
  if (
    to.startsWith('https://') ||
    to.startsWith('http://') ||
    to.includes('.')
  ) {
    // if to is external, we should use an a tag
    return (
      <a href={to} {...props}>
        {children}
      </a>
    );
  } else {
    // if to is internal, we should use a router link
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }
}

export type { IButtonLinkProps };
