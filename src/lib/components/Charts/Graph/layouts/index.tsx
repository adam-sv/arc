// internals
import { LogicalGraphUtils } from '@adam-sv/arc';
// types
import type {
  GraphNodeId,
  IProcessedGraphNode,
  LogicalArcGraph,
} from '@adam-sv/arc';
import type { IGraphLayoutOptions, IGraphStrategy, INodePlacement } from '..';

// layout implementations
import { flatLayout } from './flat';
import { functionalLayout } from './functional';
import { hierarchicalLayout } from './hierarchical';

export interface IComputedGraphLayout<
  NodeType,
  NodeIdType extends GraphNodeId
> {
  boundingRect: DOMRect;
  placements: Map<NodeIdType, INodePlacement<NodeType, NodeIdType>>;
  topLevelNodes: Array<IProcessedGraphNode<NodeType, NodeIdType>>;
}

// TODO:
// We need to also accept or define and return the padding options here
// This is important for the hierarchical for instance; the total graph padding is imparted onto each node
// Instead, we want to enable separate graph padding and "child" padding, and enforce that the child padding is at least 2x the edgeSpacing
// Add:
// - arguments for childPadding
// - returns for used padding & childPadding values
export function getRenderedLayout<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>,
  strategy: IGraphStrategy,
  layoutOptions: IGraphLayoutOptions
): IComputedGraphLayout<NodeType, NodeIdType> {
  const { placements, topLevelNodes } = computePlacements(
    graph,
    strategy,
    layoutOptions
  );
  const boundingRect = computeBoundingRect(
    topLevelNodes
      .map(({ id }) => placements.get(id))
      .filter(filterOutFalsyValues)
  );
  return {
    boundingRect,
    placements,
    topLevelNodes,
  };
}

function filterOutFalsyValues<T = unknown>(n: T | undefined | null): n is T {
  return Boolean(n);
}

// TODO:
// customLayout?: (
//   graph: LogicalArcGraph,
//   childPadding: number
// ) => Pick<GraphLayout, 'placements' | 'topLevelNodes'>
function computePlacements<NodeType, EdgeType, NodeIdType extends GraphNodeId>(
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>,
  strategy: IGraphStrategy,
  layoutOptions: IGraphLayoutOptions
): Pick<
  IComputedGraphLayout<NodeType, NodeIdType>,
  'placements' | 'topLevelNodes'
> {
  if (strategy === 'flat') {
    return flatLayout(graph);
  } else if (strategy === 'hierarchical') {
    return hierarchicalLayout(graph, layoutOptions);
  } else if (strategy === 'functional') {
    return functionalLayout(graph, layoutOptions);
    // } else if (strategy === 'custom' && customLayout) {
    //   return customLayout(graph, childPadding);
  } else {
    throw new Error(
      strategy === 'custom'
        ? '"custom" strategy requires customLayout handler. None was provided...'
        : `Unknown strategy: must have been added since we last worked on IGraphStrateg`
    );
  }
}

export function computeBoundingRect<NodeType, NodeIdType extends GraphNodeId>(
  nodes: Array<INodePlacement<NodeType, NodeIdType>>
) {
  if (nodes.length < 1) return new DOMRect();
  const box = {
    xMin: Infinity,
    xMax: -Infinity,
    yMin: Infinity,
    yMax: -Infinity,
  };

  nodes.forEach(({ relativePosition, size }) => {
    const { X, x, y, Y } = positionSizeToWebcolaRectangle(
      relativePosition,
      size
    );

    if (x < box.xMin) box.xMin = x;
    if (X > box.xMax) box.xMax = X;
    if (y < box.yMin) box.yMin = y;
    if (Y > box.yMax) box.yMax = Y;
  });

  return new DOMRect(
    box.xMin,
    box.yMin,
    box.xMax - box.xMin,
    box.yMax - box.yMin
  );
}

const { positionSizeToWebcolaRectangle } = LogicalGraphUtils;
