import { useState, type JSX } from 'react';
import { Dropdown, Graph, LogicalArcGraph, Panel } from '@adam-sv/arc';

const graph = new LogicalArcGraph<never, never, string | number>(
  [
    { id: '/D', label: 'Zero', position: { x: 50, y: 50 } },
    { id: '/R', label: 'One', position: { x: 250, y: 100 } },
    { id: 2, label: 'Two', position: { x: 500, y: 0 } },
    { id: 3, label: 'Three', position: { x: 750, y: 100 } },
    { id: 5, label: 'Five', position: { x: 750, y: 220 } },
    { id: 6, label: 'Six', position: { x: 250, y: 420 } },
    // TODO: depending on the "strategy" nodes may or may not be shown. I should write tests about that
    // {
    //   id: 7,
    //   label:
    //     'Never displays - no position provided. Certain layouts will "solve" the position but not the default one',
    //
    // },
  ],
  [
    { from: '/D', to: '/R', className: 'danger' },
    { from: '/D', to: 6 },
    { from: '/D', to: 5 },
    { from: '/R', to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 5 },
    { from: 5, to: 6 },
  ]
);

// We're using this example to figure out a Graph "scale" properties
export function BackgroundOptions(): JSX.Element {
  const [gridStyle, setGridStyle] = useState<'grid' | 'dot-grid' | 'none'>();

  return (
    <Panel className='ChartBaseExample' style={{ gap: 10, padding: 0 }}>
      <Dropdown
        items={[
          { label: 'Default', value: 'default' },
          { label: 'Dots', value: 'dots' },
          { label: 'none', value: 'none' },
        ]}
        onChange={({ value }) => {
          setGridStyle(value as 'none');
        }}
        style={{ margin: '8px auto auto', width: 'fit-content' }}
        value={gridStyle}
      />
      <Graph
        graph={graph}
        edgeMode={'straight'}
        minHeight={200}
        gridStyle={gridStyle}
        layoutOptions={{ padding: 10 }}
        invertDragControls
      />
    </Panel>
  );
}
