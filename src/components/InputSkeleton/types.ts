import type { RefObject, SyntheticEvent } from 'react';
import type { ArcComponentSize, IARCProps, IButtonProps, RenderableContent } from '@adam-sv/arc';

export interface IInputSkeletonProps extends IARCProps {
  label?: string;
  error?: string;
  value?: string | number | RenderableContent;
  placeholder?: string | number;
  labelHtmlFor?: string; // if you want the Label to have `htmlFor` set to an ID, pass it here
  buttonProps?: IButtonProps;
  info?: RenderableContent;
  isModalEntryPoint?: boolean;
  onDoubleClick?: (e: SyntheticEvent) => void;
  componentSize?: ArcComponentSize;
  disallowFocus?: boolean;
  domRef?: RefObject<HTMLDivElement>;
}
