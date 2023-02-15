// dependencies
import { ScaleBand, scaleBand, ScaleLinear, scaleLinear } from 'd3';
// internals
import { nearestPow2 } from '../helpers';
import { BarChartOrientation, IContinuousLinesDatum } from './types';
import { ICategoryTick } from '../types';
// types
import type { ICCFitsOneDimensionSizing } from '@adam-sv/arc';
import type { D3Range } from '../types';
import type { IBarChartDatum, IBarChartBarProps } from './types';

/*
 * Domains
 */

export const getIndependentDomain = (data: IBarChartDatum[]) => {
  return data.reduce((acc: string[], cur: IBarChartDatum) => {
    // try to extract a category identifier
    if (cur.categoryIdentifier && !acc.includes(cur.categoryIdentifier)) {
      return [...acc, cur.categoryIdentifier];
    } else if (
      // if there's not a category identifier, try to add the label as a category
      !cur.categoryIdentifier &&
      cur.label &&
      !acc.includes(cur.label)
    ) {
      return [...acc, cur.label];
    }
    return acc;
  }, []);
};

export const getDependentDomain = (
  data: IBarChartDatum[] | IContinuousLinesDatum[]
) => [
  0,
  Math.max(
    ...data.map((d: IBarChartDatum | IContinuousLinesDatum) => d.value)
  ) * 1.05,
];

export const getDependentStackedDomain = (data: IBarChartDatum[]) => {
  const categories: { [key: string]: number } = {};
  data.forEach((datum) => {
    if (!datum.label) return;
    if (categories[datum.label]) {
      categories[datum.label] += datum.value;
    } else {
      categories[datum.label] = datum.value;
    }
  });
  const values = Object.values(categories);
  return [0, Math.max(...values) * 1.05];
};

/*
 * Scales
 */

export type BarChartDependentScale = ScaleLinear<number, number, never>;
export type BarChartIndependentScale = ScaleBand<string>;

export const getDependentScale = (
  domain: number[],
  range: D3Range
): BarChartDependentScale => scaleLinear().domain(domain).range(range);

export const getIndependentScale = (
  domain: string[],
  range: D3Range
): BarChartIndependentScale => scaleBand().domain(domain).range(range);

/*
 * Ticks
 */

export const getDependentTicks = (
  tickCount: number | undefined,
  scale: BarChartDependentScale,
  zoom: number
): number[] =>
  tickCount ? scale.ticks(tickCount * nearestPow2(zoom)) : scale.ticks();

export const getCategoryTicks = (
  scale: BarChartIndependentScale,
  domain: string[]
): ICategoryTick[] => {
  return domain.map((category: string) => {
    return {
      startPos: scale(category) || 0,
      endPos: (scale(category) || 0) + 20,
      label: category,
    };
  });
};

/*
 * Sizing
 */
export const barOptDefaults = {
  barPadding: 4,
  barThickness: 2,
  minBarThickness: 2,
};

export function getCCSizing<T = any>(
  orientation: BarChartOrientation,
  data: IBarChartDatum<T>[],
  barOpts?: IBarChartBarProps
): ICCFitsOneDimensionSizing {
  const minBarThickness =
    barOpts?.minBarThickness || barOptDefaults.barThickness;
  const barPadding = barOpts?.barPadding || barOptDefaults.barPadding;
  const necessaryThickness =
    minBarThickness * data.length + barPadding * (data.length + 1);

  return {
    mode:
      orientation === BarChartOrientation.horizontal
        ? 'fits-width'
        : 'fits-height',
    controlledCoordinateSpaceSize: necessaryThickness,
    stretchToFillControlledDimension: true,
  };
}
