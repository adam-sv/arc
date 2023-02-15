// dependencies
import React from 'react';
import { Graph, LogicalArcGraph, Panel, Title } from '@adam-sv/arc';
import type { IGraphNodeActions } from '@adam-sv/arc';
// styles
import './style.scss';

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

const nodeActions: IGraphNodeActions = {
  onClick: (e, node) => console.info('onClick', node),
  onDoubleClick: (e, node) => console.info('onDoubleClick', node),
  onContextMenu: (e, node) => console.info('onContextMenu', node),
  onMove: (e, node, delta) => console.info('onMove', node, delta),
};

export function GraphSelectionExample(): JSX.Element {
  return (
    <Panel style={{ padding: 'unset' }}>
      <div>
        <Title>How To Use Selection</Title>
        <div>
          <ul>
            <header>Starting a selection</header>
            <li>Click on a node to select it.</li>
            <li>
              Click on an empty space in the Graph and drag over nodes to create
              a selection box and select multiple nodes.
            </li>
            <br />
            <header>Clearing a Selection</header>
            <li>
              Clicking on a new node will clear the previous selection and
              select the new node
            </li>
            <li>Clicking on the graph will clear the selection</li>
            <br />
            <header>Continuing a selection</header>
            <li>
              Hold shift/cmd/option while click on a node or starting a new
              selection box and the selections will compound.
            </li>
          </ul>
        </div>
      </div>
      <Graph
        edgeMode='smart'
        graph={graph}
        gridSize={10}
        nodeActions={nodeActions}
        style={{ minHeight: 300 }}
        selectionActions={{
          onSelectionUpdated: (e, selection) => {
            console.info('onSelectionUpdated', { selection });
          },
          onSelectionCancelled: (e, lastSelection) => {
            console.info('onSelectionCancelled', { lastSelection });
          },
        }}
        gridFillsAvailableSpace={true}
        zoomProperties={{ maxZoom: 2, minZoom: 0, disableZoomControls: false }}
      />
    </Panel>
  );
}
