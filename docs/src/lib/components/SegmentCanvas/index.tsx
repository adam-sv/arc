import React from 'react';
import { ChartContainer } from '@adam-sv/arc';
import { cn } from '@adam-sv/arc';
import './style.scss';
import type {
  ICCSizing,
  ISegmentCanvasProps,
  ISegment,
  ISegmentCanvasSegmentLayer,
} from '@adam-sv/arc';
import { Segment } from './Segment';

export function SegmentCanvas(props: ISegmentCanvasProps): JSX.Element {
  const {
    className,
    drawingParams,
    id,
    minZoom = 0.5,
    maxZoom = 10,
    minHeight = 400,
    layers,
    style,
    backgroundRenderer,
    foregroundRenderer,
  } = props;
  return (
    <ChartContainer
      className={cn('ArcSegmentCanvas', className)}
      id={id}
      style={style}
      sizing={{
        mode: 'responsive',
        matchSizeAtDefaultZoomTo: 'width',
        coordinateSpace: {
          height: drawingParams.canvasHeight,
          width: drawingParams.canvasWidth,
        },
      }}
      minContentHeight={minHeight}
      maxZoom={maxZoom}
      minZoom={minZoom}
      contentRenderer={(
        canvasRect: DOMRect,
        chartContainerSizing: ICCSizing
      ) => {
        return (
          <g>
            {backgroundRenderer
              ? backgroundRenderer(canvasRect, chartContainerSizing)
              : null}
            {layers.map((layer: ISegmentCanvasSegmentLayer, index: number) => (
              <g style={layer.groupStyle} key={`layer-${index}`}>
                {layer.backgroundRenderer
                  ? layer.backgroundRenderer(canvasRect, chartContainerSizing)
                  : null}
                {layer.segments.map((segment: ISegment, index: number) => (
                  <Segment
                    key={`segment-${index}`}
                    drawingParams={drawingParams}
                    chartContainerSizing={chartContainerSizing}
                    segment={segment}
                  />
                ))}
                {layer.foregroundRenderer
                  ? layer.foregroundRenderer(canvasRect, chartContainerSizing)
                  : null}
              </g>
            ))}
            {foregroundRenderer
              ? foregroundRenderer(canvasRect, chartContainerSizing)
              : null}
          </g>
        );
      }}
    />
  );
}
