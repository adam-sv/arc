import type { IInputPropsBase } from '@adam-sv/arc';

export type TextInputType =
  | 'text'
  | 'textarea'
  | 'password'
  | 'integer'
  | 'float';

export interface ITextInputProps extends IInputPropsBase {
  type?: TextInputType;
  value?: string | number;
  min?: number;
  max?: number;
}
