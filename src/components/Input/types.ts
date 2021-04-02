import type { ArcComponentSize, IARCProps } from '@adam-sv/arc';
import type { ChangeEvent } from 'react';

export type InputType = 'text' | 'textarea' | 'password' | 'integer' | 'float';

export interface IInputProps extends IARCProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string | number) => unknown;
  onKeyUp?: (e: any) => void;
  type?: InputType;
  value?: number | string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  error?: string;
  title?: string;
  alwaysShowLabel?: boolean;
  info?: JSX.Element | string;
  componentSize?: ArcComponentSize;
}
