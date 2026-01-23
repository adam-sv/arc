/* Dependencies */
import type { CSSProperties } from 'react';
import { ReactNode } from 'react';

/* ARC specific types */
export type ArcComponentSize = 'default' | 'compact' | 'large';
export type ArcHorizontalPosition = 'center' | 'left' | 'right';
export type ArcVerticalPositon = 'center' | 'top' | 'bottom';

export interface IARCProps {
  className?: string;
  children?: RenderableContent;
  id?: string;
  overrideDefaultClassName?: boolean;
  style?: CSSProperties;
}

export interface IBoxSize {
  width: number;
  height: number;
}

export interface ICoords {
  x: number;
  y: number;
}

export interface IBoxDimensionsByEdge {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/* Other app-wide typings */
export type Optionalize<T extends K, K> = Omit<T, keyof K>;

export type RenderableContent = ReactNode;

export type JSObject = Record<string, any>;
