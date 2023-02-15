// dependencies
import React, { useState } from 'react';
import {
  Dropdown,
  EdgeRouter,
  LogicalArcGraph,
  Panel,
  Surface,
} from '@adam-sv/arc';
// types
import type { IEdgeRouterMode } from '@adam-sv/arc';

const graph = new LogicalArcGraph(
  [
    { id: '/D', label: 'Zero', parentId: null, position: { x: 0, y: 0 } },
    { id: '/R', label: 'One', parentId: null, position: { x: 250, y: 100 } },
    { id: 2, label: 'Two', parentId: null, position: { x: 500, y: 0 } },
    { id: 3, label: 'Three', parentId: null, position: { x: 750, y: 100 } },
    { id: 5, label: 'Five', parentId: null, position: { x: 750, y: 220 } },
    { id: 6, label: 'Six', parentId: null, position: { x: 250, y: 420 } },
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
          <EdgeRouter
            containerDOMRect={graph.boundingRect}
            graph={graph}
            edgeMode={edgeMode}
            style={{ maxWidth: '100%' }}
          />
        </Surface>
      </Panel>
    </div>
  );
}
