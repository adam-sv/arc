import { useState, type JSX } from 'react';
import {
  Dropdown,
  Graph,
  LogicalArcGraph,
  Panel,
  useForceRender,
} from '@adam-sv/arc';
import type {
  IEdgeRouterMode,
  IGraphEdge,
  IProcessedGraphNode,
} from '@adam-sv/arc';
import { v4 as uuidv4 } from 'uuid';

let graph = new LogicalArcGraph<never, never, string>(
  [
    { id: '0', label: 'Zero', position: { x: 0, y: 50 } },
    { id: '1', label: 'One', position: { x: 250, y: 120 } },
    {
      id: '11',
      label: 'One - One',
      parentId: '1',
      position: { x: 10, y: 10 },
    },
    {
      id: '12',
      label: 'One - Two',
      parentId: '1',
      position: { x: 250, y: 60 },
    },
    {
      id: '121',
      label: 'One - Two - One',
      parentId: '12',
      position: { x: 0, y: 0 },
    },
    { id: '2', label: 'Two', position: { x: 500, y: 0 } },
    { id: '3', label: 'Three', position: { x: 810, y: 100 } },
    { id: '5', label: 'Five', position: { x: 810, y: 220 } },
    { id: '6', label: 'Six', position: { x: 250, y: 420 } },
  ],
  [
    // top-level edges
    { from: '0', to: '1', className: 'danger' },
    { from: '0', to: '6' },
    { from: '0', to: '5' },
    { from: '1', to: '2' },
    { from: '2', to: '3' },
    { from: '3', to: '5' },
    { from: '5', to: '6' },
    // top-level to nested
    { from: '0', to: '11' },
    { from: '12', to: '3' },
    { from: '0', to: '121' },
    { from: '6', to: '121' },
    // nested to nested
    { from: '11', to: '12' },
  ]
);
function addEdge(edge: IGraphEdge<never, string>) {
  edge.id = edge.id ?? uuidv4();
  graph = new LogicalArcGraph<never, never, string>(
    graph.nodes,
    [edge].concat(graph.edges)
  );
}

// We're using this example to figure out a Graph "scale" properties
export function GraphNestedNodes(): JSX.Element {
  const [edgeMode, setEdgeMode] = useState<IEdgeRouterMode>('smart');
  const [debug, setDebug] = useState(false);
  const forceRender = useForceRender();

  const criteriaForFilterCanConnect =
    'the node has a parent node OR has no children';
  const filterCanConnect = (node: IProcessedGraphNode<never, string>) =>
    Boolean(node.parentId) || node.children.length < 1;
  return (
    <Panel className='ChartBaseExample' style={{ gap: 10, padding: 0 }}>
      <div className='controls-row'>
        <div style={{ maxWidth: 300 }}>
          This graph allows creation of new edges! Mouseover certain nodes to
          start a connection. The criteria for {'"connectability"'} is:{' '}
          {criteriaForFilterCanConnect}.
        </div>
        <Dropdown<IEdgeRouterMode>
          label='Connection Style'
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
          value={edgeMode}
        />
        <Dropdown
          info='DEBUG mode shows the objects EdgeRouter sees, so you can make sure your Graph matches'
          label='Show DEBUG nodes'
          items={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]}
          onChange={(item) => {
            setDebug(item.value);
          }}
          value={debug}
        />
      </div>
      <Graph
        graph={graph}
        mode='hierarchical'
        edgeMode={edgeMode}
        debug={debug}
        minHeight={500}
        layoutOptions={{
          childPadding: 10,
          defaultNodeSize: { width: 120, height: 60 },
        }}
        edgeCreation={{
          onEdgeCreated: (firstId: string, secondId: string) => {
            addEdge({ from: firstId, to: secondId });
            forceRender();
          },
          canSpawnConnections: filterCanConnect,
          getValidConnectionTargets: () =>
            new Set(graph.nodes.filter(filterCanConnect).map((n) => n.id)),
          getConnectionStartPosition: ({ children }) => ({
            position: children.length ? 'right' : 'center',
          }),
        }}
      />
    </Panel>
  );
}
