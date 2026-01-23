// dependencies
import { CSSProperties } from 'react';
// self
import { ChartContext } from '.';
import './style.scss';
// internals
import { cn } from '@adam-sv/arc';
// types
import type { IChartState } from './logic';
import type { IChartBaseProps, ChartComponent, ChartSide } from './types';
export type { ChartComponent, ChartSide, IChartBaseProps, IChartState };

export function ChartBase({
  children,
  chartState,
  className,
  id,
  style,
}: IChartBaseProps) {
  return (
    <ChartContext.Provider value={chartState}>
      <div
        className={cn('ArcChart', className)}
        id={id}
        ref={chartState.refs.container}
        style={
          {
            ...style,
            ...chartState.styles.container,
            '--ResizeBar-thickness': '4px',
          } as CSSProperties
        }
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
}
