// dependencies
import React, { useRef } from 'react';
// internals
import { cn, getSizeClassName } from '@adam-sv/arc';
// styles
import "./style.css";
// types
import type { ButtonType, IButtonProps } from './types';

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
};

function generateClassName(props: IButtonProps): string {
  return cn(
    !props.overrideDefaultClassName && 'ArcButton',
    props.className,
    props.type && typeClasses[props.type] && `ArcButton-${typeClasses[props.type]}`,
    props.disabled && 'ArcButton--disabled',
    props.componentSize && getSizeClassName(props.componentSize),
  );
}

export function Button(props: IButtonProps) {
  const buttonRef = useRef(null);

  function clickedButton(e) {
    if (buttonRef.current) {
      (buttonRef.current! as HTMLButtonElement).blur();
    }

    if (props.disabled) {
      // clearly we do nothing
      return;
    }

    props.onClick(e);
  }

  return (
    <button
      ref={buttonRef}
      className={generateClassName(props)}
      onClick={clickedButton}
      type={props.htmlType ? props.htmlType : 'button'}
      disabled={props.disabled}
    >
      {props.text || props.children}
    </button>
  );
}

export type {
  ButtonType,
  IButtonProps,
}
