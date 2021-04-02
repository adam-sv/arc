// Classes we need the shape of
import type { ReactNode } from 'react';

/* app-wide typings */
export type ArcComponentSize = 'default' | 'compact' | 'large';
export type ArcHorizontalPosition = 'center' | 'left' | 'right';
export type ArcVerticalPositon = 'center' | 'top' | 'bottom';
export type Optionalize<T extends K, K> = Omit<T, keyof K>;
declare type _RenderableContent = RenderResults | HTMLElement | string | (() => RenderableContent);
export type RenderableContent = _RenderableContent | RenderableContent[];
export type RenderResults = ReactNode | '' | Element | JSX.Element | null | undefined;

export interface IARCProps {
  className?: string;
  overrideDefaultClassName?: boolean;
  children?: RenderableContent;
}

export interface IBoxSize {
  width: number;
  height: number;
}

export interface ICoords {
  x: number;
  y: number;
}

export interface IBoxDimensions {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
