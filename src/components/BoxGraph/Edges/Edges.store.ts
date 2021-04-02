import { computed, observable } from 'mobx';
import { ICoords } from '@adam-sv/arc';
import { generatePseudoRandomId } from '../../../util';
import { BoxGraphStore } from '../BoxGraph.store';
import { IBoxGraphNode } from '../Nodes/Node/types';
import { EdgeType } from './../const';
import { IBoxGraphEdge } from './Edge/types';
export interface IEdgesStoreProps {
  boxGraphStore: BoxGraphStore;
  edges: IBoxGraphEdge[];
}

export class EdgesStore {
  @observable terminatingCoords = new Map();
  @observable originatingCoords = new Map();
  @observable edgesContainerElement: HTMLDivElement | undefined = undefined;
  @observable _edges = new Map<string, IBoxGraphEdge>();
  @computed get edges(): IBoxGraphEdge[] { return Array.from(this._edges.values()) };

  boxGraphStore: BoxGraphStore;

  @computed get
  edgeCount() {
    return this.edges.length;
  }

  constructor({ boxGraphStore, edges }: IEdgesStoreProps) {
    this.boxGraphStore = boxGraphStore; // root boxGraphStore

    [...edges].forEach(edge => {
      if (!edge.id) {
        edge.id = generatePseudoRandomId();
      }

      this.setEdge(edge.id, edge);
    });
  }

  getEdge(id: string) {
    return this._edges.get(id);
  }

  setEdge(id: string, edge: IBoxGraphEdge) {
    this._edges.set(id, edge);
  }

  updateEdgeCoords(
    edgeModel: IBoxGraphEdge,
    originatingCoords: ICoords | undefined,
    terminatingCoords: ICoords | undefined,
  ) {
    this.originatingCoords.set(edgeModel.id, originatingCoords);
    this.terminatingCoords.set(edgeModel.id, terminatingCoords);
  }

  createEdge(nodeA: IBoxGraphNode, nodeB: IBoxGraphNode, type: EdgeType) {
    if (nodeA.id !== nodeB.id) {
      if (type === EdgeType.Hereditary) {
        // if we're making a hereditary edge, ensure there are no existing parents on nodeB
        this.removeParentsFromNode(nodeB);
      }
      const id = generatePseudoRandomId();
      const edge: IBoxGraphEdge = {
        id,
        type: type ? type : EdgeType.Custom,
        nodes: [nodeA.id!, nodeB.id!],
      };

      this.setEdge(id, edge);
    }
  }

  removeParentsFromNode(node: IBoxGraphNode) {
    [...this.edges]
      .filter((edge) => {
        return edge.type === EdgeType.Hereditary && edge.nodes[1] === node.id;
      })
      .forEach((edge: IBoxGraphEdge) => this._edges.delete(edge.id!));
  }

  getParentsForNode(node: IBoxGraphNode): IBoxGraphNode[] {
    return [...this.edges]
      .filter((edge: IBoxGraphEdge) => {
        return edge.type === EdgeType.Hereditary && edge.nodes[1] === node.id;
      })
      .map((edge: IBoxGraphEdge) => {
        return this.boxGraphStore.nodesStore.nodes.find((n: IBoxGraphNode) => n.id === edge.nodes[0])!
      });
  }

  getEdgesForNode(node: IBoxGraphNode): IBoxGraphEdge[] {
    return [...this.edges].filter((edge) => {
      return edge.nodes.find(nodeId => nodeId === node.id);
    });
  }

  deleteEdgesForNode(node: IBoxGraphNode) {
    const edgesRelatedToNode = this.getEdgesForNode(node);
    edgesRelatedToNode.forEach((edge: IBoxGraphEdge) => this._edges.delete(edge.id!))
  }
}
