// dependencies
import React, { useState } from 'react';
// internals
import { Button, cn, getSizeClassName, InfoIcon } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { IInputSkeletonProps, IInputPropsBase } from './types';

export function InputSkeleton<T>({
  buttonProps,
  children,
  className,
  componentSize,
  disabled,
  domRef,
  error,
  id,
  info,
  label,
  labelHtmlFor,
  onBlurSkeleton,
  onDoubleClick,
  onFocusSkeleton,
  overrideDefaultClassName,
  style,
}: IInputSkeletonProps): JSX.Element {
  const showLabelFrame = Boolean(label || error);
  return (
    <div
      className={cn(
        !overrideDefaultClassName && 'ArcInput',
        className,
        componentSize && getSizeClassName(componentSize),
        error && 'error',
        disabled && 'disabled',
        !label && 'no-label'
      )}
      id={id}
      onFocus={onFocusSkeleton}
      onBlur={onBlurSkeleton}
      onDoubleClick={(e) => onDoubleClick && onDoubleClick(e)}
      onKeyUp={(e) =>
        e.keyCode === 32 && buttonProps?.onClick && buttonProps.onClick(e)
      }
      ref={domRef}
      style={style}
    >
      {buttonProps && (
        <div className='ArcInput-controls'>
          <Button {...buttonProps} />
        </div>
      )}
      <div className='ArcInput-row-container'>
        {showLabelFrame && (
          <div className='ArcInput-label-row'>
            {label && (
              <label
                className={cn('ArcInput-label', labelHtmlFor && 'withAction')}
                htmlFor={labelHtmlFor}
              >
                {label}
              </label>
            )}
            {error && <label className='ArcInput-error-label'>{error}</label>}
          </div>
        )}
        <div className={cn('ArcInput-input-row', Boolean(info) && 'withInfo')}>
          {children}
          <InfoIcon>{info}</InfoIcon>
        </div>
      </div>
    </div>
  );
}

export const extractSkeletonProps = <T,>(
  inputProps: IInputPropsBase<T>
): IInputSkeletonProps => ({
  label: inputProps.label,
  error: inputProps.error,
  disabled: inputProps.disabled,
  labelHtmlFor: inputProps.labelHtmlFor,
  buttonProps: inputProps.buttonProps,
  info: inputProps.info,
  componentSize: inputProps.componentSize,
  className: inputProps.className,
  id: inputProps.id,
  style: inputProps.style,
});
