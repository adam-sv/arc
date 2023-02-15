import type { ICCFitsOneDimensionSizing } from '@adam-sv/arc';
import type { ILineChartDatum } from './types';
import { ScaleBand, scaleBand, ScaleLinear, scaleLinear } from 'd3';
import type { D3Range } from '../types';
import { nearestPow2 } from '../helpers';

export const getYDomain = (maxValue: number, minValue: number) => [
  minValue,
  maxValue,
];

export const getXDomain = (maxValue: number, minValue: number) => [
  minValue,
  maxValue,
];

export type LineChartYScale = ScaleLinear<number, number, never>;
export type LineChartXScale = ScaleLinear<number, number>;

export const getYScale = (domain: number[], range: D3Range): LineChartYScale =>
  scaleLinear().domain(domain).range(range);

export const getXScale = (domain: number[], range: D3Range): LineChartXScale =>
  scaleLinear().domain(domain).range(range);

export const getTicks = (
  tickCount: number | undefined,
  scale: LineChartXScale,
  zoom: number
): number[] =>
  tickCount ? scale.ticks(tickCount * nearestPow2(zoom)) : scale.ticks();
