import React from 'react';
import A320LineDrawing from './planform-line-drawings/a320-line';
import type { IARCProps } from '@adam-sv/arc';
import A320Mask from './masks/a320-mask';

export interface IBackgroundProps extends IARCProps {
  direction: 'left' | 'up' | 'right' | 'down';
  width: number;
  height: number;
  clipPathId: string;
}

export const A320Background = (props: IBackgroundProps): JSX.Element => {
  const {
    // direction, // unused at the moment
    width,
    height,
    clipPathId,
  } = props;

  // const { isFlipped, isVertical } = parseDirection(direction);
  // let rotation = 0;
  // if (isVertical) {
  //   rotation += 90;
  // }
  // if (isFlipped) {
  //   rotation += 180;
  // }

  return (
    <svg
      width={width}
      height={height}
      // mostly pulled viewbox from original svg, viewBox="0 0 426.5 52.6"
      // but then manually fanagled into place to accommodate stroke width
      viewBox='-0.5 0.1 426.75 52.8'
      className='ArcCabinView-background'
      preserveAspectRatio='none'
    >
      <A320LineDrawing />

      <clipPath
        // this clip path can live anywhere, it just made some sense to put it here
        // it is not affected by the viewBox or even by the fact that it's nested inside this SVG
        // it is simply defining an invisible path that can be used as a clip path anywhere
        clipPathUnits='objectBoundingBox'
        id={clipPathId}
      >
        <A320Mask />
      </clipPath>
    </svg>
  );
};
