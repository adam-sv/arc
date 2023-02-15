import type { IInputPropsBase } from '@adam-sv/arc';

export type TemporalInputType =
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week';

export interface ITemporalInputProps extends IInputPropsBase<HTMLInputElement> {
  type?: TemporalInputType;
  min?: string;
  max?: string;
  value?: string; // date inputs value is always a string
}
