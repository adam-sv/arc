// dependencies = d3
import * as d3 from 'd3';
import { lab } from 'd3';
// types
import type { RenderableContent } from '@adam-sv/arc';
export type D3Range = [number, number];

export interface IScaleOpts {
  nice?: boolean;
  tickCount?: number;
}

/* CATEGORIES */
export type CategoryDomain = string[];

export function computeCategoryDomain(
  data: string[],
  userDomain?: string[],
): CategoryDomain {
  const domain = [];
  [data, userDomain].forEach(categoryList => {
    if (categoryList?.length > 0) {
      categoryList.forEach(str => {
        if (domain.indexOf(str) < 0) {
          domain.push(str);
        }
      });
    }
  });
  return domain;
}

export function computeCategoryTicks(
  domain: CategoryDomain,
  range: D3Range,
): {
  ticks: ICategoryTick[],
  scale: any,
} {
  const labelHeight = domain.length > 0
   ? (range[1] - range[0]) / domain.length
   : 1;
  const scale = d3.scaleBand()
    .domain(domain)
    .range(range);

  return {
    ticks: domain.map(category => {
      return {
        startPos: scale(category),
        endPos: scale(category) + labelHeight,
        label: category,
      };
    }),
    scale: scale,
  };
}

export interface ICategoryTick {
  startPos: number;
  endPos: number;
  label: string;
}
/* end categories */

/* DATES */
export type DateDomain = [
  number,
  number,
];

export function computeDateDomain(
  data: (Date | number)[],
  userDomain?: [Date | number, Date | number],
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

function nearestPow2(zoom: number){
  return Math.pow(
    2,
    Math.round(
      Math.log(zoom) / Math.log(2)
    ),
  ); 
}

export function computeDateTicks(
  domain: DateDomain,
  range: D3Range,
  opts?: IScaleOpts,
  zoom?: number,
): {
  ticks: IDateTick[],
  scale: any,
} {
  opts = opts || {};
  zoom = zoom || 1;

  let scale = d3.scaleTime()
    .domain(domain)
    .range(range);

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

function getNumberFromDateOrNumber(dateOrNumber: Date | number, suppressError?: boolean): number {
  let numMs;
  if (typeof dateOrNumber === 'number') {
    numMs = dateOrNumber;
  } else if (typeof dateOrNumber.getTime === 'function') {
    numMs = dateOrNumber.getTime();
  } else if (!suppressError) {
    throw new Error(`Unknown value provided to computeDateDomain: ${dateOrNumber}`);
  }
  return numMs;
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

  return `${d.getFullYear()}/${pad(d.getMonth() + 1, 2)}/${d.getDate()} - ${d.getHours()}:${pad(d.getMinutes(), 2)}`;
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
