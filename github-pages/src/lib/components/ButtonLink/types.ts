import type {
  IARCProps,
  ArcComponentSize,
  ButtonType,
  RenderableContent,
} from '@adam-sv/arc';
import React from 'react';

export interface IButtonLinkProps extends IARCProps {
  arcRef?: React.MutableRefObject<HTMLAnchorElement | null>;
  children?: RenderableContent;
  onClick?: (e: React.FormEvent) => unknown;
  disabled?: boolean;
  type?: ButtonType;
  componentSize?: ArcComponentSize;
  to: string;
}
