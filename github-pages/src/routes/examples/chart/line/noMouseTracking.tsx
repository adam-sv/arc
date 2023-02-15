import { LineChart, Panel } from '@adam-sv/arc';

export const data = [
  {
    time: 0,
    value: 0,
  },
  {
    time: 0,
    value: 5,
  },
  {
    time: 15,
    value: 5,
  },
  {
    time: 15,
    value: 3,
  },
  {
    time: 30,
    value: 3,
  },
  {
    time: 30,
    value: 2,
  },
  {
    time: 50,
    value: 2,
  },
  {
    time: 50,
    value: 3,
  },
  {
    time: 55,
    value: 3,
  },
  {
    time: 55,
    value: 4,
  },
  {
    time: 80,
    value: 4,
  },
  {
    time: 80,
    value: 3,
  },
  {
    time: 85,
    value: 3,
  },
  {
    time: 85,
    value: 2,
  },
  {
    time: 100,
    value: 2,
  },
  {
    time: 100,
    value: 0,
  },
  {
    time: 100,
    value: 0,
  },
  {
    time: 200,
    value: 0,
  },
];

export const data1 = [
  {
    time: 40,
    value: 1,
  },
  {
    time: 45,
    value: 2,
  },
  {
    time: 60,
    value: 2.3,
  },
  {
    time: 100,
    value: 3,
  },
  {
    time: 160,
    value: 0.5,
  },
  {
    time: 200,
    value: 6,
  },
  { time: 0, value: 0 },
];

export default (
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
      // xAxis={{ tickCount: 2 }}
    />
  </Panel>
);
