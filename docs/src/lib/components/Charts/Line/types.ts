import type { IARCProps, RenderableContent } from '@adam-sv/arc';
import { SyntheticEvent, CSSProperties } from 'react';
import { ILegendItem } from '../ChartContainer/types';
import type { DatumId } from '../types';

export interface ILineChartProps<T = any> extends IARCProps {
  data: { [key: string]: ILineChartDatum<T>[] };
  yAxis?: IYAxis;
  xAxis?: IXAxis;
  minHeight?: number;
  lineOpts?: ILineChartLineProps;
  disableMouseTracking?: boolean;
  mouseOverStyle?: CSSProperties;
  customMouseOver?: (value: string | number) => RenderableContent;
  mouseOverTargetElement?: Element;
  colors?: string[]; // if you want to provide colors for each line, provide the string here, we'll build the gradients
  baseColor?: string; // default is var(--surface)
  minXValue?: number;
  maxXValue?: number;
  minYValue?: number;
  maxYValue?: number;
  dateMode?: boolean;
  displayXValueInMouseOver?: boolean;
  customDateConversion?: (dateTime: number) => string;
  legend?: Array<ILegendItem>;
}

export interface ILineChartDatum<T = any> {
  id?: DatumId;
  className?: string;
  value: number;
  time: number;
  data?: T;
}

export interface IYAxis {
  domain?: number[];
  tickCount?: number;
  label?: string;
}

export interface IXAxis {
  domain?: [number, number];
  tickCount?: number;
  label?: string;
}

export interface ILineChartLineProps<T = any> {
  onMouseOver?: (
    e: SyntheticEvent,
    datum: ILineChartProps<T>['data']['value']
  ) => unknown;
  onMouseOut?: (
    e: SyntheticEvent,
    datum: ILineChartProps<T>['data']['value']
  ) => unknown;
  onClick?: (
    e: SyntheticEvent,
    datum: ILineChartProps<T>['data']['value']
  ) => unknown;
}
