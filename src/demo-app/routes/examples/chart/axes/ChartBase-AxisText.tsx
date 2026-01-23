import {
  ChartBase,
  ChartComponents,
  Panel,
  Grid,
  TickAxis,
  useChartState,
} from '@adam-sv/arc';
import { scaleLinear } from 'd3';
import type { JSX } from 'react';
const { Bottom, Content, Left, Right, Top } = ChartComponents;

export function ChartBaseAxisText(): JSX.Element {
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
      mode: 'responsive',
      coordinateSpace: { width: 1600, height: 550 },
      minContentHeight: 400,
    },
    zoomSettings: {
      value: 1,
      min: 1,
      max: 10,
      axes: 'xy',
    },
  });

  const horizontalScale = scaleLinear()
    .domain([0, 100])
    .range([0, chartState.sizes.svg.xRange]);
  const verticalScale = scaleLinear()
    .domain([0, 100])
    .range([0, chartState.sizes.svg.yRange]);

  const numberTicks = 15;

  return (
    <Panel className='ChartBaseExample' style={{ padding: 0 }}>
      <ChartBase chartState={chartState}>
        <Left label='Left Axis' showScrollBars>
          <TickAxis scale={verticalScale} numberTicks={numberTicks} />
        </Left>
        <Top label='Top Axis'>
          <TickAxis scale={horizontalScale} numberTicks={numberTicks} />
        </Top>
        <Content showScrollBars={false}>
          <Grid
            yTicks={verticalScale.ticks(15).map(verticalScale)}
            xTicks={horizontalScale.ticks(15).map(horizontalScale)}
          />
        </Content>
        <Bottom label='Bottom Axis' showScrollBars>
          <TickAxis scale={horizontalScale} numberTicks={numberTicks} />
        </Bottom>
        <Right label='Right Axis'>
          <TickAxis scale={verticalScale} numberTicks={numberTicks} />
        </Right>
      </ChartBase>
    </Panel>
  );
}
