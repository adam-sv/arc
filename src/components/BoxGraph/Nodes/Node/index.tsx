import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { RenderResults } from '@adam-sv/arc';
import { BoxGraphStore } from '../../BoxGraph.store';
import { NodeType } from '../../const';
import { spawnRightClickMenu } from '../../rightClick';
import { defaultState } from './state';
import './style.css';
import { IBoxGraphNode } from './types';

const CLICK_TIMEOUT = 200;
let doubleClickHappened = false;

export interface INodeProps {
  boxGraphStore?: BoxGraphStore;
  nodeModel: IBoxGraphNode;
  expandedChildLayers?: number,
}

@observer
export class Node extends React.Component<INodeProps> {
  @observable $state = defaultState;

  @computed get
  isBeingDraggedOverWithEligibleChild(): boolean {
    const draggingNode = this.boxGraphStore.dragStore.draggingNode;
    if (!draggingNode) {
      return false;
    }
    return !!this.$state.isBeingDraggedOver
      && this.boxGraphStore.nodesStore.isNodeElibibleChild(draggingNode, this.nodeModel);
  }

  @computed get
  nodeModel(): IBoxGraphNode {
    return this.props.nodeModel;
  }

  @computed get
  boxGraphStore(): BoxGraphStore {
    return this.props.boxGraphStore!;
  }

  @computed get
  isBeingDragged(): boolean {
    return !!this.boxGraphStore.dragStore.draggingNode
      && this.boxGraphStore.dragStore.draggingNode.id === this.nodeModel.id;
  }

  @computed get
  selectedNode(): IBoxGraphNode | undefined {
    return this.boxGraphStore.selectedNode;
  }

  @computed get
  isSelected(): boolean {
    return !!this.selectedNode
      && this.selectedNode.id === this.nodeModel.id;
  }

  @computed get
  childNodes(): IBoxGraphNode[] {
    // the node models which are the target (i.e. child) of an outgoing hereditary relationship
    return this.boxGraphStore.nodesStore.getChildNodes(this.nodeModel);
  }

  @computed get
  rightClickMenuOptions(): { label: string; onClick: () => void }[] {
    return [];
  }

  constructor(props: INodeProps) {
    super(props);
  }

  @action.bound
  rightClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    if (!this.boxGraphStore.userInputProps.enableRightClick) {
      return;
    }
    event.persist();
    event.preventDefault();
    spawnRightClickMenu(event, this.rightClickMenuOptions);
  }

  @action.bound
  drag(event: React.DragEvent<HTMLDivElement>) {
    event.persist();
    event.stopPropagation();
    setTimeout(() => {
      this.boxGraphStore.dragStore.dragNode(event, NodeType.Graph, this.nodeModel);
    }, 0);
  }

  @action.bound
  click(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.persist();
    event.preventDefault();
    event.stopPropagation();

    setTimeout(() => {
      if (!doubleClickHappened) {
        this.boxGraphStore.selectNode(this.nodeModel);
        if (this.nodeModel.onClick) {
          this.nodeModel.onClick(event, this.nodeModel);
        }
      }
    }, CLICK_TIMEOUT);
  }

  @action.bound
  doubleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.persist();
    event.preventDefault();
    event.stopPropagation();

    if (!doubleClickHappened) {
      doubleClickHappened = true;

      if (!!this.nodeModel.onDoubleClick) {
        this.nodeModel.onDoubleClick(event, this.nodeModel);
      } else {
        // if no double click function supplied, just toggle node expansion
        this.boxGraphStore.nodesStore.setNodeExpanded(this.nodeModel, !this.nodeModel.isExpanded);
      }
      setTimeout(() => {
        doubleClickHappened = false;
      }, CLICK_TIMEOUT);
    }
  }

  @action.bound
  setNodeElementMapping(node: IBoxGraphNode, elem: HTMLDivElement | undefined) {
    this.boxGraphStore.nodesStore.addNodeElementMapping(node, elem);
  }

  @action.bound
  drop(event: React.DragEvent<HTMLDivElement>) {
    this.$state.isBeingDraggedOver = 0;
    this.boxGraphStore.dragStore.dropOnNode(event, this.nodeModel);
  }

  @action.bound
  dragEnter(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    this.$state.isBeingDraggedOver += 1;
  }

  @action.bound
  dragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    this.$state.isBeingDraggedOver -= 1;
  }

  render(): RenderResults {
    return '';
  }
  /* END RENDERING */
}
