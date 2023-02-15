// dependencies
import React, { useState } from 'react';
import { ChartContainer } from '@adam-sv/arc';
// internals
import { cn } from '@adam-sv/arc';
import { Content } from './Content';
import { parseDirection } from './logic';
// style
import './style.scss';
// types
import type { ICCSizing } from '@adam-sv/arc';
import type {
  IOverheadViewBackground,
  IOverheadViewDirection,
  IOverheadViewProps,
  ISegmentInput,
  ISegmentChiral,
  ISegmentFree,
  ISegmentFreeByCoords,
  ISegmentFreeByPosSize,
  ISegmentComputedPos,
} from './types';
export type {
  IOverheadViewBackground,
  IOverheadViewDirection,
  IOverheadViewProps,
  ISegmentInput,
  ISegmentChiral,
  ISegmentFree,
  ISegmentFreeByCoords,
  ISegmentFreeByPosSize,
  ISegmentComputedPos,
};

export function OverheadView<T = any>({
  backgroundImage,
  className,
  coordinates,
  id,
  maskId,
  minZoom = 0.5,
  maxZoom = 10,
  minHeight = 400,
  segments,
  style,
  suppressBackground,
}: IOverheadViewProps<T>) {
  const direction: IOverheadViewDirection = coordinates.direction || 'left';

  if (backgroundImage?.maskAsEle) {
    console.warn(
      'SegmentedImage backgroundImage.maskAsEle prop will be deprecated - maskAsPath automatically handles invertX behavior for users.'
    );
  }

  const { vertical } = parseDirection(direction);
  const [finalMaskId] = useState(
    maskId || Math.random().toString(36).slice(2, 11)
  );

  return (
    <ChartContainer
      className={cn('ArcOverheadView', className)}
      id={id}
      style={style}
      sizing={{
        mode: 'responsive',
        matchSizeAtDefaultZoomTo: vertical ? 'height' : 'width',
        coordinateSpace: {
          height: vertical
            ? coordinates.actualLengthDimension
            : coordinates.actualWidthDimension,
          width: vertical
            ? coordinates.actualWidthDimension
            : coordinates.actualLengthDimension,
        },
      }}
      minContentHeight={minHeight}
      maxZoom={maxZoom}
      minZoom={minZoom}
      contentRenderer={(coords: DOMRect, cc: ICCSizing) => {
        // here, we need to figure out the "real" coords, because we fixed contentHeight
        // today, we're relying on the width of the DOM node representing the length of the object
        // later, we'll figure out a truly portable method of this all
        return (
          <Content
            actualCoordinates={coordinates}
            coords={coords}
            cc={cc}
            direction={direction}
            finalMaskId={finalMaskId}
            segments={segments}
            suppressBackground={suppressBackground}
          />
        );
      }}
    />
  );
}
