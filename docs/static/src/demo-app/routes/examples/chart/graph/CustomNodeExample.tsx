// dependencies
import { Graph, LogicalArcGraph, Panel } from '@adam-sv/arc';
import type { GraphNodeId, IProcessedGraphNode } from '@adam-sv/arc';
import type { JSX } from 'react';
// import type { IGraphNodeActions, IProcessedGraphNode } from '@adam-sv/arc';

const graph = new LogicalArcGraph<never, never, GraphNodeId>(
  [
    { id: '/D', label: 'Zero', position: { x: -100, y: 0 } },
    { id: '/R', label: 'One', position: { x: 250, y: -100 } },
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

// const nodeActions: IGraphNodeActions = {
//   onClick: (e, node) => console.info('onClick', node),
//   onDoubleClick: (e, node) => console.info('onDoubleClick', node),
//   onContextMenu: (e, node) => console.info('onContextMenu', node),
//   onMove: (e, node, delta) => console.info('onMove', node, delta),
// };

export function GraphCustomNodeContent(): JSX.Element {
  return (
    <Panel style={{ padding: 'unset' }}>
      <Graph
        graph={graph}
        htmlNodeContentRenderer={renderNode}
        edgeMode='smart'
        minHeight={300}
        // nodeActions={nodeActions}
      />
    </Panel>
  );
}

function renderNode<NodeType, NodeIdType extends GraphNodeId>({
  node,
}: {
  node: IProcessedGraphNode<NodeType, NodeIdType>;
}) {
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
