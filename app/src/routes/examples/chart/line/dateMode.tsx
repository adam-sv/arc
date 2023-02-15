import { LineChart, Panel } from '@adam-sv/arc';

const data = [
  { time: new Date().getTime(), value: 20 },
  { time: new Date().getTime() + 6.312e10, value: 10 },
];

const data1 = [
  { time: new Date().getTime(), value: 15 },
  { time: new Date().getTime() + 6.312e10, value: 5 },
];

export const DateMode = (): JSX.Element => (
  <Panel style={{ padding: 'unset' }}>
    <LineChart
      minHeight={500}
      data={{ data, data1 }}
      lineOpts={{
        onMouseOut: (event, datum) => {
          console.info('Mouse out!', { event, datum });
        },
        onMouseOver: (event, datum) => {
          console.info('Mouse Over!', { event, datum });
        },
        onClick: (event, datum) => {
          console.info('Clicked!', { event, datum });
        },
      }}
      // disableMouseTracking
      dateMode
      minXValue={new Date().getTime()}
      maxXValue={new Date().getTime() + 6.312e10 + 1000000000}
      displayXValueInMouseOver
      mouseOverTargetElement={
        document.getElementById('@adam-sv/arc--docs-app') ?? undefined
      }
      // xAxis={{ tickCount: 2 }}
    />
  </Panel>
);
