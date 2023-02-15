import { Title } from '@adam-sv/arc';
import { Gantt, Panel, IGanttDatum } from '@adam-sv/arc';

function generateData(entries: number): IGanttDatum[] {
  const data = [];
  const now = Date.now();
  const fixedFactor = 2 * 60 * 60 * 1000;
  const maxPastFixedFactor = 5 * 60 * 60 * 1000;

  for (let i = 0; i < entries; i++) {
    data.push({
      id: i,
      label: `Row ${i}`,
      start: new Date(now + i * fixedFactor),
      finish: new Date(
        now + i * fixedFactor + (Math.random() + 0.05) * maxPastFixedFactor
      ),
    });
  }
  return data;
}

export default (
  <Panel className='large'>
    <Title>Smart Edges</Title>

    <Gantt
      data={generateData(10)}
      edges={[
        { from: 0, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 5, to: 9 },
      ]}
      edgeMode='smart'
      barOpts={{
        height: 12,
        padding: 10,
      }}
      xOpts={{
        nice: true,
        label: 'X Label',
        tickFormat: (dateMs: number) => new Date(dateMs).toLocaleTimeString(),
        tickCount: 8,
      }}
      yOpts={{}}
      disableMouseTracking
    />
    <Title>Straight Edges</Title>
    <Gantt
      data={generateData(10)}
      edges={[
        { from: 0, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 5, to: 9 },
      ]}
      edgeMode='straight'
      barOpts={{
        height: 12,
        padding: 10,
      }}
      xOpts={{
        nice: true,
        label: 'X Label',
        tickFormat: (dateMs: number) => new Date(dateMs).toLocaleTimeString(),
        tickCount: 8,
      }}
      yOpts={{}}
      disableMouseTracking
    />
  </Panel>
);
