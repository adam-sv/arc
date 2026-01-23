// dependencies
import React, { RefObject, useRef } from 'react';
// internals
import { cn, getSizeClassName } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { ButtonType, IButtonProps, ILinkButtonProps } from './types';
import { Link } from 'react-router';

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

export function Button(
  props: IButtonProps | ILinkButtonProps
): React.JSX.Element {
  const {
    children,
    className,
    componentSize,
    disabled,
    htmlType,
    id,
    onClick,
    overrideDefaultClassName,
    style,
    type,
  } = props;

  // define a local ref, for use if domRef isn't provided
  const localRef = useRef(null);

  // derive props that will go on component
  const componentProps = {
    className: cn(
      !overrideDefaultClassName && 'ArcButton',
      className,
      type && typeClasses[type] && `ArcButton-${typeClasses[type]}`,
      disabled && 'ArcButton-disabled',
      componentSize && getSizeClassName(componentSize)
    ),
    disabled,
    id,
    style,
  };

  const didClick = (
    e: React.MouseEvent<HTMLElement>,
    ref:
      | RefObject<HTMLAnchorElement | null>
      | RefObject<HTMLButtonElement | null>
  ) => {
    if (ref.current) ref.current.blur();
    if (disabled) return;
    if (onClick) onClick(e);
  };

  // if "to" is provided, it's a link button
  const linkButtonProps = props as ILinkButtonProps;
  if (linkButtonProps.to) {
    const { to } = linkButtonProps;
    const ref = linkButtonProps.domRef || localRef;

    if (
      to.startsWith('https://') ||
      to.startsWith('http://') ||
      to.includes('.')
    ) {
      // if to is external, we should use an a tag
      return (
        <a
          href={to}
          onClick={(ev) => {
            didClick(ev, ref);
          }}
          ref={ref}
          {...componentProps}
        >
          {children}
        </a>
      );
    } else {
      // if to is internal, we should use a router link
      return (
        <Link
          to={to}
          onClick={(ev) => {
            didClick(ev, ref);
          }}
          ref={ref}
          {...componentProps}
        >
          {children}
        </Link>
      );
    }
  }

  // if it's not a link button (i.e. if "to is not provided")
  const actionButtonProps = props as IButtonProps;
  const ref = actionButtonProps.domRef || localRef;

  // Not a link, use a button
  return (
    <button
      type={htmlType || 'button'}
      onClick={(ev) => {
        didClick(ev, ref);
      }}
      ref={ref}
      {...componentProps}
    >
      {children}
    </button>
  );
}

export type { ButtonType, IButtonProps };
