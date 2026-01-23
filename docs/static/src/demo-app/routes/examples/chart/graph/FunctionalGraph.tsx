import { useCallback, useMemo, useState, type JSX } from 'react';
import {
  Dropdown,
  Graph,
  LogicalArcGraph,
  NumberSlider,
  Panel,
  GraphUtils,
} from '@adam-sv/arc';
import type {
  IEdgeRouterMode,
  IGraphEdge,
  GraphNodeId,
  IProcessedGraphNode,
  IGraphNode,
} from '@adam-sv/arc';
import { IComputedGraphLayout } from 'src/lib/components/Charts/Graph/layouts';

// We're using this example to figure out a Graph "scale" properties
export function GraphFunctionalNodes(): JSX.Element {
  const [nodes, setNodes] = useState<IGraphNode<never, string>[]>([
    { id: '0', label: 'Inputs', position: { x: 0, y: 50 } },
    { id: '0-o1', label: 'Input - One', parentId: '0', role: 'output' },
    { id: '0-o2', label: 'Input - Two', parentId: '0', role: 'output' },
    {
      id: '1',
      label: 'Function One',
      position: { x: 350, y: 120 },
    },
    { id: '1-i1', label: 'One - In', parentId: '1', role: 'input' },
    { id: '1-i2', label: 'Two - In', parentId: '1', role: 'input' },
    { id: '1-o1', label: 'One - Out', parentId: '1', role: 'output' },
    {
      id: '2',
      label: 'Function Two',
      position: { x: 750, y: 0 },
    },
    { id: '2-i1', label: 'Two - In', parentId: '2', role: 'input' },
    { id: '2-o1', label: 'Two - Out', parentId: '2', role: 'output' },
    {
      id: '3',
      label: 'Function Three',
      position: { x: 1150, y: 230 },
    },
    { id: '3-i1', label: 'Three - In', parentId: '3', role: 'input' },
    { id: '3-o1', label: 'Three - Out', parentId: '3', role: 'output' },
    {
      id: '4',
      label: 'Storage',
      position: { x: 1600, y: 240 },
    },
    {
      id: '4-i1',
      label: 'Result - Storage',
      parentId: '4',
      role: 'input',
      size: { width: 120, height: 0 },
    },
    { id: '4-i2', label: 'Result - JSON', parentId: '4', role: 'input' },
    { id: '4-i3', label: 'Result - Options', parentId: '4', role: 'input' },
  ]);
  const [edges, setEdges] = useState<IGraphEdge<never, string>[]>([
    { from: '0-o1', to: '1-i1' },
    { from: '0-o2', to: '1-i2' },
    { from: '1-o1', to: '2-i1' },
    { from: '1-o1', to: '4-i3' },
    { from: '2-o1', to: '3-i1' },
    { from: '3-o1', to: '4-i1' },
  ]);
  const graph = useMemo(
    () => new LogicalArcGraph<never, never, string>(nodes, edges),
    [nodes, edges]
  );

  const addEdge = useCallback((from: string, to: string) => {
    setEdges((curr) => [...curr, { from, to }]);
  }, []);

  const [edgeMode, setEdgeMode] = useState<IEdgeRouterMode>('smart');
  const [debug, setDebug] = useState(false);
  const [layoutScalingFactor, setLayoutScalingFactor] = useState(1);

  const layoutOptions = useMemo(
    () => ({
      ...GraphUtils.defaultLayoutOptions,
      padding: 30,
      childPadding: 10,
      inputOutputHeight: 20,
      inputOutputWidth: 'auto' as const,
      connectionTargetSize: 30,
    }),
    []
  );

  // Here, the goal is to update the INodePlacement "position" for each top level node (that you want to move, at least)
  // will eventually want to bind the child nodes layout to the parent nodes layout
  // TODO: this layout manipulation is lazy since child nodes arent moved according to their parents
  // but rather to themselves. This causes distortion in the example for now.
  const myLayoutAlgorithm = useCallback(
    <NodeType, EdgeType, NodeIdType extends GraphNodeId>(
      graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>,
      computedLayout: IComputedGraphLayout<NodeType, NodeIdType>
    ): IComputedGraphLayout<NodeType, NodeIdType>['placements'] => {
      const { placements } = computedLayout;
      // you wrote it already - use it
      graph.nodes.forEach((node) => {
        const placement = placements.get(node.id);
        if (!placement) return; // I guess you should check here if this is missing for a top level node?
        placement.absolutePosition = {
          x: placement.absolutePosition.x * layoutScalingFactor,
          y: placement.absolutePosition.y * layoutScalingFactor,
        };
        placement.relativePosition = {
          x: placement.relativePosition.x * layoutScalingFactor,
          y: placement.relativePosition.y * layoutScalingFactor,
        };
        // figure out whree it goes based on size and other nodes
      });

      return placements;
    },
    [layoutScalingFactor]
  );

  const customLayout: IComputedGraphLayout<never, string> = useMemo(() => {
    const computedLayout = GraphUtils.getRenderedLayout<never, never, string>(
      graph,
      'functional',
      layoutOptions
    );

    // You want to compute custom positions USING the sizes that the graph will use
    const finalPlacements = myLayoutAlgorithm(graph, computedLayout);
    // TODO: compute new bounding rect of topLevelNodes
    const finalBoundingRect = GraphUtils.computeBoundingRect(
      computedLayout.topLevelNodes
        .map((node) => finalPlacements.get(node.id))
        .filter(filterOutFalsyValues)
    );

    return {
      boundingRect: finalBoundingRect,
      placements: finalPlacements,
      topLevelNodes: computedLayout.topLevelNodes,
    };
  }, [graph, layoutOptions, myLayoutAlgorithm]);

  return (
    <Panel className='ChartBaseExample' style={{ gap: 10, padding: 0 }}>
      <div className='controls-row'>
        <div style={{ maxWidth: 300 }}>
          This graph allows creation of new edges! Mouseover inputs / outputs to
          start a connection.
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
        <NumberSlider
          value={layoutScalingFactor}
          onChange={(newVal) => {
            setLayoutScalingFactor(newVal);
          }}
          title='Layout Spacing'
          max={3}
          min={0.2}
          interval={0.01}
        />
      </div>
      <Graph<never, never, string>
        // These 3 props control the graph layout
        graph={graph}
        mode='functional'
        layoutOptions={layoutOptions}
        renderedLayout={customLayout}
        // edges & edge interaction
        edgeMode={edgeMode}
        edgeCreation={{
          onEdgeCreated: (firstNodeId: string, secondNodeId: string) => {
            addEdge(firstNodeId, secondNodeId);
          },
          canSpawnConnections: (node: IProcessedGraphNode<never, string>) =>
            Boolean(node.role && ['input', 'output'].includes(node.role)),
          getValidConnectionTargets: (
            node: IProcessedGraphNode<never, string>
          ) => {
            const { parentId, role } = node;
            // this isn't possible - we should error?
            if (!role) {
              console.error(
                'ADAMWarning: how did we see no role? Story: "chart/graph/FunctionalGraph"'
              );
              return new Set();
            }
            return new Set(
              graph.nodes
                .filter(
                  (otherNode) =>
                    otherNode.role &&
                    otherNode.role !== role &&
                    otherNode.parentId !== parentId
                )
                .map((n) => n.id)
            );
          },
        }}
        // node interaction
        nodeActions={{
          onMove({ id }, delta) {
            if (Math.abs(delta.x) < 5 && Math.abs(delta.y) < 5) return;

            setNodes((lastNodes) => {
              const node = lastNodes.find((n) => n.id === id);
              if (!node) return lastNodes;

              let index = -1;
              for (let i = 0; i < lastNodes.length; i++)
                if (lastNodes[i].id === node.id) index = i;

              if (index >= 0) {
                return [
                  ...lastNodes.slice(0, index),
                  {
                    ...node,
                    position: {
                      x: (node.position?.x ?? 0) + delta.x,
                      y: (node.position?.y ?? 0) + delta.y,
                    },
                  },
                  ...lastNodes.slice(index + 1),
                ];
              }
              return lastNodes;
            });
          },
        }}
        // random display options
        debug={debug}
        minHeight={430}
      />
    </Panel>
  );
}

// TODO: make a util -- unfortunately typescript is crazy and thinks this type is "any" when coming from the library
function filterOutFalsyValues<T = unknown>(n: T | undefined | null): n is T {
  return Boolean(n);
}
