import { useState, type JSX } from 'react';
import {
  Dropdown,
  Graph,
  LogicalArcGraph,
  Panel,
  IEdgeRouterMode,
  useScrollBridge,
  useZoomBridge,
} from '@adam-sv/arc';

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
export function ChartBaseGraph(): JSX.Element {
  const [edgeMode, setEdgeMode] = useState<IEdgeRouterMode>('straight');
  const scrollControls = useScrollBridge();
  const zoomControls = useZoomBridge();

  return (
    <Panel className='ChartBaseExample' style={{ gap: 10, padding: 0 }}>
      <Dropdown<IEdgeRouterMode>
        items={[
          { label: 'Straight', value: 'straight' },
          { label: 'Straight - Corners', value: 'straight-corners' },
          {
            label: 'Straight - Midpoints & Corners',
            value: 'straight-midpoints-corners',
          },
          { label: 'Smart', value: 'smart' },
        ]}
        info="Edge routing options. I think 'Straight' is the same as 'Straight - Midpoints & Corners"
        onChange={({ value }) => {
          setEdgeMode(value);
        }}
        style={{ margin: '8px auto auto', width: 'fit-content' }}
        value={edgeMode}
      />
      <Graph
        graph={graph}
        edgeMode={edgeMode}
        minHeight={200}
        layoutOptions={{ padding: 10 }}
        scrollControls={scrollControls}
        zoomControls={zoomControls}
      />
      <Graph
        graph={graph}
        edgeMode={edgeMode}
        gridSize={20}
        minHeight={400}
        layoutOptions={{ padding: 80 }}
        scrollControls={scrollControls}
        zoomControls={zoomControls}
        forceEdgesOnTop
      />
    </Panel>
  );
}
