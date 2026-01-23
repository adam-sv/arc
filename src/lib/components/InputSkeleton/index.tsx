// internals
import { Button, cn, getSizeClassName, InfoIcon } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { IInputSkeletonProps, IInputPropsBase } from './types';
import type { JSX } from 'react';

export function InputSkeleton(props: IInputSkeletonProps): JSX.Element {
  const {
    buttonProps,
    children,
    className,
    componentSize,
    disabled,
    skeletonRef,
    error,
    id,
    info,
    infoAnchorPosition,
    label,
    labelHtmlFor,
    onBlurSkeleton,
    onDoubleClick,
    onFocusSkeleton,
    overrideDefaultClassName,
    style,
    type,
  } = props;

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
      ref={skeletonRef}
      style={style}
    >
      {buttonProps && (
        <div className='ArcInput-controls'>
          <Button {...buttonProps} />
        </div>
      )}
      <div className='ArcInput-row-container'>
        {/* moved the label up here because otherwise the label inside was not responding to click events */}
        {showLabelFrame && (
          <label className='ArcInput-label-row' htmlFor={labelHtmlFor}>
            {label && (
              <label
                className={cn('ArcInput-label', labelHtmlFor && 'withAction')}
                htmlFor={labelHtmlFor}
              >
                {label}
              </label>
            )}
            {error && <label className='ArcInput-error-label'>{error}</label>}
          </label>
        )}
        <div className={cn('ArcInput-input-row', Boolean(info) && 'withInfo')}>
          {children}
          <InfoIcon
            anchor={infoAnchorPosition}
            className={cn(
              ['date', 'time', 'datetime-local', 'month', 'week'].includes(
                type || ''
              ) && 'date'
            )}
          >
            {info}
          </InfoIcon>
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
  skeletonRef: inputProps.skeletonRef,
  type: inputProps.type,
});
