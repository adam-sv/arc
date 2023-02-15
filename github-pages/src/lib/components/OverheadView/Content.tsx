import React from 'react';
// internals
import { Background } from './Background';
import { Segment } from './Segment/index';
// types
import type { ICCSizing } from '@adam-sv/arc';
import type {
  IOverheadViewBackground,
  IOverheadViewCoordinates,
  ISegmentInput,
} from './types';

interface IContentProps {
  actualCoordinates: IOverheadViewCoordinates;
  backgroundImage?: IOverheadViewBackground;
  cc: ICCSizing;
  coords: DOMRect;
  direction: 'left' | 'up' | 'right' | 'down';
  finalMaskId: string;
  segments: ISegmentInput[];
  suppressBackground?: boolean;
}

export const Content = ({
  cc,
  coords,
  direction,
  actualCoordinates,
  finalMaskId,
  backgroundImage,
  segments,
  suppressBackground,
}: IContentProps) => {
  const { chartSize } = cc;

  return (
    <>
      <g>
        {!suppressBackground && (
          <Background
            backgroundImage={backgroundImage}
            direction={direction}
            finalMaskId={finalMaskId}
            maskWidth={chartSize.width}
            maskHeight={chartSize.height}
            viewBox={`0 0 ${cc.chartSize.width} ${cc.chartSize.height}`}
          />
        )}
        <g
          style={{
            clipPath: `url(#${finalMaskId})`,
          }}
        >
          {/* had to add rect below because otherwise the above g would have 0 width/height 
          and would not render properly
          the above g would start where the first rect was rendered and not at the 
          start of the background image, so if there wasnt one that started at 
          //the beggining of the plane it would look all funky
        */}
          <rect
            x={0}
            y={0}
            height={coords.height}
            width={coords.width}
            stroke={'transparent'}
            fill={'transparent'}
          />
          {segments.map((segmentInput: ISegmentInput, index: number) => (
            <Segment
              key={`segment-${index}`}
              actualCoordinates={actualCoordinates}
              coords={coords}
              direction={direction}
              index={index}
              segmentInput={segmentInput}
            />
          ))}
        </g>
      </g>
    </>
  );
};
