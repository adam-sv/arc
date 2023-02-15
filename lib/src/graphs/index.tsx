// internals
import { getIndexInArrayWithIds, WCRectangle } from '@adam-sv/arc';
// types
import type {
  GraphNodeDecorationRenderProp,
  GraphNodeId,
  IGraphNode,
  IGraphNodeAccessors,
  IGraphEdge,
  IProcessedGraphNode,
  IWebcolaDefinition,
  IWebcolaEdge,
  IWebcolaNode,
} from './types';
export type {
  GraphNodeDecorationRenderProp,
  GraphNodeId,
  IGraphNode,
  IGraphNodeAccessors,
  IGraphEdge,
  IProcessedGraphNode,
  IWebcolaDefinition,
  IWebcolaEdge,
  IWebcolaNode,
};
import type { ICoords } from '@adam-sv/arc';

export const graphDefaults = {
  nodeSize: {
    width: 180,
    height: 80,
  },
};

export class LogicalArcGraph<NodeType = any, EdgeType = any> {
  edges: IGraphEdge<EdgeType>[];
  nodeMap: Map<GraphNodeId, IProcessedGraphNode>;
  childMap: Map<GraphNodeId, GraphNodeId[]>;

  constructor(nodes: IGraphNode<NodeType>[], edges: IGraphEdge<EdgeType>[]) {
    // set up our maps
    this.nodeMap = new Map<GraphNodeId, IProcessedGraphNode>();
    // ensure each node in the map has an array ready for IDs to be populated
    this.childMap = new Map<GraphNodeId, GraphNodeId[]>(
      nodes.map((node) => [node.id, []])
    );
    this.edges = edges;

    // first pass: we ensure all nodes in nodeMap are IProcessedGraphNode
    // however, we don't know enough to populate parent and children keys correctly
    nodes.forEach((node) => {
      const processedNode: IProcessedGraphNode = Object.assign(
        {
          childrenIds: [] as GraphNodeId[],
          children: [] as IProcessedGraphNode[],
          parent: null,
        },
        node
      );

      this.nodeMap.set(processedNode.id, processedNode);
      if (processedNode?.parentId) {
        this.childMap.get(processedNode.parentId)?.push(processedNode.id);
      }
    });

    // second pass: populate parent and children keys correctly
    nodes.forEach((node) => {
      const processedNode = this.nodeMap.get(node.id);
      if (!processedNode) return;
      if (processedNode.parentId !== null) {
        const parentNode = processedNode.parentId
          ? this.nodeMap.get(processedNode.parentId) || null
          : null;
        processedNode.parent = parentNode;

        if (parentNode) {
          parentNode.childrenIds.push(node.id);
          parentNode.children.push(processedNode);
          parentNode.children = parentNode.children.sort((a, b) =>
            a.label.localeCompare(b.label)
          );
        }
      }
    });
  }

  getNode(id: GraphNodeId): IProcessedGraphNode {
    const node = this.nodeMap.get(id);
    if (!node) throw new Error('Invalid ID passed to graph.getNode: ' + id);
    return node;
  }

  getChildren(id: GraphNodeId): IProcessedGraphNode[] {
    const childrenIds = this.childMap.get(id);
    if (!childrenIds || childrenIds.length < 1) {
      return [];
    }

    return childrenIds.reduce(
      (acc: IProcessedGraphNode[], cur: GraphNodeId) => {
        const node = this.nodeMap.get(cur);
        if (node) acc.push(node);
        return acc;
      },
      []
    );
  }

  getNodeRect(node: IProcessedGraphNode): DOMRect | undefined {
    return this.getAbsolutePosition(node);
  }

  getNodeWCRect(node: IProcessedGraphNode): WCRectangle {
    const absPos = this.getAbsolutePosition(node) || {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
    return new WCRectangle(
      absPos.left,
      absPos.right,
      absPos.top,
      absPos.bottom
    );
  }

  getAbsolutePosition(node: IProcessedGraphNode): DOMRect | undefined {
    const portSize = 10;
    const size = node.size || graphDefaults.nodeSize;
    if (node.parentId === null && node.position) {
      const { position } = node;
      return new DOMRect(position.x, position.y, size.width, size.height);
    } else if (node.role === 'input' && node.parent?.position) {
      const inputs = node.parent.children.filter((cn) => cn.role === 'input');
      const arrayPos = getIndexInArrayWithIds(node, inputs);
      const parentSize = node.parent.size || graphDefaults.nodeSize;
      const { position } = node.parent;
      const yPos =
        position.y +
        parentSize.height / 2 -
        ((inputs.length - 1) * portSize * 1.5) / 2 -
        10 -
        0.5 * portSize;
      return new DOMRect(
        position.x + portSize / 2,
        yPos + arrayPos * portSize * 1.5,
        portSize,
        portSize
      );
    } else if (node.role === 'output' && node.parent?.position) {
      const outputs = node.parent.children.filter((cn) => cn.role === 'output');
      const arrayPos = getIndexInArrayWithIds(node, outputs);
      const parentSize = node.parent.size || graphDefaults.nodeSize;
      const { position } = node.parent;
      const yPos =
        position.y +
        parentSize.height / 2 -
        ((outputs.length - 1) * portSize * 1.5) / 2 -
        10 -
        0.5 * portSize;
      return new DOMRect(
        position.x + parentSize.width - portSize * 1.5,
        yPos + arrayPos * portSize * 1.5,
        portSize,
        portSize
      );
    }
  }

  setNodePosition(node: IGraphNode, position: ICoords) {
    const processedNode = this.nodeMap.get(node.id);
    if (processedNode) processedNode.position = position;
  }

  // TODO: O(n) to read this value
  get nodes(): IProcessedGraphNode[] {
    return Array.from(this.nodeMap.values());
  }

  get rootNodes(): IProcessedGraphNode[] {
    return Array.from(this.nodeMap.values()).filter(
      (node) => node.parentId === null
    );
  }

  // TODO: O(n) to read this value
  get boundingRect(): DOMRect {
    return this.computeBoundingRect(this.rootNodes);
  }

  getSizedChildren(node: IProcessedGraphNode): IProcessedGraphNode[] {
    return node.children
      ? node.children.filter(
          (childNode) =>
            !(childNode.role === 'input' || childNode.role === 'output')
        )
      : [];
  }

  computeBoundingRect(
    nodes: IProcessedGraphNode[],
    offset?: ICoords,
    zoom?: number
  ): DOMRect {
    const safeOffset = offset || { x: 0, y: 0 };
    const safeZoom = zoom || 1; // note this eliminates 0 zoom, which I am happy about
    if (nodes.length < 1) {
      return new DOMRect();
    }

    const bounds = {
      top: Infinity,
      right: -Infinity,
      bottom: -Infinity,
      left: Infinity,
    };

    nodes.forEach((node) => {
      const nodeRect = this.getNodeRect(node);
      if (!nodeRect) return;
      let rect = nodeRect;
      const sizedChildren = this.getSizedChildren(node);
      if (sizedChildren.length > 0) {
        rect = this.computeBoundingRect(sizedChildren, {
          x: nodeRect.left,
          y: nodeRect.top,
        });
      }

      if (rect.top + safeOffset.y < bounds.top) {
        bounds.top = rect.top + safeOffset.y;
      }
      if (rect.right + safeOffset.x > bounds.right) {
        bounds.right = rect.right + safeOffset.x;
      }
      if (rect.bottom + safeOffset.y > bounds.bottom) {
        bounds.bottom = rect.bottom + safeOffset.y;
      }
      if (rect.left + safeOffset.x < bounds.left) {
        bounds.left = rect.left + safeOffset.x;
      }
    });

    return new DOMRect(
      bounds.left * safeZoom,
      bounds.top * safeZoom,
      (bounds.right - bounds.left) * safeZoom,
      (bounds.bottom - bounds.top) * safeZoom
    );
  }

  get accessors(): IGraphNodeAccessors {
    return {
      getBounds: (node: IProcessedGraphNode) => this.getNodeWCRect(node),
      getChildren: (node: IGraphNode) => this.childMap.get(node.id) || [],
    };
  }

  // TODO: document what and why
  // WebCola requires us to pass it an array of nodes, but the ID for those nodes has to be their index in the array
  // this is a pretty arbitrary and painful operation, imagine working with DB objects with UUIDs and taking those as the canonical ID for example
  // we make this getter which returns a webcola-compliant definition for smart graph routing
  // it's very hacky, I admit
  get webcolaDefinition(): IWebcolaDefinition {
    const { edges, nodes } = this;

    const nodeIdToArrayPos = new Map();
    let counter = -1;
    const setId = (node?: IProcessedGraphNode) => {
      counter += 1;
      if (node) {
        nodeIdToArrayPos.set(node.id, counter);
      }
      return counter;
    };
    const wcNodes = new Map<GraphNodeId, IWebcolaNode>();
    // we follow nested status in order to know if we have to make fake children nodes
    // silly WebCola algorithm
    let graphIsHierarchical = false;

    // pass 1 to make wcNodes
    nodes.forEach((node: IProcessedGraphNode) => {
      const id = setId(node);
      const wcNode = {
        id: id,
        trueId: node.id,
        label: node.label,
        parent: undefined,
        parentId: undefined,
        leaf: true,
        rectangle: this.getNodeWCRect(node),
        children: [],
      };

      if (!graphIsHierarchical && node.parentId !== null) {
        graphIsHierarchical = true;
      }

      wcNodes.set(node.id, wcNode);
    });
    // pass 2 to add children and parents
    nodes.forEach((node: IProcessedGraphNode) => {
      const wcNode = wcNodes.get(node.id)!;
      if (node.parentId !== null) {
        const parent = wcNodes.get(node.parentId)!;
        parent.children.push(nodeIdToArrayPos.get(node.id));
        parent.leaf = false;

        wcNode.parent = parent;
      } else if (graphIsHierarchical) {
        // TODO: determine if this logic is right
        // In particular, some scenarios I have seen fail seem likely to involve this
        const fakeId = setId();
        wcNode.children.push(fakeId);
        wcNodes.set(fakeId, {
          id: fakeId,
          trueId: undefined,
          parentId: undefined,
          label: '',
          parent: wcNode,
          children: [],
          leaf: true,
          rectangle: getFakeChildWCRect(node, 10, 5),
        });
      }
    });

    const wcEdgeIdToOriginalEdge = new Map<string, IGraphEdge<EdgeType>>();
    const wcEdges: IWebcolaEdge[] = edges.map((edge) => {
      const wcEdge = {
        id: `${edge.from}=>${edge.to}`,
        from: nodeIdToArrayPos.get(edge.from),
        to: nodeIdToArrayPos.get(edge.to),
      };
      wcEdgeIdToOriginalEdge.set(wcEdge.id, edge);
      return wcEdge;
    });

    // this is the webcola-compliant representation
    const definition: IWebcolaDefinition = {
      edges: wcEdges,
      nodes: Array.from(wcNodes.values()),
      accessors: {
        getChildren: (node) => node.children,
        getBounds: (node) => node.rectangle,
      },
      // The guarantee comes from this being a class, it's not even possible to get an edge ID that isn't held in this map
      // because we built it ourselves!
      getOriginalEdge: (edge: IWebcolaEdge) =>
        wcEdgeIdToOriginalEdge.get(edge.id)!,
    };
    return definition;
  }
}

function getFakeChildWCRect(
  node: IProcessedGraphNode,
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
