// dependencies
import React, { useState } from 'react';
// internals
import { cn } from '@adam-sv/arc';
import A321MaskPathLeft from './a321_mask_path';
import A321MaskPathRight from './a321_mask_path_right';
import A321Svg from './a321_windows';
import { Segment } from './Segment';
// style
import './style.css';
// types
import type { RenderableContent } from '@adam-sv/arc';

export interface ISegmentedImageProps<T = any> {
  actualLengthDimension: number; // real world length dimension
  actualWidthDimension: number; // real world width dimension
  invertX?: boolean; // "flips" our horizontal numbers about the center
  maskId?: string;
  xOriginOffset?: number; // how far the origin is from the edge of the image
  segments: ISegmentInput<T>[];
  backgroundImage?: {
    imgAsSrc?: string;
    imgAsEle?: Element;
    maskAsPath?: string;
    maskAsEle?: SVGPathElement | RenderableContent; // warning: you need to handle invertX behavior outside the component in this paradigm
    maskHeight: number;
    maskWidth: number;
  };
}

export interface ISegmentInput<T = any> {
  midlineOffset: number; // how far away from the midline the segment starts
  x: number; // how far from the right the segment starts
  length: number; // the "length" of the segment (i.e. change in x value from start to finish)
  isLhs: boolean; // "flips" our vertical numbers about the center
  contentGenerator?: (segment: ISegment<T>) => RenderableContent;
  data: T;
}

export interface ISegment<T = any> extends ISegmentInput<T> {
  rightFrac: number; // how far from the right is the right edge, as a fraction of total length
  leftFrac: number; // how far from the left is the left edge, as a fraction of total length
  topFrac: number; // how far from the top is the top edge, as a fraction of total height
  bottomFrac: number; // how far from the bottom is the bottom edge, as a fraction of total height
}

export function SegmentedImage<T = any>(props :ISegmentedImageProps<T>) {
  const { backgroundImage, invertX, maskId, segments, ...rest } = props;

  if (backgroundImage?.maskAsEle) {
    console.warn('SegmentedImage backgroundImage.maskAsEle prop will be deprecated - maskAsPath automatically handles invertX behavior for users.');
  }

  const [finalMaskId] = useState(maskId || Math.random().toString(36).slice(2, 11));
  
  const maskWidth = backgroundImage ? backgroundImage.maskWidth : 0;
  const maskHeight = backgroundImage ? backgroundImage.maskHeight : 0;
  let viewBox;
  if (backgroundImage) {
    viewBox = `0 0 ${maskWidth} ${maskHeight}`;
  }

  return (
    <div
      className={cn(
        "ArcSegmentedImage",
        invertX && 'inverted-x',
      )}
    >
      {backgroundImage && (
        <>
          {backgroundImage.maskAsEle || backgroundImage.maskAsPath
            ? <svg
                className="ArcSegmentedImage-mask-image"
                viewBox={viewBox}
              >
                <clipPath
                  id={finalMaskId}
                  clipPathUnits="objectBoundingBox"
                  transform={`scale(${1 / maskWidth}, ${1 / maskHeight})`}
                >
                  {backgroundImage.maskAsPath && <path
                    transform-origin="center"
                    transform={invertX ? `rotate(180)` : undefined}
                    d={backgroundImage.maskAsPath}
                  />}
                  {!backgroundImage.maskAsPath && backgroundImage.maskAsEle}
                </clipPath>
              </svg>
            : null
          }

          {backgroundImage.imgAsSrc
            ? <img
                className="ArcSegmentedImage-background-image"
                src={backgroundImage.imgAsSrc}
              />
            : backgroundImage.imgAsEle
          }
        </>
      )}

      {!backgroundImage && (
        <>
          <svg className="ArcSegmentedImage-mask-image" viewBox="0 0 614.3 74.3">
            <clipPath
              id={finalMaskId}
              clipPathUnits="objectBoundingBox"
              transform="scale(0.00162786911 0.0134589502)"
            >
              {invertX && <A321MaskPathRight />}
              {!invertX && <A321MaskPathLeft />}
            </clipPath>
          </svg>
          <A321Svg />
        </>
      )}

      <div
        className="ArcSegmentedImage-segments"
        style={{ clipPath: `url(#${finalMaskId})` }}
      >
        {segments.map((segmentInput: ISegmentInput, index: number) => (
          <Segment
            key={`segment-${index}`}
            parentProps={{ backgroundImage, invertX, segments, ...rest }}
            segmentInput={segmentInput}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
