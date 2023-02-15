import type { RefObject } from 'react';
import type {
  ArcComponentSize,
  IARCProps,
  IButtonProps,
  RenderableContent,
} from '@adam-sv/arc';
import React from 'react';

export interface IInputSkeletonProps extends IARCProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  labelHtmlFor?: string; // if you want the Label to have `htmlFor` set to an ID, pass it here
  buttonProps?: IButtonProps;
  info?: RenderableContent;
  componentSize?: ArcComponentSize;
  domRef?: RefObject<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  onFocusSkeleton?: React.FocusEventHandler<HTMLDivElement>;
  onBlurSkeleton?: React.FocusEventHandler<HTMLDivElement>;
}

export interface IInputPropsBase<T = HTMLElement> extends IInputSkeletonProps {
  onChange?: (value: string | number, e: React.ChangeEvent<T>) => unknown;
  onKeyUp?: React.KeyboardEventHandler<T>;
  onKeyDown?: React.KeyboardEventHandler<T>;
  onKeyPress?: React.KeyboardEventHandler<T>;
  onSubmit?: React.FormEventHandler<T>;
  onFocus?: (ev: React.FocusEvent<HTMLElement, Element>) => void;
  onBlur?: (ev: React.FocusEvent<HTMLElement, Element>) => void;
  value?: InputValue;
  min?: InputValue;
  max?: InputValue;
  placeholder?: string;
}

export type InputValue = number | string;
