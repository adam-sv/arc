// dependencies
import React, { useState, useRef, Fragment, useEffect } from 'react';
// internals
import { parseDirection } from './logic';
import A321MaskPathLeft from './a321_mask_path';
import A321MaskPathRight from './a321_mask_path_right';
import A321Svg from './a321_windows';
// types
import type { IARCProps } from '@adam-sv/arc';
import type {
  IOverheadViewBackground,
  IOverheadViewProps,
  ISegmentInput,
  ISegmentChiral,
  ISegmentFree,
  ISegmentFreeByCoords,
  ISegmentFreeByPosSize,
  ISegmentComputedPos,
} from './types';

export interface IBackgroundProps extends IARCProps {
  backgroundImage?: IOverheadViewBackground;
  direction: 'left' | 'up' | 'right' | 'down';
  finalMaskId: string;
  maskWidth: number;
  maskHeight: number;
  viewBox?: string;
}

// TODO:
// 1. We are seeing some crazy behavior with transform: tranlate behavior double-applying
//   when we use an SVG inside an SVG, where the nested child SVG is in a g tag applying translate
// 2. To fix this, we need to simply "scale" the background image to the appropriate dimensions
//    This can be done by wrapping the <A321Svg /> in a
//    <g style={{ transform: scale(chartContainerCoordinateWidth / backgroundImageWidth) }}><A321SVG /></g>
//    The key is to make the A321Svg NOT a full SVG image but just the contents
// 3. This feels like it would give us a plausible path to making generated paths for this in the future too
//    The hard part is that we have only a few valid background iamges. We should collect them all and try.
export function Background(props: IBackgroundProps) {
  const {
    backgroundImage,
    direction,
    finalMaskId,
    maskWidth,
    maskHeight,
    viewBox,
  } = props;

  const { flipped, vertical } = parseDirection(direction);
  let rotation = 0;
  if (vertical) {
    rotation += 90;
  }
  if (flipped) {
    rotation += 180;
  }

  return (
    <g
      id='background'
      transform={`rotate(${rotation} ${maskWidth / 2} ${maskHeight / 2})`}
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center',
        offset: '100px',
      }}
    >
      {backgroundImage && (
        <>
          {backgroundImage.maskAsEle || backgroundImage.maskAsPath ? (
            // viewbox was an svg prop below
            <svg className='ArcSegmentedImage-mask-image' viewBox={viewBox}>
              <clipPath
                id={finalMaskId}
                clipPathUnits='objectBoundingBox'
                transform={`scale(${1 / maskWidth}, ${1 / maskHeight})`}
              >
                {backgroundImage.maskAsPath && (
                  <path
                    transform-origin='center'
                    d={backgroundImage.maskAsPath}
                  />
                )}
                {!backgroundImage.maskAsPath && backgroundImage.maskAsEle}
              </clipPath>
            </svg>
          ) : null}

          {backgroundImage.imgAsSrc ? (
            <img
              className='ArcSegmentedImage-background-image'
              src={backgroundImage.imgAsSrc}
            />
          ) : (
            backgroundImage.imgAsEle
          )}
        </>
      )}

      {!backgroundImage && (
        <>
          <svg
            width={maskWidth}
            height={maskHeight}
            viewBox={'0 0 615 74.3'}
            preserveAspectRatio='none'
            transform={`rotate(180 ${615 / 2} ${74.3 / 2})`}
            className={'canISeeThis'}
          >
            <A321Svg />
            <clipPath
              id={finalMaskId}
              clipPathUnits='objectBoundingBox'
              transform={`scale(0.00162786911 0.0134589502)`}
            >
              <A321MaskPathRight
                rotation={rotation}
                width={maskWidth}
                height={maskHeight}
              />
            </clipPath>
          </svg>
        </>
      )}
    </g>
  );
}
