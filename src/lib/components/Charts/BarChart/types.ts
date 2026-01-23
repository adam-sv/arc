import { SyntheticEvent } from 'react';
import { IARCProps, RenderableContent } from '@adam-sv/arc';

export interface IBarChartDatum<T = any> {
  value: number;
  id?: string;
  className?: string;
  data?: T;
  label: string;
  categoryIdentifier?: string;
}

export interface IBarChartProps<T = any> extends IARCProps {
  axisSettings?: Partial<Record<'left' | 'bottom', IBarChartAxisProps>>;
  // TODO: rename
  minimumWidth: number;
  minimumHeight: number;
  // TODO: what level should the user provide data at? Probably use old BarChart for guidance
  stackedBars?: boolean;
  data: IBarChartDatum<T>[];
  minValue?: number;
  maxValue?: number;
  barOpts?: IBarOpts;
  orientation?: 'vertical' | 'horizontal';
  disableMouseTracking?: boolean;
  customMouseOver?: (datum: IBarChartDatum) => RenderableContent;
  mouseOverTargetElement?: Element;
  displayLegend?: boolean;
  lineData?: IBarChartSecondaryLineData;
}

export interface IBarChartAxisProps {
  size?: number;
  label?: string;
  preventResize?: boolean;
}

export interface IBarOpts<T = any> {
  minBarThickness?: number;
  maxBarThickness?: number;
  barPadding?: number;
  onClick?: (e: SyntheticEvent, datum: IBarChartDatum<T>) => unknown;
  onMouseOver?: (e: SyntheticEvent, datum: IBarChartDatum<T>) => unknown;
  onMouseOut?: (e: SyntheticEvent, datum: IBarChartDatum<T>) => unknown;
}

export interface IBarChartSecondaryLineData {
  data: {
    category?: string;
    label: string;
    value: number;
    displayValue?: RenderableContent;
  }[];
  textOffset?: { horizontal: number; vertical: number };
  dataPoints?: boolean;
  minValue: number;
  maxValue: number;
  axisSettings: IBarChartAxisProps;
  displayGrid?: boolean;
  horizontalLine?: number;
}
