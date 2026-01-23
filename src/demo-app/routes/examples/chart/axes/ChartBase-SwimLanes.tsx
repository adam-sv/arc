import {
  ChartBase,
  ChartComponents,
  Grid,
  Panel,
  SwimLanes,
  useChartState,
} from '@adam-sv/arc';
import { scaleBand } from 'd3';
import type { JSX } from 'react';
const { Bottom, Content, Right } = ChartComponents;

export function ChartBaseAxisSwimLanes(): JSX.Element {
  const bandDomain = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const chartState = useChartState({
    axisSettings: {
      sizes: {
        left: 80,
        top: 80,
        right: 80,
        bottom: 80,
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
      coordinateSpace: { width: 1200, height: 400 },
      minContentHeight: 200,
    },
    zoomSettings: {
      value: 1,
      min: 1,
      max: 10,
      axes: 'xy',
    },
  });

  const { xRange, yRange } = chartState.sizes.svg;

  const horizontalScale = scaleBand().domain(bandDomain).range([0, xRange]);
  const verticalScale = scaleBand().domain(bandDomain).range([0, yRange]);

  return (
    <Panel className='ChartBaseExample' style={{ padding: 0 }}>
      <ChartBase chartState={chartState}>
        <Content>
          <Grid
            xTicks={horizontalScale
              .domain()
              .map((band) => horizontalScale(band) ?? 0)}
            yTicks={verticalScale
              .domain()
              .map((band) => verticalScale(band) ?? 0)}
          />
        </Content>
        <Bottom label='Bottom Axis' showScrollBars>
          <SwimLanes scale={horizontalScale} />
        </Bottom>
        <Right label='Right Axis' showScrollBars>
          <SwimLanes scale={verticalScale} />
        </Right>
      </ChartBase>
    </Panel>
  );
}
