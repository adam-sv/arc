import { useEffect, useState, type JSX } from 'react';
import { Graph, LogicalArcGraph, Panel, Draggable } from '@adam-sv/arc';
import type {
  IEdgeRouterMode,
  IGraphNode,
  IGraphEdge,
  GraphNodeId,
} from '@adam-sv/arc';
import { v4 as uuidv4 } from 'uuid';

// We're using this example to figure out a Graph "scale" properties
export function DragAndDropChart(): JSX.Element {
  const graphPadding = 10;
  const [edgeMode] = useState<IEdgeRouterMode>('straight');

  const [nodes, setNodes] = useState<IGraphNode<never, GraphNodeId>[]>([
    { id: '/D', label: 'Zero', position: { x: 0, y: 0 } },
    { id: '/R', label: 'One', position: { x: 250, y: 100 } },
    { id: 2, label: 'Two', position: { x: 500, y: 0 } },
    { id: 3, label: 'Three', position: { x: 750, y: 100 } },
    { id: 5, label: 'Five', position: { x: 750, y: 220 } },
    { id: 6, label: 'Six', position: { x: 250, y: 420 } },
  ]);
  const [edges] = useState<IGraphEdge<never, GraphNodeId>[]>([
    { from: '/D', to: '/R', className: 'danger' },
    { from: '/D', to: 6 },
    { from: '/D', to: 5 },
    { from: '/R', to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 5 },
    { from: 5, to: 6 },
  ]);

  const [graph, setGraph] =
    useState<LogicalArcGraph<never, never, GraphNodeId>>();

  useEffect(() => {
    setGraph(new LogicalArcGraph(nodes, edges));
  }, [nodes, edges]);

  return (
    <Panel className='ChartBaseExample' style={{ gap: 10, padding: 0 }}>
      <div>
        <Draggable
          data={JSON.stringify({
            id: uuidv4(),

            label: 'Drag Me!',
          })}
          style={{
            width: 180,
            height: 80,
            border: '1px solid var(--border-shade)',
            textAlign: 'center',
            padding: '30px 0',
          }}
        >
          Drag ME!
        </Draggable>
      </div>
      {graph && (
        <Graph
          graph={graph}
          edgeMode={edgeMode}
          minHeight={200}
          layoutOptions={{ padding: graphPadding }}
          zoomControls={{ value: 1 }}
          onDrop={(ev, position, data) => {
            const { id, parentId, label } = JSON.parse(
              data
            ) as unknown as Record<string, string>;

            setNodes([...nodes, { id, parentId, label, position }]);
          }}
        />
      )}
    </Panel>
  );
}
