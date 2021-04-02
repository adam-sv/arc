// internals
import { getIndexInArrayWithIds, WCRectangle } from '@adam-sv/arc';
// types
import type { GraphNodeDecorationRenderProp, GraphNodeId, IGraphNode, IGraphNodeAccessors, IGraphEdge, LogicalGraph, IProcessedGraphNode, IProcessableArcGraph, IProcessableCustomGraph, IGraph, IWebcolaDefinition } from './types';
export type { GraphNodeDecorationRenderProp, GraphNodeId, IGraphNode, IGraphNodeAccessors, IGraphEdge, LogicalGraph, IProcessedGraphNode, IProcessableArcGraph, IProcessableCustomGraph, IGraph, IWebcolaDefinition };
import type { ICoords } from '@adam-sv/arc';

export const graphDefaults = {
  nodeSize: {
    width: 180,
    height: 80,
  },
};

export class LogicalArcGraph {
  edges: IGraphEdge[];
  _nodeMap: Map<GraphNodeId, IProcessedGraphNode>;
  _childMap: Map<GraphNodeId, GraphNodeId[]>;

  constructor(nodes: IGraphNode[], edges: IGraphEdge[]) {
    // set up our maps
    this._nodeMap = new Map<GraphNodeId, IProcessedGraphNode>();
    // ensure each node in the map has an array ready for IDs to be populated
    this._childMap = new Map<GraphNodeId, GraphNodeId[]>(nodes.map(node => [node.id, []]));
    this.edges = edges;

    // first pass: we ensure all nodes in nodeMap are IProcessedGraphNode
    // however, we don't know enough to populate parent and children keys correctly
    nodes.forEach(node => {
      const processedNode:IProcessedGraphNode = Object.assign({
        childrenIds: ([] as GraphNodeId[]),
        children: ([] as IProcessedGraphNode[]),
        parent: null,
      }, node);

      this._nodeMap.set(processedNode.id, processedNode);
      if (processedNode.parentId !== null) {
        this._childMap.get(processedNode.parentId).push(processedNode.id);
      }
    });

    // second pass: populate parent and children keys correctly
    nodes.forEach(node => {
      const processedNode = this._nodeMap.get(node.id);
      if (processedNode.parentId !== null) {
        const parentNode = this._nodeMap.get(processedNode.parentId) || null;
        processedNode.parent = parentNode;

        if (parentNode) {
          parentNode.childrenIds.push(node.id);
          parentNode.children.push(processedNode);
          parentNode.children = parentNode.children.sort((a, b) => a.label.localeCompare(b.label));
        }
      }
    });
  }

  getNode(id: GraphNodeId): IProcessedGraphNode {
    const node = this._nodeMap.get(id);
    if (!node) throw new Error('Invalid ID passed to graph.getNode: '+id);
    return node;
  }

  getChildren(id: GraphNodeId): IProcessedGraphNode[] {
    const childrenIds = this._childMap.get(id);
    if (!childrenIds || childrenIds.length < 1) {
      return [];
    }

    return childrenIds
      .map(id => this._nodeMap.get(id))
      .filter(Boolean);
  }

  getNodeRect(node: IProcessedGraphNode): DOMRect {
    return this.getAbsolutePosition(node);
  }

  getNodeWCRect(node: IProcessedGraphNode): WCRectangle {
    const absPos = this.getAbsolutePosition(node);
    return new WCRectangle(absPos.left, absPos.right, absPos.top, absPos.bottom);
  }

  getAbsolutePosition(node: IProcessedGraphNode) {
    const portSize = 10;
    let size = node.size || graphDefaults.nodeSize;
    if (node.parentId === null) {
      const { position } = node;
      return new DOMRect(position.x, position.y, size.width, size.height);
    } else if (node.role === 'input') {
      const inputs = node.parent.children.filter(cn => cn.role === 'input');
      const arrayPos = getIndexInArrayWithIds(node, inputs);
      const parentSize = node.parent.size || graphDefaults.nodeSize;
      const { position } = node.parent;
      const yPos = position.y + parentSize.height / 2
        - ((inputs.length - 1) * portSize * 1.5) / 2
        - 10 - 0.5 * portSize;
      return new DOMRect(
        position.x + portSize / 2,
        yPos + arrayPos * portSize * 1.5,
        portSize,
        portSize,
      );
    } else if (node.role === 'output') {
      const outputs = node.parent.children.filter(cn => cn.role === 'output');
      const arrayPos = getIndexInArrayWithIds(node, outputs);
      const parentSize = node.parent.size || graphDefaults.nodeSize;
      const { position } = node.parent;
      const yPos = position.y + parentSize.height / 2
        - ((outputs.length - 1) * portSize * 1.5) / 2
        - 10 - 0.5 * portSize;
      return new DOMRect(
        position.x + parentSize.width - portSize * 1.5,
        yPos + arrayPos * portSize * 1.5,
        portSize,
        portSize,
      );
    }
  }

  setNodePosition(node: IGraphNode, position: ICoords) {
    const processedNode = this._nodeMap.get(node.id);
    processedNode.position = position;
  }

  // TODO: O(n) to read this value
  get nodes(): IProcessedGraphNode[] {
    return Array.from(this._nodeMap.values());
  }

  get rootNodes(): IProcessedGraphNode[] {
    return Array
      .from(this._nodeMap.values())
      .filter(node => node.parentId === null);
  }

  // TODO: O(n) to read this value
  get boundingRect(): DOMRect {
    return this.computeBoundingRect(this.rootNodes);
  }

  getSizedChildren(node: IProcessedGraphNode): IProcessedGraphNode[] {
    return node.children
      ? node.children.filter(childNode => !(childNode.role === 'input' || childNode.role === 'output'))
      : [];
  }

  computeBoundingRect(nodes: IProcessedGraphNode[], offset?: ICoords): DOMRect {
    offset = offset || { x: 0, y: 0 };
    if (nodes.length < 1) {
      return new DOMRect();
    }

    const bounds = { top: Infinity, right: -Infinity, bottom: -Infinity, left: Infinity };

    nodes.forEach(node => {
      let nodeRect = this.getNodeRect(node);
      let rect = nodeRect;
      const sizedChildren = this.getSizedChildren(node);
      if (sizedChildren.length > 0) {
        rect = this.computeBoundingRect(sizedChildren, { x: nodeRect.left, y: nodeRect.top });
      }

      if (rect.top + offset.y < bounds.top) { bounds.top = rect.top + offset.y; }
      if (rect.right + offset.x > bounds.right) { bounds.right = rect.right + offset.x; }
      if (rect.bottom + offset.y > bounds.bottom) { bounds.bottom = rect.bottom + offset.y; }
      if (rect.left + offset.x < bounds.left) { bounds.left = rect.left + offset.x; }
    });

    return new DOMRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top);
  }

  get accessors(): IGraphNodeAccessors {
    return {
      getBounds: (node: IProcessedGraphNode) => this.getNodeWCRect(node),
      getChildren: (node: IGraphNode) => this._childMap.get(node.id) || [],
    };
  }

  // TODO: document what and why
  get webcolaDefinition(): IWebcolaDefinition {
    const { accessors, edges, nodes } = this;

    const nodeIdToArrayPos = new Map();
    let counter = -1;
    const setId = (node?: IProcessedGraphNode) => {
      counter += 1;
      if (node) { nodeIdToArrayPos.set(node.id, counter); }
      return counter;
    };
    const wcNodes = new Map();
    // we follow nested status in order to know if we have to make fake children nodes
    // silly WebCola algorithm
    let isNested = false;

    // pass 1 to make wcNodes
    nodes.forEach((node: IProcessedGraphNode) => {
      const id = setId(node);
      const wcNode = {
        id: id,
        trueId: node.id,
        label: node.label,
        parent: undefined,
        leaf: true,
        rectangle: this.getNodeWCRect(node),
        children: [],
      };

      if (!isNested && node.parentId !== null) {
        isNested = true;
      }

      wcNodes.set(node.id, wcNode);
    });
    // pass 2 to add children and parents
    nodes.forEach((node: IProcessedGraphNode) => {
      const wcNode = wcNodes.get(node.id);
      if (node.parentId !== null) {
        const parent = wcNodes.get(node.parentId);
        parent.children.push(nodeIdToArrayPos.get(node.id));
        parent.leaf = false;

        wcNode.parent = parent;
      } else if (isNested) {
        // we have a node possibly with children
        // Webcola no longer cares about the bounding box of this MF
        // let's fake it til we make it better later lol
        const fakeId = setId();
        wcNode.children.push(fakeId);
        wcNodes.set(fakeId, {
          id: fakeId,
          trueId: null,
          label: '',
          parent: wcNode,
          leaf: true,
          rectangle: getFakeChildWCRect(node, 10, 5),
        });
      }
    });

    const wcEdges = edges.map((edge) => {
      return {
        id: `${edge.from}=>${edge.to}`,
        from: nodeIdToArrayPos.get(edge.from),
        to: nodeIdToArrayPos.get(edge.to),
      };
    });

    const definition:IWebcolaDefinition = {
      edges: wcEdges,
      nodes: Array.from(wcNodes.values()),
      accessors: {
        getChildren: (node: any) => node.children,
        getBounds: (node: any) => node.rectangle,
      },
    };
    return definition;
  }
}

export class LogicalCustomGraph {
  constructor(nodes: any[], edges: IGraphEdge[], accessors: IGraphNodeAccessors) {

  }
}


export function buildGraph(nodes: IGraphNode[], edges: IGraphEdge[], accessors?: IGraphNodeAccessors) {
  const safeAccessors = getSafeAccessors(accessors);
  const nodeMap = new Map<GraphNodeId, IProcessedGraphNode>();
  const childMap = new Map<GraphNodeId, GraphNodeId[]>(nodes.map(node => [node.id, []]));

  const graph:IGraph = {
    nodes: [],
    edges: edges,
    rootNodes: [],
    getNode: (id: GraphNodeId) => nodeMap.get(id),
    getChildren: (id: GraphNodeId): IProcessedGraphNode[] => {
      const children = childMap.get(id);
      if (!children || children.length < 1) {
        return [];
      }

      const childNodes:IProcessedGraphNode[] = [];
      children.forEach((childId:GraphNodeId) => {
        if (nodeMap.get(childId)) {
          childNodes.push(nodeMap.get(childId) as IProcessedGraphNode);
        }
      });
      return childNodes;
    },
    accessors: safeAccessors,
    boundingRect: new DOMRect(0, 0, 0, 0),
    getWebcolaDefinition: () => getWebcolaDefinition(graph),
  };

  const boundingCoords = { top: 0, right: 0, bottom: 0, left: 0 };

  // first pass: we ensure all nodes in nodeMap are IProcessedGraphNode
  // however, we don't know enough to populate parent and children keys correctly
  nodes.forEach(node => {
    const processedNode:IProcessedGraphNode = Object.assign({
      childrenIds: ([] as GraphNodeId[]),
      children: ([] as IProcessedGraphNode[]),
      parent: null,
    }, node);

    nodeMap.set(processedNode.id, processedNode);
    graph.nodes.push(processedNode);
    if (processedNode.parentId === null) {
      graph.rootNodes.push(processedNode);
    }
    if (processedNode.parentId !== null) {
      childMap.get(processedNode.parentId)?.push(processedNode.id);
    }

    if (node.position) {
      const { position, size } = getSafeBounds(node);
      const nodeBounds = {
        top: position.y,
        right: position.x + size.width,
        bottom: position.y + size.height,
        left: position.x,
      };

      ['left', 'top'].forEach((comparableDimension) => {
        if (nodeBounds[comparableDimension] < boundingCoords[comparableDimension]) {
          boundingCoords[comparableDimension] = nodeBounds[comparableDimension];
        }
      });
      ['right', 'bottom'].forEach((comparableDimension) => {
        if (nodeBounds[comparableDimension] > boundingCoords[comparableDimension]) {
          boundingCoords[comparableDimension] = nodeBounds[comparableDimension];
        }
      });
    }
  });

  // second pass: populate parent and children keys correctly
  nodes.forEach(node => {
    const processedNode = nodeMap.get(node.id);
    if (!processedNode) {
      throw new Error('Not possible just for typescript');
    }

    if (processedNode.parentId !== null) {
      processedNode.parent = nodeMap.get(processedNode.parentId) || null;
    }

    processedNode.children = processedNode.childrenIds
      .map(childId => nodeMap.get(childId))
      .filter(
        (child: IProcessedGraphNode | undefined): child is IProcessedGraphNode => !!child
      );
  });

  // Use our first pass data to know the boundingRect
  graph.boundingRect = new DOMRect(
    boundingCoords.left,
    boundingCoords.top,
    boundingCoords.right - boundingCoords.left,
    boundingCoords.bottom - boundingCoords.top,
  );

  return graph;
}

function getSafeAccessors(accessors?: IGraphNodeAccessors): IGraphNodeAccessors {
  if (accessors) {
    return accessors;
  }

  return {
    getBounds: (node: IGraphNode) => {
      const { position, size } = getSafeBounds(node);

      return new WCRectangle(position.x, position.x + size.width, position.y, position.y + size.height);
    },
    getChildren: (node: IProcessedGraphNode) => {
      return node.children.map(node => node.id);
    },
  };
}

function getSafeBounds(node: IGraphNode) {
  let position = { x: 0, y: 0 };
  let size = { width: 10, height: 10 };

  if (node.position) {
    if (typeof node.position.x === 'number') {
      position.x = node.position.x;
    }
    if (typeof node.position.y === 'number') {
      position.y = node.position.y;
    }
  }
  if (node.size) {
    if (typeof node.size.width === 'number') {
      size.width = node.size.width;
    }
    if (typeof node.size.height === 'number') {
      size.height = node.size.height;
    }
  }

  return {
    position,
    size,
  };
}

function getWebcolaDefinition(graph: IGraph): IWebcolaDefinition {
  const { accessors, edges, nodes } = graph;

  const nodeIdToArrayPos = new Map();
  let counter = -1;
  const setId = (node) => {
    counter += 1;
    if (node) { nodeIdToArrayPos.set(node.id, counter); }
    return counter;
  };
  const wcNodes = new Map();

  // pass 1 to make wcNodes
  nodes.forEach((node: IGraphNode) => {
    const id = setId(node);
    const wcNode = {
      id: id,
      trueId: node.id,
      label: node.label,
      parent: undefined,
      leaf: true,
      rectangle: accessors.getBounds(node),
      children: [],
    };

    wcNodes.set(node.id, wcNode);
  });
  // pass 2 to add children and parents
  nodes.forEach((node: any) => {
    const wcNode = wcNodes.get(node.id);

    if (node.parentId !== null) {
      const parent = wcNodes.get(node.parentId);
      parent.children.push(nodeIdToArrayPos.get(node.id));
      parent.leaf = false;

      wcNode.parent = parent;
    }
  });

  const wcEdges = edges.map((edge) => {
    return {
      from: nodeIdToArrayPos.get(edge.from),
      to: nodeIdToArrayPos.get(edge.to),
    };
  });

  const definition:IWebcolaDefinition = {
    edges: wcEdges,
    nodes: Array.from(wcNodes.values()),
    accessors: accessors,
  };

  return definition;
}

function getFakeChildWCRect(node: IProcessedGraphNode, portSize: number, portGap?: number): WCRectangle {
  portGap = typeof portGap === 'number' ? portGap : Math.round(portSize / 2);
  const xOffset = portSize + portGap;

  return new WCRectangle(
    node.position.x + xOffset,
    node.position.x + node.size.width - xOffset,
    node.position.y,
    node.position.y + node.size.height,
  );
}
