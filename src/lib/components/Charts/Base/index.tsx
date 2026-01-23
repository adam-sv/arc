// self
import { ChartContext, ChartComponentContext } from './Providers';
import { ChartBase } from './Base';
import { Content, Left, Right, Top, Bottom } from './components';
import { ChartSyncedScrollBar } from './ChartSyncedScrollBar';
import { useChartState, useScrollBridge, useZoomBridge } from './logic';
import { getClipPathPolygon } from './getClipPathPolygon';
import type {
  ClipTypes,
  ClipType,
  ClipPlace,
  IChartAxisClipPathProps,
} from './getClipPathPolygon';
import { ResizeBar } from './ResizeBar';
import './style.scss';
// types
import type { IChartState, IChartAxisSizing } from './logic';
import type {
  IChartBaseProps,
  IChartConfiguration,
  IChartContentSizeProps,
  IChartResponsiveSizing,
  IChartFitsOneDimensionSizing,
  IChartComponentProps,
  IChartSideProps,
  ChartComponent,
  ChartSide,
} from './types';
import type { IChartSyncedScrollBarProps } from './ChartSyncedScrollBar';
import type { IResizeBarProps } from './ResizeBar';

export type {
  ChartComponent,
  ChartSide,
  IChartBaseProps,
  IChartConfiguration,
  IChartContentSizeProps,
  IChartResponsiveSizing,
  IChartFitsOneDimensionSizing,
  IChartComponentProps,
  IChartSideProps,
  IChartState,
  IChartSyncedScrollBarProps,
  IResizeBarProps,
  IChartAxisSizing,
  ClipTypes,
  ClipType,
  ClipPlace,
  IChartAxisClipPathProps,
};

export const ChartComponents = {
  Content,
  Left,
  Top,
  Right,
  Bottom,
};

export {
  ChartBase,
  ChartSyncedScrollBar,
  ChartContext,
  ChartComponentContext,
  ResizeBar,
  useChartState,
  useScrollBridge,
  useZoomBridge,
  getClipPathPolygon,
};
