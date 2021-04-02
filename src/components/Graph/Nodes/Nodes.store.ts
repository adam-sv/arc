// types
import type { IGraphProps, IGraphStores } from '../types';

export class NodesStore {
  props: IGraphProps;
  stores: IGraphStores;
  nodeBbMap: Map<string, any>;

  constructor() {
    this.stores = null;
    this.props = null;
    this.nodeBbMap = new Map();

    ['_getNode', '_getPosition', '_getSize'].forEach(method =>
      this[method] = this[method].bind(this)
    );
  }

  initialize(props: IGraphProps, stores: IGraphStores) {
    this.props = props;
    this.stores = stores;
  }

  update(nextProps) {
    this.props = nextProps;

    this.updateNodePositions();
  }

  updateNodePositions() {
    this.nodes.forEach((node: any) => {
      this.nodeBbMap.set(node.id, this._getPosition(node));
    });
  }

  getSrcAndDstPositions(edge): { fromPos: DOMRect; toPos: DOMRect } {
    return {
      fromPos: this.nodeBbMap.get(edge.from),
      toPos: this.nodeBbMap.get(edge.to),
    };
  }

  get nodes() {
    return this.props.graph.rootNodes || [];
  }

  get portSize() {
    return this.props.portSize || 10;
  }

  get contextBoundingRect(): DOMRect {
    const { graph } = this.props;
    const { boundingRect } = graph;

    return boundingRect;
  }

  _getNode(id) {
    // TODO: fix it
    return this.nodes.find(node => node.id === id) || this.nodes[0];
  }

  _getInputs(node) {
    return node.inputs || [];
  }

  _getOutputs(node) {
    return node.outputs || [];
  }

  _getPosition(node) {
    return this.props.graph.getAbsolutePosition(node);
  }

  _getSize(node) {
    return node.size || { width: 180, height: 80 };
  }
}
