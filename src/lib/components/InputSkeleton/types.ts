import type { RefObject } from 'react';
import type {
  ArcComponentSize,
  IARCProps,
  IButtonProps,
  RenderableContent,
} from '@adam-sv/arc';

import { FloatingPanelAnchorDirection } from '@adam-sv/arc';

export interface IInputSkeletonProps extends IARCProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  labelHtmlFor?: string; // if you want the Label to have `htmlFor` set to an ID, pass it here
  buttonProps?: IButtonProps;
  info?: RenderableContent;
  infoAnchorPosition?: FloatingPanelAnchorDirection;
  componentSize?: ArcComponentSize;
  skeletonRef?: RefObject<HTMLDivElement | null>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
  onFocusSkeleton?: React.FocusEventHandler<HTMLDivElement>;
  onBlurSkeleton?: React.FocusEventHandler<HTMLDivElement>;
  type?: string;
  name?: string;
}

export interface IInputPropsBase<T = HTMLElement> extends IInputSkeletonProps {
  autocomplete?: 'on' | 'off';
  autofocus?: boolean;
  onChange?: (value: string | number, e: React.ChangeEvent<T>) => unknown;
  onKeyUp?: React.KeyboardEventHandler<T>;
  onKeyDown?: React.KeyboardEventHandler<T>;
  onKeyPress?: React.KeyboardEventHandler<T>;
  onSubmit?: React.FormEventHandler<T>;
  onFocus?: (ev: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (ev: React.FocusEvent<HTMLElement>) => void;
  value?: InputValue;
  min?: InputValue;
  max?: InputValue;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  type?: string;
}

export type InputValue = number | string;
