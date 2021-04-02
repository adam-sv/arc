// dependencies
import React from 'react';
// types
import type { ISegment, ISegmentedImageProps, ISegmentInput } from '..';

export interface ISegmentProps {
  parentProps: ISegmentedImageProps;
  segmentInput: ISegmentInput,
  index: number,
}

export function Segment(props: ISegmentProps) {
  const segment = getSegment(props);
  const content = getContent(props, segment);
  return (
    <div
      key={props.index}
      className="ArcSegmentedImage-Segment"
      style={{
        top: `${segment.topFrac * 100}%`,
        left: `${segment.leftFrac * 100}%`,
        right: `${segment.rightFrac * 100}%`,
        bottom: `${segment.bottomFrac * 100}%`,
      }}
    >
      {content}
    </div>
  );
}

function getContent(props: ISegmentProps, segment: ISegment) {
  return segment.contentGenerator
      ? segment.contentGenerator(segment)
      : segment.data.title
        ? segment.data.title
        : `s-${props.index}`;
}

function getXOriginFrac(xOriginOffset, actualLengthDimension) {
  if (!xOriginOffset || !actualLengthDimension) {
    return 0;
  }
  return xOriginOffset / actualLengthDimension;
}

function getSegment(props: ISegmentProps): ISegment {
  const { segmentInput, parentProps } = props;
  const {
    actualLengthDimension,
    actualWidthDimension,
    invertX,
    xOriginOffset,
  } = parentProps;
  const xOriginFrac = getXOriginFrac(xOriginOffset, actualLengthDimension);

  // calculate top and bottom
  const isFullWidth = segmentInput.midlineOffset === undefined;
  let topFrac = 0;
  let bottomFrac = 0;
  const midlineOffsetFrac = segmentInput.midlineOffset / actualWidthDimension;

  if (!isFullWidth) {
    bottomFrac = segmentInput.isLhs ? 0 : 0.5 - midlineOffsetFrac;
    topFrac = segmentInput.isLhs ? midlineOffsetFrac + 0.5: 0;
  }

  if (invertX)  {
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
    ...segmentInput,
    rightFrac,
    leftFrac,
    topFrac,
    bottomFrac,
  };
}
