import React from 'react';
import { cn, ICCSizing } from '@adam-sv/arc';
import type { ISegmentCanvasDrawingParams, ISegment } from '@adam-sv/arc';

export interface ISegmentProps {
  drawingParams: ISegmentCanvasDrawingParams;
  chartContainerSizing: ICCSizing;
  segment: ISegment;
}

export const Segment = (props: ISegmentProps): JSX.Element => {
  const { segment, drawingParams, chartContainerSizing } = props;
  const fractionalPos = getSegmentFractionalPosition(segment, drawingParams);

  const x = fractionalPos.leftFrac * chartContainerSizing.chartSize.width;
  const y = fractionalPos.topFrac * chartContainerSizing.chartSize.height;
  const height =
    (1 - fractionalPos.topFrac - fractionalPos.bottomFrac) *
    chartContainerSizing.chartSize.height;
  const width =
    (1 - fractionalPos.rightFrac - fractionalPos.leftFrac) *
    chartContainerSizing.chartSize.width;
  const pos = { x, y, height, width };

  return (
    <g
      className={cn('ArcSegmentCanvas-Segment', segment.className)}
      onClick={(ev) => segment.onClick && segment.onClick(segment, ev)}
      onMouseOver={(ev) =>
        segment.onMouseOver && segment.onMouseOver(segment, ev)
      }
      onMouseLeave={(ev) =>
        segment.onMouseOut && segment.onMouseOut(segment, ev)
      }
    >
      <rect {...pos}></rect>
      <foreignObject {...pos}>
        <div
          // xmlns='http://www.w3.org/1999/xhtml'
          className={cn('ArcSegmentCanvas-Segment-htmlContent')}
        >
          {getContent(segment)}
        </div>
      </foreignObject>
    </g>
  );
};

const getContent = (segment: ISegment<{ title?: string }>) => {
  if (segment.contentGenerator) return segment.contentGenerator(segment);
  if (segment.data?.title) return segment.data.title;
  return '';
};

const getSegmentFractionalPosition = (
  segment: ISegment,
  drawingParams: ISegmentCanvasDrawingParams
): {
  topFrac: number;
  bottomFrac: number;
  leftFrac: number;
  rightFrac: number;
} => {
  const { canvasHeight, canvasWidth, yIsCenterline } = drawingParams;

  const { originOffset } = segment;
  const yOriginDirection = drawingParams.yOriginDirection || 'top';
  const xOriginOffset = originOffset?.x || 0;
  const yOriginOffset = originOffset?.y || 0;

  // calculate top and bottom
  /* eslint-disable @typescript-eslint/restrict-plus-operands */
  const y1 =
    (yIsCenterline ? segment.y1 + canvasWidth / 2 : segment.y1) + yOriginOffset;
  const y2 =
    (yIsCenterline ? segment.y2 + canvasWidth / 2 : segment.y2) + yOriginOffset;
  const y1Frac = y1 / canvasHeight;
  const y2Frac = 1 - y2 / canvasHeight;
  const topFrac = yOriginDirection === 'top' ? y1Frac : y2Frac;
  const bottomFrac = yOriginDirection === 'top' ? y2Frac : y1Frac;

  // calculate left and right
  const x1 = segment.x1 + xOriginOffset;
  const x2 = segment.x2 + xOriginOffset;
  const leftFrac = x1 / canvasWidth;
  const rightFrac = 1 - x2 / canvasWidth;

  return { topFrac, bottomFrac, leftFrac, rightFrac };
};
