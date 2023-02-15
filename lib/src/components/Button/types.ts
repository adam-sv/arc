import type {
  IARCProps,
  ArcComponentSize,
  RenderableContent,
} from '@adam-sv/arc';

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

export interface IButtonProps extends IARCProps {
  children?: RenderableContent;
  onClick?: (e: React.FormEvent) => unknown;
  disabled?: boolean;
  type?: ButtonType;
  componentSize?: ArcComponentSize;
  htmlType?: 'submit' | 'button' | 'reset';
  to?: string;
}
