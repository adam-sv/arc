import type {
  IARCProps,
  ArcComponentSize,
  RenderableContent,
} from '@adam-sv/arc';
import { RefObject } from 'react';

export type ButtonType =
  | 'default'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'warning'
  | 'danger'
  | 'error'
  | 'custom';

interface IButtonBaseProps extends IARCProps {
  children?: RenderableContent;
  onClick?: (e: React.FormEvent) => unknown;
  disabled?: boolean;
  type?: ButtonType;
  componentSize?: ArcComponentSize;
  htmlType?: 'submit' | 'button' | 'reset';
}

export interface ILinkButtonProps extends IButtonBaseProps {
  to: string;
  domRef?: RefObject<HTMLAnchorElement | null>;
}

export interface IButtonProps extends IButtonBaseProps {
  domRef?: RefObject<HTMLButtonElement | null>;
}
