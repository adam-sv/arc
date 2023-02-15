import { ChartBase, ChartComponents, Panel, Title } from '@adam-sv/arc';
const { Bottom, Content, Left, Right, Top } = ChartComponents;

import './style.scss';

export function ChartBaseExample(): JSX.Element {
  return (
    <Panel className='ChartBaseExample' style={{ padding: 0 }}>
      <ChartBase
        axisSettings={{
          sizes: {
            left: 80,
            top: 80,
            right: 40,
            bottom: 40,
          },
        }}
        contentSizing={{
          mode: 'responsive',
          coordinateSpace: { width: 400, height: 400 },
          minContentHeight: 120,
        }}
        zoomSettings={{
          value: 2,
          min: 1,
          max: 10,
          axes: 'xy',
        }}
      >
        <Left
          label={<Title style={{ margin: 0 }}>Left Axis</Title>}
          showScrollBars
        ></Left>
        <Top label='Top Axis'></Top>
        <Content showScrollBars={false}>
          <g>
            <text>Hello World</text>
          </g>
        </Content>
        <Bottom
          label={<div style={{ marginBottom: 10 }}>Bottom Axis</div>}
          showScrollBars
        ></Bottom>
        <Right
          label={<div style={{ marginBottom: 10 }}>Right Axis</div>}
        ></Right>
      </ChartBase>
    </Panel>
  );
}
