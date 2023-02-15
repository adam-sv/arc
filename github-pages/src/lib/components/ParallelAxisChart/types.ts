import type { IARCProps } from '@adam-sv/arc';

export interface IParallelAxisChartProps extends IARCProps {
  data: ParallelAxisChartDatum[];
  columns: IParallelAxisChartColumn[];
  didFilterData?: (newData: ParallelAxisChartDatum[]) => unknown;
}

export type ParallelAxisChartDatum = {
  id: string;
  values: Record<string, number>;
};

export interface IParallelAxisChartColumn extends IARCProps {
  label: string;
  key: string;
  numTicks?: number; // defaults to 10, does nothing if ticks is defined
  ticks?: number[]; // defaults to numTicks evenly-spaced ticks
  tickWidth?: number; // defaults to 10
  max?: number; // defaults to 110% of max value
  min?: number; //defaults to 90% of min value
}
