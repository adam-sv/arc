// types
import type {
  GraphNodeId,
  IBoxSize,
  ICoords,
  IProcessedGraphNode,
  LogicalArcGraph,
} from '@adam-sv/arc';
import type { IGraphLayoutOptions, INodePlacement } from '..';
// layouts
import { IComputedGraphLayout } from '.';
import { GRAPH_DEFAULTS } from '../logic';

interface IFunctionalGraphContext<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>;
  map: Map<NodeIdType, INodePlacement<NodeType, NodeIdType>>;
  layoutOptions: IGraphLayoutOptions;
}

// TODO: for nwo we'll assume it's just functions and inputs/outputs
// later we can maybe enable the nested capability
// Computing the functional layout has one step, compute the size and layout of all root nodes
export function functionalLayout<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>,
  layoutOptions: IGraphLayoutOptions
): Pick<
  IComputedGraphLayout<NodeType, NodeIdType>,
  'placements' | 'topLevelNodes'
> {
  const topLevelNodes = graph.rootNodes;
  const placements = new Map<
    NodeIdType,
    INodePlacement<NodeType, NodeIdType>
  >();

  const graphContext = { graph, layoutOptions, map: placements };

  topLevelNodes.forEach((node) =>
    functionalProcessRootNode({ node, graphContext })
  );

  return {
    placements,
    topLevelNodes,
  };
}

// The size of each root node is equal to its size
// or if it has children, the bounding box around its children.
function functionalProcessRootNode<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>({
  node,
  graphContext,
}: {
  node: IProcessedGraphNode<NodeType, NodeIdType>;
  graphContext: IFunctionalGraphContext<NodeType, EdgeType, NodeIdType>;
}) {
  const { id, role, position } = node;
  const { layoutOptions, graph, map } = graphContext;
  const { contentHeight, defaultNodeSize } = layoutOptions;
  const children = graph.getChildren(id);
  if (['input', 'output'].includes(role as string)) {
    console.error(
      `FunctionalLayout saw a non-functional graph: node "${id}" had role "${
        role as string
      }" but was a root node. "input" and "output" role is reserved for children.`
    );
  }

  if (!position) {
    throw new Error(
      `FunctionalLayout saw an underspecified graph: node "${id}" had no position, but is a root node so requires a position.`
    );
  }

  const size = children.length
    ? computeSizeAndAssignPositions({ node, position, graphContext })
    : node.size || defaultNodeSize;

  const nodePlacement: INodePlacement<NodeType, NodeIdType> = {
    node,
    absolutePosition: position,
    relativePosition: position,
    size,
    contentPlacement: {
      role: 'content-container',
      position: {
        x: 0,
        y: size.height - contentHeight, // - childPadding, // TODO: childPadding or no?
      },
      size: {
        width: size.width,
        height: contentHeight, // + childPadding, // TODO: childPadding or no?
      },
    },
  };
  map.set(node.id, nodePlacement);
  return nodePlacement;
}

// Computes size and positions for root nodes that have children
function computeSizeAndAssignPositions<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>({
  node,
  position,
  graphContext,
}: {
  node: IProcessedGraphNode<NodeType, NodeIdType>;
  position: ICoords;
  graphContext: IFunctionalGraphContext<NodeType, EdgeType, NodeIdType>;
}) {
  const { graph, layoutOptions } = graphContext;
  const { childPadding, contentHeight } = layoutOptions;
  const childTrees = getChildAllocations(graph.getChildren(node.id));

  const inputBoundingBox = computeSizeAndAssignPositionsForArguments({
    position,
    inputsOrOutputs: childTrees.input,
    graphContext,
    type: 'input',
  });
  // TODO: handle internals as a hybrid nested/functional layout?
  const internalsBoundingBox = computeSizeAndAssignPositionsForInternals(
    childTrees.internal
  );
  const outputBoundingBox = computeSizeAndAssignPositionsForArguments({
    position,
    inputsOrOutputs: childTrees.output,
    graphContext,
    type: 'output',
    widthBeforeOutput:
      inputBoundingBox.width + internalsBoundingBox.width + childPadding * 3,
  });

  return {
    width:
      inputBoundingBox.width +
      internalsBoundingBox.width +
      outputBoundingBox.width +
      childPadding * 5,
    height:
      Math.max(
        inputBoundingBox.height,
        internalsBoundingBox.height,
        outputBoundingBox.height
      ) +
      childPadding * 2 +
      contentHeight,
  };
}

// Arguments = inputs / outputs
// Different arguments are enforced depending on the value of "type" argument
interface IComputeInputsSizeAndPosition<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  position: ICoords | undefined;
  inputsOrOutputs: Array<IProcessedGraphNode<NodeType, NodeIdType>>;
  graphContext: IFunctionalGraphContext<NodeType, EdgeType, NodeIdType>;
  type: 'input';
}
interface IComputeOutputsSizeAndPosition<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  position: ICoords | undefined;
  inputsOrOutputs: Array<IProcessedGraphNode<NodeType, NodeIdType>>;
  graphContext: IFunctionalGraphContext<NodeType, EdgeType, NodeIdType>;
  type: 'output';
  widthBeforeOutput: number;
}
function computeSizeAndAssignPositionsForArguments<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(
  props:
    | IComputeInputsSizeAndPosition<NodeType, EdgeType, NodeIdType>
    | IComputeOutputsSizeAndPosition<NodeType, EdgeType, NodeIdType>
): IBoxSize {
  const { position, inputsOrOutputs, type, graphContext } = props;
  const { childPadding, inputOutputHeight, inputOutputWidth } =
    graphContext.layoutOptions;
  if (inputsOrOutputs.length < 1) return { width: childPadding * 2, height: 0 };

  const nodes = inputsOrOutputs
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));

  const relativeX = type === 'output' ? props.widthBeforeOutput : 0;
  const totalRowHeight = inputOutputHeight + childPadding;

  // TODO: layout option
  let maxWidth =
    inputOutputWidth === 'auto'
      ? GRAPH_DEFAULTS.LAYOUT_OPTIONS.INPUT_OUTPUT_WIDTH
      : inputOutputWidth;

  // First pass does most of the work
  nodes.forEach((node, i) => {
    const relativeY = i * totalRowHeight;
    const size = functionalProcessInputOutputNode({
      node,
      relativeX,
      relativeY,
      parentPosition: position,
      graphContext,
      type,
    });
    if (size.width > maxWidth) maxWidth = size.width;
  });
  // Second pass needs to ensure the widths all match
  if (inputOutputWidth === 'auto' || maxWidth > inputOutputWidth) {
    nodes.forEach((node) => {
      functionalPostProcessInputOutputNode({
        node,
        graphContext,
        maxWidth,
        type,
      });
    });
  }

  return {
    width: maxWidth,
    height: Math.max(inputsOrOutputs.length * totalRowHeight - childPadding, 0), // TODO: off by childPadding?
  };
}

function functionalProcessInputOutputNode<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>({
  node,
  relativeX,
  relativeY,
  parentPosition,
  graphContext,
  type,
}: {
  node: IProcessedGraphNode<NodeType, NodeIdType>;
  relativeX: number;
  relativeY: number;
  parentPosition: ICoords | undefined;
  graphContext: IFunctionalGraphContext<NodeType, EdgeType, NodeIdType>;
  type: 'input' | 'output';
}) {
  const { layoutOptions, map } = graphContext;
  const {
    childPadding,
    connectionTargetSize,
    inputOutputWidth,
    inputOutputHeight,
  } = layoutOptions;

  const relativePosition = {
    x: relativeX,
    y: relativeY,
  };
  const absolutePosition = parentPosition
    ? {
        x: childPadding + parentPosition.x + relativeX, // childPadding?
        y: childPadding + parentPosition.y + relativeY, // childPadding?
      }
    : undefined;

  const width =
    inputOutputWidth === 'auto'
      ? 8 * node.label.length + connectionTargetSize
      : node.size?.width || inputOutputWidth;

  const size = {
    width: width,
    height: inputOutputHeight,
  };

  // TODO: parameter?
  const contentWidth = size.width - connectionTargetSize;

  map.set(node.id, {
    node,
    absolutePosition: absolutePosition ?? { x: 0, y: 0 }, // TODO: hmmm
    relativePosition,
    size,
    contentPlacement: {
      role: 'content-container',
      position: {
        // an output has the content on the left, an input on the right
        x: type === 'input' ? size.width - contentWidth : 0,
        y: 0,
      },
      size: { ...size, width: contentWidth },
    },
    connectionTargetPlacement: {
      role: 'connection-target',
      position: {
        x: type === 'output' ? size.width - connectionTargetSize : 0,
        y: 0,
      },
      size: {
        ...size,
        width: connectionTargetSize,
      },
    },
  });
  return size;
}

// after we're done, we know the true "width"
function functionalPostProcessInputOutputNode<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>({
  node,
  graphContext,
  maxWidth,
  type,
}: {
  node: IProcessedGraphNode<NodeType, NodeIdType>;
  graphContext: IFunctionalGraphContext<NodeType, EdgeType, NodeIdType>;
  maxWidth: number;
  type: 'input' | 'output';
}) {
  const { layoutOptions, map } = graphContext;
  const { connectionTargetSize } = layoutOptions;
  const placement = map.get(node.id);
  const contentPlacement = placement?.contentPlacement;
  const connectionTargetPlacement = placement?.connectionTargetPlacement;
  if (!placement || !contentPlacement) return;

  const finalWidth = maxWidth;
  const contentWidth = maxWidth - connectionTargetSize;

  // Update the placement and where relevant the position
  placement.size.width = finalWidth;
  contentPlacement.size.width = contentWidth;
  if (type === 'input') contentPlacement.position.x = finalWidth - contentWidth;
  if (type === 'output' && connectionTargetPlacement)
    connectionTargetPlacement.position.x = finalWidth - connectionTargetSize;
}

// TODO: implement something here
function computeSizeAndAssignPositionsForInternals<
  NodeType,
  NodeIdType extends GraphNodeId
>(internals: Array<IProcessedGraphNode<NodeType, NodeIdType>>) {
  if (internals.length)
    console.error(
      `ADAMWarning: @adam-sv/arc Graph#functional layout doesn't currently handle nesting outside of "input" and "output" roles`
    );
  return { width: 10, height: 0 };
}

function getChildAllocations<NodeType, NodeIdType extends GraphNodeId>(
  children: Array<IProcessedGraphNode<NodeType, NodeIdType>>
) {
  const childAllocations = {
    input: [] as Array<IProcessedGraphNode<NodeType, NodeIdType>>,
    internal: [] as Array<IProcessedGraphNode<NodeType, NodeIdType>>,
    output: [] as Array<IProcessedGraphNode<NodeType, NodeIdType>>,
  };
  children.forEach((childNode) => {
    let childRole: IChildAllocation = 'internal';
    if (childNode.role === 'input') childRole = 'input';
    if (childNode.role === 'output') childRole = 'output';

    childAllocations[childRole].push(childNode);
  });
  return childAllocations;
}

/// Types
type IChildAllocation = 'input' | 'output' | 'internal';
