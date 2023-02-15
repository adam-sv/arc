// dependencies
import React from 'react';
import { cn } from '@adam-sv/arc';
// internals
import { parseDirection } from '../logic';
// types
import type {
  IOverheadViewCoordinates,
  IOverheadViewDirection,
  ISegmentComputedPos,
  ISegmentFreeByCoords,
  ISegmentFreeByPosSize,
  ISegmentInput,
} from '../types';
import { ISegmentChiral } from '../types';

export interface ISegmentProps {
  actualCoordinates: IOverheadViewCoordinates;
  coords: DOMRect;
  direction: IOverheadViewDirection;
  extrasTotal?: number;
  index: number;
  isExtraItem?: boolean;
  segmentInput: ISegmentInput;
}

export function Segment(props: ISegmentProps) {
  const {
    direction,
    extrasTotal,
    isExtraItem,
    index,
    segmentInput,
    actualCoordinates,
    coords,
  } = props;
  const bgWidth = coords.width;
  const bgHeight = coords.height;

  // if a segments length/width is bigger than the actual plane you get something like 1 - 1.2 which
  // then makes the length smaller. Should we account for if a piece is bigger than the actual plane separately?
  const segmentPos = getSegmentPos(
    segmentInput,
    actualCoordinates,
    isExtraItem || false,
    extrasTotal || 2,
    index || 0
  );

  const { flipped, vertical } = parseDirection(direction);

  const getWidth = () =>
    Math.abs(1 - segmentPos.rightFrac - segmentPos.leftFrac);
  const getHeight = () =>
    Math.abs(1 - segmentPos.bottomFrac - segmentPos.topFrac);

  const pos = {
    x:
      bgWidth *
      (vertical
        ? flipped
          ? segmentPos.topFrac
          : segmentPos.bottomFrac
        : flipped
        ? segmentPos.rightFrac
        : segmentPos.leftFrac),
    y:
      bgHeight *
      (vertical
        ? flipped
          ? segmentPos.rightFrac
          : segmentPos.bottomFrac
        : flipped
        ? segmentPos.bottomFrac
        : segmentPos.topFrac),
    width: bgWidth * (vertical ? getHeight() : getWidth()),
    height: bgHeight * (vertical ? getWidth() : getHeight()),
  };
  // console.log({ flipped, vertical, pos, coords });

  return (
    <g className={cn('ArcOverheadView-Segment', segmentInput.className)}>
      <rect x={pos.x} y={pos.y} height={pos.height} width={pos.width}></rect>
      <foreignObject x={pos.x} y={pos.y} height={pos.height} width={pos.width}>
        <div
          // @ts-ignore why do you need this? Look up namespaces
          xmlns='http://www.w3.org/1999/xhtml'
          className={cn('ArcOverheadView-Segment-htmlContent')}
        >
          {getContent(segmentInput)}
        </div>
      </foreignObject>
    </g>
  );
}

function getContent(segmentInput: ISegmentInput) {
  if (segmentInput.contentGenerator)
    return segmentInput.contentGenerator(segmentInput);
  if (segmentInput.data?.title) return segmentInput.data.title;
  return '';
}

function getXOriginFrac(
  xOriginOffset?: number,
  actualLengthDimension?: number
) {
  if (!xOriginOffset || !actualLengthDimension) {
    return 0;
  }
  return xOriginOffset / actualLengthDimension;
}

function getSegmentPos(
  segmentInput: ISegmentInput,
  actualCoordinates: IOverheadViewCoordinates,
  isExtraItem: boolean,
  totalExtras: number,
  index: number
): ISegmentComputedPos {
  const chiral = segmentInput as ISegmentChiral | never;
  if (
    chiral.hasOwnProperty('isLhs') &&
    chiral.hasOwnProperty('midlineOffset')
  ) {
    return getChiralSegmentPos(
      segmentInput as ISegmentChiral,
      actualCoordinates
    );
  }

  const coords = segmentInput as ISegmentFreeByCoords | never;
  if (coords.hasOwnProperty('x2') && coords.hasOwnProperty('y2')) {
    return getCoordsBasedPos(
      segmentInput as ISegmentFreeByCoords,
      actualCoordinates
    );
  }

  const posSize = segmentInput as ISegmentFreeByPosSize | never;
  if (posSize.hasOwnProperty('width') && posSize.hasOwnProperty('length')) {
    return getPointSizeBasedPos(
      segmentInput as ISegmentFreeByPosSize,
      actualCoordinates,
      isExtraItem,
      totalExtras,
      index
    );
  }

  console.error('Unknown segmentInput signature:', segmentInput);
  throw new Error(
    'SegmentedImage.Segment.getSegmentPos could not determine position for segment ' +
      segmentInput.id
  );
}

function getPointSizeBasedPos(
  segmentInput: ISegmentFreeByPosSize,
  actualCoordinates: IOverheadViewCoordinates,
  isExtraItem: boolean,
  totalExtras: number,
  index: number
): ISegmentComputedPos {
  const { actualLengthDimension, actualWidthDimension, xOriginOffset } =
    actualCoordinates;
  let invertX = false;

  //old math
  // let leftFrac = 0;
  // let rightFrac = -1;

  // calculate top and bottom
  const topFrac = segmentInput.y1 / actualWidthDimension;
  const bottomFrac =
    1 - (segmentInput.y1 + segmentInput.length) / actualWidthDimension;

  //calculate right and left
  //my math
  //
  const widthFrac = segmentInput.width / actualLengthDimension;
  let leftFrac = segmentInput.x1 / actualLengthDimension;
  let rightFrac = 1 - (leftFrac + widthFrac);

  if (isExtraItem) {
    leftFrac = (index + 2) / (totalExtras + 3);
    rightFrac = 1 - (leftFrac + widthFrac);
  }

  return {
    segmentId: segmentInput.id,
    rightFrac,
    leftFrac,
    topFrac,
    bottomFrac,
  };
}

function getCoordsBasedPos(
  segmentInput: ISegmentFreeByCoords,
  actualCoordinates: IOverheadViewCoordinates,
  isExtraItem?: boolean,
  totalExtras?: number,
  index?: number
): ISegmentComputedPos {
  // TODO: don't pass actualCoordinates around if all we need is the actualCoordinates
  const { actualLengthDimension, actualWidthDimension, xOriginOffset } =
    actualCoordinates;
  const invertX = false;
  const xOriginFrac = getXOriginFrac(xOriginOffset, actualLengthDimension);

  // calculate top and bottom
  const { yIsCenterline } = segmentInput;
  const y1 = yIsCenterline
    ? segmentInput.y1 + actualWidthDimension / 2
    : segmentInput.y1;

  const y2 = yIsCenterline
    ? segmentInput.y2 + actualWidthDimension / 2
    : segmentInput.y2;

  const topFrac = y1 / actualWidthDimension;
  const bottomFrac = 1 - y2 / actualWidthDimension;

  // calculate left and right, 2 steps because of nose offest
  const x1Frac = segmentInput.x1 / actualLengthDimension;
  const x2Frac = segmentInput.x2 / actualLengthDimension;

  const leftFrac = xOriginFrac + x1Frac;
  const rightFrac = 1 - (xOriginFrac + x2Frac);

  if (invertX) {
    throw new Error('Unimplemented - invertX in ISegmentFreeByCoords');
  }

  return {
    segmentId: segmentInput.id,
    rightFrac,
    leftFrac,
    topFrac,
    bottomFrac,
  };
}

function getChiralSegmentPos(
  segmentInput: ISegmentChiral,
  actualCoordinates: IOverheadViewCoordinates
): ISegmentComputedPos {
  const { actualLengthDimension, actualWidthDimension, xOriginOffset } =
    actualCoordinates;
  let invertX = false;
  const xOriginFrac = getXOriginFrac(xOriginOffset, actualLengthDimension);

  // calculate top and bottom
  const isFullWidth = segmentInput.midlineOffset === undefined;
  let topFrac = 0;
  let bottomFrac = 0;
  const midlineOffsetFrac = segmentInput.midlineOffset / actualWidthDimension;

  if (!isFullWidth) {
    bottomFrac = segmentInput.isLhs ? 0 : 0.5 - midlineOffsetFrac;
    topFrac = segmentInput.isLhs ? midlineOffsetFrac + 0.5 : 0;
  }

  if (invertX) {
    const swap = bottomFrac;
    bottomFrac = topFrac;
    topFrac = swap;
  }

  // calculate left and right
  const xFrac = segmentInput.x / actualLengthDimension;
  const lengthFrac = segmentInput.length / actualLengthDimension;
  let leftFrac = xOriginFrac + xFrac;
  let rightFrac = 1 - (leftFrac + lengthFrac);

  if (invertX) {
    const swap = rightFrac;
    rightFrac = leftFrac;
    leftFrac = swap;
  }

  return {
    segmentId: segmentInput.id,
    rightFrac,
    leftFrac,
    topFrac,
    bottomFrac,
  };
}
