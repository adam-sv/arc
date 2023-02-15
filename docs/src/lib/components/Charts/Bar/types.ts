import type { RenderableContent } from '@adam-sv/arc';
import type { CSSProperties, SyntheticEvent } from 'react';
import { ILegendItem } from '../ChartContainer/types';
import type { DatumId } from '../types';

export enum BarChartOrientation {
  'horizontal' = 1,
  'vertical' = 2,
}

export const DEFAULT_CHART_ORIENTATION = BarChartOrientation.horizontal;

export interface IBarChartProps<T = any> {
  data: IBarChartDatum<T>[];
  barOpts?: IBarChartBarProps<T>;
  categoryMode?: 'stacked' | 'grouped'; // defaults to grouped
  dependentAxis?: IDependentAxisProps;
  independentAxis?: IIndependentAxisProps;
  minHeight?: number; // default: 240
  children?: (
    graphRect: DOMRect,
    xScale: any,
    yScale: any
  ) => RenderableContent;
  resizeLeftRightAxis?: boolean;
  resizeTopBottomAxis?: boolean;
  // Previously we used "extends IARCProps"
  className?: string;
  id?: string;
  style?: CSSProperties;
  disableMouseTracking?: boolean;
  mouseOverStyle?: CSSProperties;
  customMouseOver?: (datum: IBarChartDatum) => RenderableContent;
  mouseOverTargetElement?: Element;
  stacked?: boolean;
  //secondary line data is for when the  x values of line data match up perfectly with the x values of the bars
  //The values could be strings or numbers eg: ['cat1', 'cat2', 'cat3'] or [1, 2, 3] and the line data x values
  //will match up to one of those values
  secondaryLineData?: ISecondaryLineData;
  //continouse lines is for when the bar charts x values are numbers in a contious step wise fashion [1,2,3] or [5, 10 ,15]
  //and the line data x values has values that dont match up perfectly [5.2, 7.9, 11]
  continuousLines?: {
    dataArray: IContinuousLinesData[];
    independentDomain: [number, number];
    //domain has to be step wise and to format the scale it needs to be 1 step past the last number
    //on the domain
    independentDomainIncrementStep: number;
  };
  legend?: Array<ILegendItem>;
}

export interface IBarChartDatum<T = any> {
  id?: DatumId;
  className?: string;
  data?: T;
  categoryIdentifier?: string;
  label?: string;
  value: number;
}

export interface ISecondaryLineData {
  data: ISecondaryLineDatum[];
  dependentDomain: [number, number];
  percentLine?: number;
  renderAxis?: boolean;
  axisLabel?: string;
}
export interface IContinuousLinesData {
  data: IContinuousLinesDatum[];
  renderAxis?: boolean;
  color: string;
  fillAreaUndercurve?: boolean;
  renderInfrontOfBars?: boolean;
}

export interface ISecondaryLineDatum extends IBarChartDatum {
  value: number;
  fillAreaUnderLine?: boolean;
  layer?: number;
  dataPoint?: boolean;
  dataLabels?: boolean;
}

export interface IContinuousLinesDatum<T = any> {
  id?: DatumId;
  className?: string;
  data?: T;
  categoryIdentifier?: string;
  label: number;
  value: number;
  fillAreaUnderLine?: boolean;
  layer?: number;
  dataPoint?: boolean;
  dataLabels?: boolean;
}

export interface IBarChartBarProps<T = any> {
  onMouseOver?: (e: SyntheticEvent, datum: IBarChartDatum<T>) => unknown;
  onMouseOut?: (e: SyntheticEvent, datum: IBarChartDatum<T>) => unknown;
  barLabelFormat?: (categoryIdentifier: string) => RenderableContent;
  minBarThickness?: number;
  maxBarThickness?: number;
  barPadding?: number;
  orientation?: BarChartOrientation;
}

interface IAxisProps {
  label?: string;
}

export interface IIndependentAxisProps extends IAxisProps {
  domain?: string[]; // bar group identifiers that should be displayed, defaults to all
  label?: string;
  labelFontSize?: number;
  axisThickness?: number;
}

export interface IDependentAxisProps extends IAxisProps {
  domain?: [number, number]; // window, defaults to [0, MAX_DATUM * 1.05]
  tickCount?: number;
  tickFormat?: (val: number) => RenderableContent;
  label?: string;
  labelFontSize?: number;
  axisThickness?: number;
}
