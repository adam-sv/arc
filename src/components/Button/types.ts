import type { IARCProps, ArcComponentSize } from '@adam-sv/arc';

export type ButtonType = 'default' | 'success' | 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger' | 'error';

export interface IButtonProps extends IARCProps {
  children?: React.ReactNode;
  onClick: (e: any) => void;
  disabled?: boolean;
  text?: string,
  type?: ButtonType,
  componentSize?: ArcComponentSize;
  htmlType?: 'submit' | 'button' | 'reset';
}
