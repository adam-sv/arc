// dependencies
import { useState, type JSX } from 'react';
import { Dropdown, LogicalArcGraph, Panel, Surface } from '@adam-sv/arc';
// types
import type { IEdgeRouterMode } from '@adam-sv/arc';

const graph = new LogicalArcGraph<never, never, string | number>(
  [
    { id: '/D', label: 'Zero', position: { x: 0, y: 0 } },
    { id: '/R', label: 'One', position: { x: 250, y: 100 } },
    { id: 2, label: 'Two', position: { x: 500, y: 0 } },
    { id: 3, label: 'Three', position: { x: 750, y: 100 } },
    { id: 5, label: 'Five', position: { x: 750, y: 220 } },
    { id: 6, label: 'Six', position: { x: 250, y: 420 } },
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

export function SmartEdgeExample(): JSX.Element {
  const [edgeMode, setEdgeMode] = useState<IEdgeRouterMode>('smart');

  // 1.2.0 TODO: layouts for EdgeRouter outside of Graph
  console.info(
    'EdgeRouter requires the graph to have sizes and stuff, story not implemented - sorry',
    graph
  );

  return (
    <div style={{ minHeight: 300 }}>
      <Panel>
        <Surface>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            EdgeRouter simply draws the edges of a LogicalArcGraph as SVG
            elements. The smart computation is free, but its scaling properties
            are not well known right now. Looks best integrated into another
            chart!
          </div>
          <Dropdown<IEdgeRouterMode>
            label='Edge Mode'
            items={[
              { label: 'Smart', value: 'smart' },
              { label: 'Straight', value: 'straight' },
              // { label: 'Straight - Corners', value: 'straight-corners' },
              // {
              //   label: 'Straight - Midpoints & Corners',
              //   value: 'straight-midpoints-corners',
              // },
            ]}
            onChange={(item) => {
              setEdgeMode(item.value);
            }}
            value={edgeMode}
          />
          <div>STORY UNDER CONSTRUCTION; please come back soon :)</div>
          {/* {useMemo(() => <EdgeRouter
            coordinateSpace={graph.boundingRect}
            edgeMode={edgeMode}
            edgeSpacing={4}
            graph={graph}
            style={{ maxWidth: '100%' }}
          />, [graph, graph.boundingRect, edgeMode])} */}
        </Surface>
      </Panel>
    </div>
  );
}
