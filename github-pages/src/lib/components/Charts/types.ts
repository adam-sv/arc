import type { RenderableContent } from '@adam-sv/arc';
import type { ICCSizing } from './ChartContainer/types';

export type CategoryDomain = string[];
export type DatumId = string | number;
export type D3Range = [number, number];
export type ChartComponentRenderer = (
  coordinateSpace: DOMRect,
  computed: ICCSizing,
  mousePos?: MousePos
) => RenderableContent;

export interface ICategoryTick {
  startPos: number;
  endPos: number;
  label: string;
}

export type MousePos = {
  chartRelativeX: number;
  chartRelativeY: number;
  absoluteX: number;
  absoluteY: number;
};

export interface IDependentValue {
  value: number | string;
  top: number;
  left: number;
  index?: number;
  parentBoundaries: { top: number; left: number };
}
