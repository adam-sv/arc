import {
  ChartBase,
  ChartSide,
  ChartComponents,
  Panel,
  useChartState,
} from '@adam-sv/arc';
import './style.scss';
import type { JSX } from 'react';

const { Bottom, Content, Left, Right, Top } = ChartComponents;

// If this story is meant to be consumed as a test,
// we export some assumptions about what the test should do
export function ChartBaseResponsiveExample(): JSX.Element {
  const chartState = useChartState({
    axisSettings: {
      sizes: initialAxisSizes,
      minimumSizes: {
        top: 20,
        bottom: 20,
      },
      maximumSizes: {
        top: 100,
        bottom: 100,
      },
    },
    contentSizing,
    zoomSettings: initialZoomSettings,
  });
  return (
    <Panel className='ChartBaseExample' style={{ padding: 0 }}>
      <ChartBase chartState={chartState}>
        <Left label='Left Axis' showScrollBars />
        <Top label='Top Axis' />
        <Content />
        <Bottom label='Bottom Axis' showScrollBars />
        <Right label='Right Axis' />
      </ChartBase>
    </Panel>
  );
}

const initialAxisSizes: Record<ChartSide, number> = {
  left: 80,
  top: 80,
  right: 40,
  bottom: 40,
} as const;

const initialZoomSettings = {
  value: 2,
  min: 1,
  max: 10,
  axes: 'xy',
} as const;

const contentSizing = {
  mode: 'responsive',
  coordinateSpace: { width: 400, height: 400 },
  minContentHeight: 250,
} as const;

export const ChartBaseTestExpectations = {
  contentSizing,
  initialAxisSizes,
  initialZoomSettings,
};
