// dependencies = d3
import * as d3 from 'd3';
import { lab } from 'd3';
// types
import type { RenderableContent } from '@adam-sv/arc';
import { CategoryDomain, D3Range } from '../types';
import { nearestPow2 } from '../helpers';

export interface IScaleOpts {
  nice?: boolean;
  tickCount?: number;
}

export function computeDateTicks(
  domain: DateDomain,
  range: D3Range,
  opts?: IScaleOpts,
  zoom?: number
): {
  ticks: IDateTick[];
  scale: d3.ScaleTime<number, number, never>;
} {
  opts = opts || {};
  zoom = zoom || 1;

  let scale = d3.scaleTime().domain(domain).range(range);

  if (opts.nice) {
    scale = scale.nice();
  }

  const ticks = opts.tickCount
    ? scale.ticks(opts.tickCount * nearestPow2(zoom))
    : scale.ticks();

  return {
    ticks: ticks.map((tick: Date) => {
      return {
        tickContent: formatDateTick(tick),
        position: scale(tick),
      };
    }),
    scale: scale,
  };
}

export interface IDateTick {
  tickContent: RenderableContent;
  position: number;
}

/* CATEGORIES */
export function computeCategoryDomain(
  data: string[],
  userDomain?: string[]
): CategoryDomain {
  const domain = [] as string[];
  [data, userDomain].forEach((categoryList) => {
    if (categoryList?.length) {
      categoryList.forEach((str) => {
        if (domain.indexOf(str) < 0) {
          domain.push(str);
        }
      });
    }
  });
  return domain;
}

/* DATES */
export type DateDomain = [number, number];

export function computeDateDomain(
  data: (Date | number)[],
  userDomain?: [Date | number, Date | number]
): DateDomain {
  const domain = [Infinity, -Infinity];

  if (userDomain && userDomain.length === 2) {
    domain[0] = getNumberFromDateOrNumber(userDomain[0]);
    domain[1] = getNumberFromDateOrNumber(userDomain[1]);
  }

  data.forEach((dateOrNumber) => {
    const numMs = getNumberFromDateOrNumber(dateOrNumber);
    if (numMs < domain[0]) {
      domain[0] = numMs;
    }
    if (numMs > domain[1]) {
      domain[1] = numMs;
    }
  });

  return domain as DateDomain;
}

function getNumberFromDateOrNumber(dateOrNumber: Date | number): number {
  if (typeof dateOrNumber === 'number') return dateOrNumber;
  if (typeof dateOrNumber.getTime === 'function') return dateOrNumber.getTime();
  throw new Error(
    `Unknown value provided to computeDateDomain: ${dateOrNumber}`
  );
}
/* end dates */

/* POSITIONS */
export function computeRelativePositions(rect: DOMRect) {
  return {
    x1: 0,
    y1: 0,
    x2: rect.right - rect.left,
    y2: rect.bottom - rect.top,
  };
}

/* TICKS */
function formatDateTick(dateOrNum: Date | number) {
  const d = new Date(dateOrNum);

  return `${d.getFullYear()}/${pad(
    d.getMonth() + 1,
    2
  )}/${d.getDate()} - ${d.getHours()}:${pad(d.getMinutes(), 2)}`;
}

function pad(str: string | number, length: number, fill?: string) {
  str = `${str}`;
  fill = fill || '0';

  while (str.length < length) {
    str = `${fill}${str}`;
  }

  return str;
}
/* end ticks */
