// dependencies
import { createContext, CSSProperties } from 'react';
// self
import { Content, Left, Right, Top, Bottom } from './components';
import { useChartState } from './logic';
import './style.scss';
// internals
import { cn } from '@adam-sv/arc';
// types
import type { IChartState } from './logic';
import type { IChartBaseProps } from './types';
export type { IChartState, IChartBaseProps };

export function ChartBase(props: IChartBaseProps) {
  const { children, className, id, style } = props;
  const chartState = useChartState(props);

  console.log('ChartBase rendering', { props, chartState });
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

export const ChartContext = createContext<IChartState | null>(null);
export const ChartComponents = {
  Content,
  Left,
  Top,
  Right,
  Bottom,
};
