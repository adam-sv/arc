// Nolan's comment: Graphing is distributed in a few places:
// * LogicalArcGraph - the backing logic. Fast access to nodes, children, edges, etc. provided here
// * Charts/Graph - the rendering logic. Basic, Functional, Nested styles available. When nesting is used, size is computed

import { GraphNodeId, LogicalArcGraph } from '.';

// this function actually mutates your graph nodes and writes to their "position" field
function compactEdgesIgnoredLayout<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>,
  canvasWidth = 1000,
  nodeWidth = 180,
  nodeHeight = 80,
  gap = 20
) {
  const columnWidth = canvasWidth / (nodeWidth + gap);
  const rowHeight = nodeHeight + gap;

  const i = 0;
  for (const node of graph.nodes) {
    const x = (columnWidth * i) % canvasWidth;
    const y = ((columnWidth * i) / canvasWidth) * rowHeight;

    node.position = { x, y };
  }
}

const graph = new LogicalArcGraph(
  Array.from(new Array(20), (_, i) => ({ id: i, label: `${i}` })),
  []
);
compactEdgesIgnoredLayout(graph);
