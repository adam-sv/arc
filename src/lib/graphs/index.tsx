// internals
import { WCGridRouter, WCRectangle } from './webcola';
import {
  getWebcolaDefinition,
  getParameterizedWebcolaDefinition,
} from './webcola/adapter';
// types
import type { ICoords } from '@adam-sv/arc';
import type {
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
  GraphNodeId,
  IGraphNode,
  IGraphNodeAccessors,
  IGraphEdge,
  IProcessedGraphNode,
  IWebcolaDefinition,
  IWebcolaEdge,
  IWebcolaNode,
};

export {
  getWebcolaDefinition,
  getParameterizedWebcolaDefinition,
  WCGridRouter,
  WCRectangle,
};

export const graphDefaults = {
  nodeSize: {
    width: 180,
    height: 80,
  },
};

export class LogicalArcGraph<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  // O(1) storage
  edges: IGraphEdge<EdgeType, NodeIdType>[];
  nodeMap: Map<NodeIdType, IProcessedGraphNode<NodeType, NodeIdType>>;
  childMap: Map<NodeIdType, NodeIdType[]>;
  // derived iterators
  nodes: Array<IProcessedGraphNode<NodeType, NodeIdType>>;
  rootNodes: Array<IProcessedGraphNode<NodeType, NodeIdType>>;
  boundingRect: DOMRect;

  constructor(
    nodes: IGraphNode<NodeType, NodeIdType>[],
    edges: IGraphEdge<EdgeType, NodeIdType>[]
  ) {
    // set up our maps
    this.nodeMap = new Map<
      NodeIdType,
      IProcessedGraphNode<NodeType, NodeIdType>
    >();
    // ensure each node in the map has an array ready for IDs to be populated
    this.childMap = new Map<NodeIdType, NodeIdType[]>(
      nodes.map((node) => [node.id, []])
    );
    this.edges = edges;

    // first pass: we ensure all nodes in nodeMap are IProcessedGraphNode
    // however, we don't know enough to populate parent and children keys correctly
    nodes.forEach((node) => {
      const processedNode: IProcessedGraphNode<NodeType, NodeIdType> =
        Object.assign(
          {
            childrenIds: [] as NodeIdType[],
            children: [] as IProcessedGraphNode<NodeType, NodeIdType>[],
            parent: undefined,
          },
          node
        );

      this.nodeMap.set(processedNode.id, processedNode);
      if (processedNode.parentId) {
        this.childMap.get(processedNode.parentId)?.push(processedNode.id);
      }
    });

    // second pass: populate parent and children keys correctly
    nodes.forEach((node) => {
      const processedNode = this.nodeMap.get(node.id);
      if (!processedNode) return;
      if (processedNode.parentId !== undefined) {
        const parentNode = processedNode.parentId
          ? this.nodeMap.get(processedNode.parentId) || undefined
          : undefined;
        processedNode.parent = parentNode;

        if (parentNode) {
          parentNode.childrenIds.push(node.id);
          parentNode.children.push(processedNode);
          parentNode.children = parentNode.children.sort((a, b) =>
            a.label.localeCompare(b.label)
          );
        } else {
          // if the parent isn't in the graph, we can't render it in a group!
          processedNode.parentId = undefined;
        }
      }
    });

    // TODO: refactor these out so we can make this a dynamic graph
    this.nodes = Array.from(this.nodeMap.values());
    this.rootNodes = this.nodes.filter((node) => node.parentId === undefined);
    this.boundingRect = this.computeBoundingRect(this.rootNodes);
  }

  // Access
  getNode(id: NodeIdType): IProcessedGraphNode<NodeType, NodeIdType> {
    const node = this.nodeMap.get(id);
    if (!node) throw new Error(`Invalid ID passed to graph.getNode: ${id}`);
    return node;
  }

  getParent(
    id: NodeIdType
  ): IProcessedGraphNode<NodeType, NodeIdType> | undefined {
    const node = this.getNode(id);
    if (node.parentId === undefined) return undefined;
    return this.getNode(node.parentId);
  }

  getParentChain(id: NodeIdType) {
    const chain = [this.getNode(id)];
    let pointer = chain[0];
    while (pointer.parentId !== undefined) {
      pointer = this.getNode(pointer.parentId);
      chain.push(pointer);
    }
    return chain;
  }

  getChildren(id: NodeIdType): IProcessedGraphNode<NodeType, NodeIdType>[] {
    const childrenIds = this.childMap.get(id);
    if (!childrenIds || childrenIds.length < 1) {
      return [];
    }

    return childrenIds.reduce(
      (acc: IProcessedGraphNode<NodeType, NodeIdType>[], cur: NodeIdType) => {
        const node = this.nodeMap.get(cur);
        if (node) acc.push(node);
        return acc;
      },
      []
    );
  }

  // Introspect
  nodeIsLeaf(node: IProcessedGraphNode<NodeType, NodeIdType>): boolean {
    return !node.children || node.children.length < 1;
  }

  nodeIsRoot(node: IProcessedGraphNode<NodeType, NodeIdType>): boolean {
    return node.parentId === undefined;
  }

  // TODO: things to get rid of by refactoring into another layer
  getNodeRect(
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ): DOMRect | undefined {
    return this.getAbsolutePosition(node);
  }

  getNodeWCRect(node: IProcessedGraphNode<NodeType, NodeIdType>): WCRectangle {
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

  getAbsolutePosition(
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ): DOMRect | undefined {
    const portSize = 10;
    const size = node.size || graphDefaults.nodeSize;
    if (node.parentId === undefined && node.position) {
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

  getSizedChildren(
    node: IProcessedGraphNode<NodeType, NodeIdType>
  ): IProcessedGraphNode<NodeType, NodeIdType>[] {
    return node.children
      ? node.children.filter(
          (childNode) =>
            !(childNode.role === 'input' || childNode.role === 'output')
        )
      : [];
  }

  computeBoundingRect(
    nodes: IProcessedGraphNode<NodeType, NodeIdType>[],
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

  get accessors(): IGraphNodeAccessors<NodeType, NodeIdType> {
    return {
      getBounds: (node: IProcessedGraphNode<NodeType, NodeIdType>) =>
        this.getNodeWCRect(node),
      getChildren: (node: IGraphNode<NodeType, NodeIdType>) =>
        this.childMap.get(node.id) || [],
    };
  }

  // TODO: document what and why
  // WebCola requires us to pass it an array of nodes, but the ID for those nodes has to be their index in the array
  // this is a pretty arbitrary and painful operation, imagine working with DB objects with UUIDs and taking those as the canonical ID for example
  // we make this getter which returns a webcola-compliant definition for smart graph routing
  // it's very hacky, I admit
  get webcolaDefinition(): IWebcolaDefinition<EdgeType, NodeIdType> {
    return getWebcolaDefinition(this);
  }
}

export function getIndexInArrayWithIds<T extends { id: string | number }>(
  datum: T,
  array: T[]
): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === datum.id) {
      return i;
    }
  }
  return -1;
}
