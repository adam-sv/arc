// dependencies
import React, { useState } from 'react';
// internals
import { Button, cn, getSizeClassName, InfoIcon } from '@adam-sv/arc';
// styles
import './style.css';
// types
import type { IInputSkeletonProps } from './types';
export type { IInputSkeletonProps };

export function InputSkeleton(props: IInputSkeletonProps): JSX.Element {
  const [focused, setFocused] = useState(false);
  const { label, error, placeholder, value } = props;
  const showLabelFrame = Boolean(label || error);

  return (
    <div
      className={cn(
        !props.overrideDefaultClassName && 'ArcInputSkeleton',
        props.className,
        props.componentSize && getSizeClassName(props.componentSize),
        props.error && 'error',
        focused && 'focused',
      )}
      title={value ? value.toString() : undefined}
      tabIndex={0}
      onDoubleClick={e => props.onDoubleClick && props.onDoubleClick(e)}
      onFocus={e => !props.disallowFocus && setFocused(true)}
      onBlur={e => !props.disallowFocus && setFocused(false)}
      onKeyUp={e => e.keyCode === 32 && props.buttonProps && props.buttonProps.onClick(e)}
      ref={props.domRef}
    >
      {props.buttonProps && <div className="ArcInputSkeleton-controls">
        <Button {...props.buttonProps} />
      </div>}
      <div className="ArcInputSkeleton-content">
        {showLabelFrame && <div className="ArcInputSkeleton-label-row">
          {label && (
            <label className='ArcInputSkeleton-label' htmlFor={props.labelHtmlFor}>
              {label}
            </label>
          )}
          {error && <label className="ArcInputSkeleton-error-label">{error}</label>}
        </div>}
        <div className="ArcInputSkeleton-input-row">
          <InfoIcon>{props.info}</InfoIcon>
          {value && <label className="ArcInputSkeleton-value">{value}</label>}
          {!value && placeholder &&
            <label className="ArcInputSkeleton-placeholder">{placeholder}</label>
          }
        </div>
      </div>
    </div>
  );
}
