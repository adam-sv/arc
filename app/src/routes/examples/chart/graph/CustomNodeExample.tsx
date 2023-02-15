// dependencies
import React from 'react';
import { Graph, LogicalArcGraph, Panel } from '@adam-sv/arc';
import type { IGraphNodeActions, IProcessedGraphNode } from '@adam-sv/arc';
// styles
import './style.scss';

const graph = new LogicalArcGraph(
  [
    { id: '/D', label: 'Zero', parentId: null, position: { x: -100, y: 0 } },
    { id: '/R', label: 'One', parentId: null, position: { x: 250, y: -100 } },
    { id: 2, label: 'Two', parentId: null, position: { x: 500, y: 0 } },
    { id: 3, label: 'Three', parentId: null, position: { x: 750, y: 100 } },
    { id: 5, label: 'Five', parentId: null, position: { x: 750, y: 220 } },
    { id: 6, label: 'Six', parentId: null, position: { x: 250, y: 420 } },
    // { id: 7, label: 'Seven', parentId: null, position: { x: 5000, y: 0 } },
    // { id: 8, label: '8', parentId: null, position: { x: 0, y: 5000 } },
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

export function CustomNodeExample(): JSX.Element {
  return (
    <Panel style={{ padding: 'unset' }}>
      <Graph
        customHTMLNodeContent={renderNode}
        edgeMode='smart'
        graph={graph}
        gridSize={10}
        nodeActions={nodeActions}
        style={{ minHeight: 300 }}
      />
    </Panel>
  );
}

function renderNode(node: IProcessedGraphNode) {
  return (
    <div className='SmartGraph-Faceplate'>
      <div>
        <div>Name:</div>
        <div> {node.label}</div>
      </div>
      <div>
        <div>ID:</div>
        <div> {node.id}</div>
      </div>
      <div>
        <div># Children:</div>
        <div> {node.children.length}</div>
      </div>
      <div>
        <div>Parent ID:</div>
        <div> {node.parentId || '-'}</div>
      </div>
      <div>
        <div>Position:</div>
        <div> {JSON.stringify(node.position) || '-'}</div>
      </div>
      <div>
        <div>Size:</div>
        <div> {JSON.stringify(node.size) || '-'}</div>
      </div>
    </div>
  );
}
