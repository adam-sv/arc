import { cn } from '@adam-sv/arc';
import React from 'react';
import './style.scss';

export interface ICabinViewAircraftMask {
  noseCurveLength: number;
  tailCurveLength?: number;
  noseOffsetLength: number;
  length: number;
  cabinLength: number;
}

export const CabinViewAircraftMask = (
  props: ICabinViewAircraftMask
): JSX.Element => {
  const { noseCurveLength, length, cabinLength, noseOffsetLength } = props;

  const noseCurveLengthFrac = noseCurveLength / length;
  const tailCurveLength =
    props.tailCurveLength || length - cabinLength - noseOffsetLength;
  const tailCurveLengthFrac = tailCurveLength / length;

  const moveToFrontCenter = 'M 0 0.5';
  const curveFromNoseToTop = `
    C 0.0 0.3, 
      0.05 0.05, 
      ${noseCurveLengthFrac} 0
  `;
  const lineToRearTop = `L ${1 - tailCurveLengthFrac} 0`;
  const curveToRearCenter = `
    C 1 0,
      1 0.3,
      1 0.5
  `;

  const curveFromRearToBottom = `
    C 1 0.7,
      1 1,
      ${1 - tailCurveLengthFrac} 1
  `;

  const lineToFrontBottom = `L ${noseCurveLengthFrac} 1`;

  // this curve is the opposite of curveFromNoseToTop
  const curveFromBottomToNose = `
    C 0.05 0.95,
      0.0 0.7,
      0 0.5
  `;

  const d = `
    ${moveToFrontCenter}
    ${curveFromNoseToTop}
    ${lineToRearTop}
    ${curveToRearCenter}
    ${curveFromRearToBottom}
    ${lineToFrontBottom}
    ${curveFromBottomToNose}
  `;

  return <path d={d} />;
};
