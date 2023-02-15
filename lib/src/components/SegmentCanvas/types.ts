import type { IARCProps, RenderableContent } from '@adam-sv/arc';
import React from 'react';
import type { ChartComponentRenderer } from '@adam-sv/arc';
export interface ISegmentCanvasProps extends IARCProps {
  drawingParams: ISegmentCanvasDrawingParams;
  minHeight?: number; // the height in pixels to enforce
  minZoom?: number; // default: 0.5
  maxZoom?: number; // default: 10
  backgroundRenderer?: ChartComponentRenderer;
  foregroundRenderer?: ChartComponentRenderer;
  layers: ISegmentCanvasSegmentLayer[];
}

export interface ISegmentCanvasSegmentLayer {
  segments: ISegment[];
  backgroundRenderer?: ChartComponentRenderer;
  foregroundRenderer?: ChartComponentRenderer;
  groupStyle?: React.CSSProperties;
}

export interface ISegmentCanvasDrawingParams {
  canvasHeight: number;
  canvasWidth: number;
  yOriginDirection?: 'top' | 'bottom'; // defaults to top
  yIsCenterline?: boolean; // defaults to false, when true y-axis is at (X = canvasWidth / 2)
}

export type ISegment<T = any> = {
  className?: string;
  contentGenerator?: (segment: ISegment<T>) => RenderableContent;
  id: string;
  data?: T;
  onClick?: (segment: ISegment<T>, event?: React.MouseEvent) => unknown;
  onMouseOver?: (segment: ISegment<T>, event?: React.MouseEvent) => unknown;
  onMouseOut?: (segment: ISegment<T>, event?: React.MouseEvent) => unknown;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  originOffset?: {
    x?: number; // defaults to 0
    y?: number; // defaults to 0
  };
};
