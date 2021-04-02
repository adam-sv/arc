import { observable } from 'mobx';
import { DragStore } from './drag.store';
import { IBoxGraphEdge } from './Edges/Edge/types';
import { EdgesStore } from './Edges/Edges.store';
import { IBoxGraphNode } from './Nodes/Node/types';
import { NodesStore } from './Nodes/Nodes.store';
import { IBoxGraphProps, IBoxGraphHereditaryGroup } from './types';

export interface IBoxGraphStoreProps {
  defaultEdges: IBoxGraphEdge[];
  defaultNodes: IBoxGraphNode[];
  hereditaryGroups: IBoxGraphHereditaryGroup[];
  initialExpandedChildLayers: number;
  userInputProps: IBoxGraphProps;
}

export class BoxGraphStore {
  @observable public selectedNode: IBoxGraphNode | undefined = undefined;
  @observable public initialExpandedChildLayers: number;
  @observable public hereditaryGroups: IBoxGraphHereditaryGroup[];
  public userInputProps: IBoxGraphProps;
  public edgesStore: EdgesStore;
  public nodesStore: NodesStore;
  public dragStore: DragStore;

  constructor(props: IBoxGraphStoreProps) {
    this.userInputProps = props.userInputProps;
    this.nodesStore = new NodesStore({
      boxGraphStore: this,
      nodes: props.defaultNodes,
    });
    this.edgesStore = new EdgesStore({
      boxGraphStore: this,
      edges: props.defaultEdges,
    });
    this.dragStore = new DragStore({
      boxGraphStore: this,
    });
    this.hereditaryGroups = props.hereditaryGroups;
    this.initialExpandedChildLayers = props.initialExpandedChildLayers;
  }

  selectNode(node: IBoxGraphNode | undefined) {
    const selectedNode: any | undefined = this.selectedNode;
    if (!!selectedNode && node && node.id === selectedNode.id) {
      this.selectedNode = undefined;
    } else {
      this.selectedNode = node;
    }
  }
}
