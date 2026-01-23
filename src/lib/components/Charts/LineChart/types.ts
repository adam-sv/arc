import { RenderableContent, IARCProps } from '@adam-sv/arc';
import { SyntheticEvent } from 'react';
export interface ILineChartDatum<T = any> {
  id?: string | number;
  className?: string;
  value: number;
  time: number;
  data?: T;
}

export interface ILineChartProps<T = any> extends IARCProps {
  data: { [key: string]: ILineChartDatum<T>[] };
  yMax?: number;
  yMin?: number;
  xMin?: number;
  xMax?: number;
  dateMode?: boolean;
  lineOpts?: ILineChartLineProps;
  disableMouseTracking?: boolean;
  customMouseOverContent?: (
    value: number,
    line: ILineChartDatum[]
  ) => RenderableContent;
  axisSettings?: Partial<Record<'left' | 'bottom', ILineChartAxisProps>>;
  minContentHeight?: number;
}

export interface ILineChartLineProps<T = any> {
  onClick?: (e: SyntheticEvent, datum: ILineChartDatum<T>[]) => unknown;
  onMouseOver?: (e: SyntheticEvent, datum: ILineChartDatum<T>[]) => unknown;
  onMouseOut?: (e: SyntheticEvent, datum: ILineChartDatum<T>[]) => unknown;
}

export interface ILineChartAxisProps {
  size?: number;
  label?: string;
  preventResize?: boolean;
}
