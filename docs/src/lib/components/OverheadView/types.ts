import type { IARCProps, RenderableContent } from '@adam-sv/arc';

export interface IOverheadViewProps<T = any> extends IARCProps {
  // what to draw
  segments: ISegmentInput<T>[];
  backgroundImage?: IOverheadViewBackground;
  suppressBackground?: boolean;
  // how to draw it
  coordinates: IOverheadViewCoordinates;
  minHeight?: number; // the height in pixels to enforce
  // extra config
  maskId?: string;
  minZoom?: number; // default: 0.5
  maxZoom?: number; // default: 10
}

export type IOverheadViewDirection = 'left' | 'up' | 'right' | 'down'; // default is 'left'
export interface IOverheadViewCoordinates {
  actualLengthDimension: number; // real world length dimension
  actualWidthDimension: number; // real world width dimension
  xOriginOffset?: number; // how far the origin is from the edge of the image
  direction?: IOverheadViewDirection; // default is 'left';
}

export interface IOverheadViewBackground {
  imgAsSrc?: string;
  imgAsEle?: Element;
  maskAsPath?: string;
  maskAsEle?: SVGPathElement | RenderableContent; // warning: you need to handle invertX behavior outside the component in this paradigm
  maskHeight: number;
  maskWidth: number;
}

// if you could extend types with generic T passed in, we would inherit some stuff
// oh well, it's just a tad verbose. ID, data, and contentGenerator are shared keys but required T
export type ISegmentInput<T = any> =
  | ISegmentChiral<T>
  | ISegmentFreeByCoords<T>
  | ISegmentFreeByPosSize<T>;

// these draw from the "midlineOffset" to the edge of the image
export interface ISegmentChiral<T = any> {
  className?: string;
  contentGenerator?: (segment: ISegmentInput<T>) => RenderableContent;
  id: string;
  data?: T;
  isLhs: boolean; // "flips" our vertical numbers about the center
  length: number; // the "length" of the segment (i.e. change in x value from start to finish)
  x: number; // how far from the right the segment starts
  midlineOffset: number; // how far away from the midline the segment starts
  // isFullWidth?: boolean; // in the code, it looks for undefined midlineOffset...
}

// these draw freely
export type ISegmentFree<T = any> =
  | ISegmentFreeByCoords<T>
  | ISegmentFreeByPosSize<T>;

export interface ISegmentFreeByCoords<T = any> {
  className?: string;
  contentGenerator?: (segment: ISegmentInput<T>) => RenderableContent;
  id: string;
  data?: T;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  yIsCenterline?: boolean;
}

export interface ISegmentFreeByPosSize<T = any> {
  className?: string;
  contentGenerator?: (segment: ISegmentInput<T>) => RenderableContent;
  id: string;
  data?: T;
  x1: number;
  y1: number;
  width: number;
  length: number;
}

// A PercentNumber should be between 0 & 1, although I suppose if you specify outside the range it could be negative or over 1
export type PercentNumber = number;
export interface ISegmentComputedPos {
  segmentId: string;
  rightFrac: PercentNumber; // how far from the right is the right edge, as a fraction of total length
  leftFrac: PercentNumber; // how far from the left is the left edge, as a fraction of total length
  topFrac: PercentNumber; // how far from the top is the top edge, as a fraction of total height
  bottomFrac: PercentNumber; // how far from the bottom is the bottom edge, as a fraction of total height
}
