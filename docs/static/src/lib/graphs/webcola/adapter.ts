// TODO: move this into src/graphs/webcola/index or similar
// internals
import { WCRectangle } from '.';
// types
import type {
  GraphNodeId,
  IBoxSize,
  ICoords,
  IGraphEdge,
  IProcessedGraphNode,
  IWebcolaDefinition,
  IWebcolaEdge,
  IWebcolaNode,
  LogicalArcGraph,
} from '@adam-sv/arc';

export function getWebcolaDefinition<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>) {
  return getParameterizedWebcolaDefinition<NodeType, EdgeType, NodeIdType>(
    graph,
    (node: IProcessedGraphNode<NodeType, NodeIdType>) =>
      graph.getNodeWCRect(node),
    (node: IProcessedGraphNode<NodeType, NodeIdType>) =>
      getFakeChildWCRect(node, 10, 5)
  );
}

// TODO: what happens when there is a missing argument? Maybe we don't accept that
export function positionSizeToWebcolaRectangle(
  position: ICoords,
  size: IBoxSize
) {
  const { x, y } = position;
  const { width, height } = size;
  return new WCRectangle(x, x + width, y, y + height);
}

export function getParameterizedWebcolaDefinition<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(
  graph: LogicalArcGraph<NodeType, EdgeType, NodeIdType>,
  getNodePosition: (
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ) => WCRectangle,
  getNodeContentPosition?: (
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ) => WCRectangle
): IWebcolaDefinition<EdgeType, NodeIdType> {
  const originalNodes = graph.nodes;
  const originalEdges = graph.edges;

  const nodeIdToArrayPos = new Map<NodeIdType, number>();
  let counter = -1;
  const setId = (node?: IProcessedGraphNode<NodeType, NodeIdType>) => {
    counter += 1;
    if (node) {
      nodeIdToArrayPos.set(node.id, counter);
    }
    return counter;
  };

  const webcolaNodes = new Map<NodeIdType, IWebcolaNode>();
  const nonCorrespondingWebcolaNodes: Array<IWebcolaNode> = [];
  // we follow nested status in order to know if we have to make fake children nodes, due to WebCola algorithm
  let graphIsHierarchical = false;

  // pass 1 to make webcolaNodes
  originalNodes.forEach(
    (originalNode: IProcessedGraphNode<NodeType, NodeIdType>) => {
      const id = setId(originalNode);
      const webcolaNode = {
        id: id,
        label: originalNode.label,
        parent: undefined,
        parentId: undefined,
        leaf: true,
        rectangle: getNodePosition(originalNode),
        children: [],
      };

      if (!graphIsHierarchical && originalNode.parentId !== null)
        graphIsHierarchical = true;

      webcolaNodes.set(originalNode.id, webcolaNode);
    }
  );
  // pass 2 to add children and parents to webcolaNodes - note they have to be pointers to, not IDs of, the other webcolaNodes
  originalNodes.forEach(
    (originalNode: IProcessedGraphNode<NodeType, NodeIdType>) => {
      const webcolaNode = webcolaNodes.get(originalNode.id)!;
      // if the originalNode is a child, we update the webcolaNode and parentWebcolaNode
      if (originalNode.parentId !== undefined) {
        const parent = webcolaNodes.get(originalNode.parentId)!;
        // TODO - not sure about casting to index 0 here...
        parent.children.push(nodeIdToArrayPos.get(originalNode.id) ?? 0);
        parent.leaf = false;

        webcolaNode.parent = parent;
      }

      if (graphIsHierarchical && getNodeContentPosition) {
        const contentPosition = getNodeContentPosition(originalNode);
        const parent = webcolaNode.parent;
        const parentRectangle = parent?.rectangle;
        if (
          parentRectangle
            ? !rectanglesAreEqualSize(contentPosition, parentRectangle)
            : !rectanglesAreEqualSize(contentPosition, webcolaNode.rectangle)
        ) {
          // We would like to prevent webcola from routing through the "content" of the node
          // "getNodeContentPosition" existing implies the content is differently positioned than the node itself
          // This means webcola can route to our children inside ourself fine, but won't route thru our fake content blocking node
          const contentBlockerId = setId();
          nonCorrespondingWebcolaNodes.push({
            id: contentBlockerId,
            label: `${originalNode.label}-ContentBlocker`,
            children: [],
            leaf: true,
            rectangle: contentPosition,
            parentId: undefined,
            parent: undefined,
          });
        }
      }
    }
  );

  const webcolaEdgeIdToOriginalEdge = new Map<
    string,
    IGraphEdge<EdgeType, NodeIdType>
  >();
  const webcolaEdges: IWebcolaEdge[] = originalEdges.map((edge) => {
    const from = nodeIdToArrayPos.get(edge.from);
    const to = nodeIdToArrayPos.get(edge.to);
    if (typeof from !== 'number' || typeof to !== 'number')
      throw new Error(
        'TS error - webcola edges are safe-by-construction, but TS doubts me!'
      );
    const webcolaEdge = {
      id: `${edge.from}=>${edge.to}`,
      from,
      to,
    };
    webcolaEdgeIdToOriginalEdge.set(webcolaEdge.id, edge);
    return webcolaEdge;
  });

  // this is the webcola-compliant representation
  const definition: IWebcolaDefinition<EdgeType, NodeIdType> = {
    edges: webcolaEdges,
    nodes: Array.from(webcolaNodes.values()).concat(
      nonCorrespondingWebcolaNodes
    ),
    accessors: {
      getChildren: (node) => node.children,
      getBounds: (node) => node.rectangle,
    },
    // The guarantee comes from this being a class, it's not even possible to get an edge ID that isn't held in this map
    // because we built it ourselves!
    getOriginalEdge: (edge: IWebcolaEdge) => {
      const originalEdge = webcolaEdgeIdToOriginalEdge.get(edge.id);
      if (!originalEdge)
        throw new Error(
          'TS error - retrieving originalEdge from webcolaEdge is safe by construction yada yada'
        );
      return originalEdge;
    },
  };
  return definition;
}

function getFakeChildWCRect<NodeType, NodeIdType extends GraphNodeId>(
  node: IProcessedGraphNode<NodeType, NodeIdType>,
  portSize: number,
  portGap?: number
): WCRectangle {
  portGap = typeof portGap === 'number' ? portGap : Math.round(portSize / 2);
  const xOffset = portSize + portGap;

  const x = node.position?.x || 0;
  const y = node.position?.y || 0;
  const width = node.size?.width || 0;
  const height = node.size?.height || 0;
  return new WCRectangle(x + xOffset, x + width - xOffset, y, y + height);
}

const rectKeys: Array<(keyof WCRectangle & 'x') | 'X' | 'y' | 'Y'> = [
  'x',
  'X',
  'y',
  'Y',
];
function rectanglesAreEqual(r1: WCRectangle, r2: WCRectangle) {
  for (const key of rectKeys) if (r1[key] !== r2[key]) return false;
  return true;
}
function rectanglesAreEqualSize(r1: WCRectangle, r2: WCRectangle) {
  const size1 = getBoxSize(r1);
  const size2 = getBoxSize(r2);
  return size1.width === size2.width && size1.height === size2.height;
}
function getBoxSize(rect: WCRectangle): IBoxSize {
  return {
    width: rect.X - rect.x,
    height: rect.Y - rect.y,
  };
}
function shiftWithPadding(
  absoluteParentPosition: WCRectangle,
  relativeChildPosition: WCRectangle,
  padding = 0
) {
  return new WCRectangle(
    absoluteParentPosition.x + relativeChildPosition.x + padding, // x
    absoluteParentPosition.x + relativeChildPosition.X + padding, // X
    absoluteParentPosition.y + relativeChildPosition.y + padding, // y
    absoluteParentPosition.y + relativeChildPosition.Y + padding // Y
  );
}
