import { action, observable } from 'mobx';
import { BoxGraphStore } from './BoxGraph.store';
import { EdgeType, NodeType } from './const';
import { IBoxGraphNode } from './Nodes/Node/types';
export interface IDragStoreProps {
  boxGraphStore?: BoxGraphStore;
}

export class DragStore {
  @observable draggingNode: IBoxGraphNode | undefined;
  boxGraphStore: BoxGraphStore;

  constructor({ boxGraphStore }: IDragStoreProps) {
    this.boxGraphStore = boxGraphStore!; // root boxGraphStore
  }

  @action.bound
  dragNode(event: React.DragEvent, nodeType: NodeType, nodeModel: IBoxGraphNode) {
    const targetBoundingRect = event.target
      ? (event.target as HTMLDivElement).getBoundingClientRect()
      : undefined;

    if (!targetBoundingRect) {
      return;
    }

    const model = {...nodeModel};
    model.type = nodeType;
    model.dragCoords = {
      x: event.clientX - targetBoundingRect.x,
      y: event.clientY - targetBoundingRect.y,
    }
    this.draggingNode = model;
  }

  @action.bound
  dropOnViewport(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const { nodesStore } = this.boxGraphStore;
    const node: IBoxGraphNode = {...this.draggingNode!}; // draggingNode is not null b/c we're dropping
    const type = node.type;

    node.dropCoords = {
      x: event.clientX,
      y: event.clientY,
    };

    if (type === NodeType.Catalog) {
      nodesStore.addNode(node);
    }

    if (type === NodeType.Graph) {
      // if a graph node is dropped onto the viewport (i.e. background), remove all parents
      this.boxGraphStore.edgesStore.removeParentsFromNode(node);
      // nodesStore.updateNode(node);
    }

    this.draggingNode = undefined;
  }

  @action.bound
  dropOnNode(event: React.DragEvent<HTMLDivElement>, droppedOnNodeModel: IBoxGraphNode) {
    event.preventDefault();
    event.stopPropagation();
    const { nodesStore } = this.boxGraphStore;
    const draggingNode = { ...this.draggingNode! }; // draggingNode is not null b/c we're dropping
    const type = draggingNode.type;

    draggingNode.dropCoords = {
      x: event.clientX,
      y: event.clientY,
    };

    if (type === NodeType.Catalog) {
      nodesStore.addNode(draggingNode);
    }

    if (this.boxGraphStore.nodesStore.isNodeElibibleChild(draggingNode, droppedOnNodeModel)) {
      // if allowed, create hereditary edge
      this.boxGraphStore.edgesStore.createEdge(
        droppedOnNodeModel,
        draggingNode,
        EdgeType.Hereditary,
      );
    }

    this.draggingNode = undefined;
  }
}
