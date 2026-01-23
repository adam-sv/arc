import {
  ChartBase,
  ChartComponents,
  Panel,
  Title,
  useChartState,
} from '@adam-sv/arc';
import './style.scss';
import type { JSX } from 'react';

const { Bottom, Content, Left, Right, Top } = ChartComponents;

export function ChartBaseFitsWidthExample(): JSX.Element {
  const chartState = useChartState({
    axisSettings: {
      sizes: {
        left: 80,
        top: 80,
        right: 40,
        bottom: 40,
      },
      minimumSizes: {
        top: 20,
        bottom: 20,
      },
      maximumSizes: {
        top: 100,
        bottom: 100,
      },
    },
    contentSizing: {
      mode: 'fits-width',
      controlledDimensionSize: 4000,
      minContentHeight: 120,
    },
    zoomSettings: {
      value: 2,
      min: 1,
      max: 10,
      axes: 'x',
    },
  });

  return (
    <Panel className='ChartBaseExample' style={{ padding: 0 }}>
      <ChartBase chartState={chartState}>
        <Left
          label={<Title style={{ margin: 0 }}>Left Axis</Title>}
          showScrollBars
        ></Left>
        <Top label='Top Axis' />
        <Content showScrollBars={false} />
        <Bottom label='Bottom Axis' showScrollBars />
        <Right label='Right Axis' />
      </ChartBase>
    </Panel>
  );
}
