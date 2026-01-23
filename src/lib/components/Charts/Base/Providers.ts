// dependencies
import { createContext, useContext } from 'react';
// types
import type { IBoxSize } from '@adam-sv/arc';
import type { IChartState } from './logic';
import type { ChartComponent, ChartSide } from './types';

export const ChartContext = createContext<IChartState | null>(null);
export const ChartProvider = ChartContext.Provider;
export const useChartContext = () => useContext(ChartContext);

export interface IChartComponentState {
  canResize?: boolean;
  component: ChartComponent;
  domPosition: Partial<Record<ChartSide, number>>;
  domSize: IBoxSize;
  svgSize: IBoxSize;
}
export const ChartComponentContext = createContext<IChartComponentState | null>(
  null
);
