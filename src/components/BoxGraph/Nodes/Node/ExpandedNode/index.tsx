import { action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { INodeProps, Node } from '../';
import { RenderResults } from '@adam-sv/arc';
import { EdgeType } from '../../../const';
import { CollapsedNode } from '../CollapsedNode';
import { IBoxGraphNode } from '../types';
import './style.css';

@inject('boxGraphStore')
@observer
export class ExpandedNode extends Node {
  constructor(props: INodeProps) {
    super(props);
    if (this.props.expandedChildLayers) {
      this.childNodes.forEach((n: IBoxGraphNode) => this.boxGraphStore.nodesStore.setNodeExpanded(n, true));
    }
  }

  @computed get
  rightClickMenuOptions(): { label: string; onClick: () => void }[] {
    const { nodesStore, edgesStore } = this.boxGraphStore;
    const collapseOption = {
      label: 'Collapse',
      // iconUrl: `${mountedPath}/assets/delete_menu.svg`,
      onClick: () => {
        this.collapse();
        // window.modal.ensureClosed('BoxGraphContextMenu');
      },
    };
    if (!this.selectedNode || this.isSelected) {

      const defaultOptions = [
        {
          label: 'Copy',
          // iconUrl: `${mountedPath}/assets/copy_menu.svg`,
          onClick: () => {
            nodesStore.copyNode(this.nodeModel);
            // window.modal.ensureClosed('BoxGraphContextMenu');
          },
        },
        {
          label: 'Delete',
          // iconUrl: `${mountedPath}/assets/delete_menu.svg`,
          onClick: () => {
            nodesStore.deleteNode(this.nodeModel);
            // window.modal.ensureClosed('BoxGraphContextMenu');
          },
        },
      ];

      return this.boxGraphStore.nodesStore.isNodeCollapsible(this.nodeModel)
        ? [collapseOption, ...defaultOptions] : defaultOptions;
    }

    return [
      {
        label: 'Create Edge',
        // iconUrl: `${mountedPath}/assets/copy_menu.svg`,
        onClick: () => {
          edgesStore.createEdge(this.selectedNode!, this.nodeModel, EdgeType.Custom);
          // window.modal.ensureClosed('BoxGraphContextMenu');
        },
      },
    ];
  }

  @action.bound
  collapse() {
    this.boxGraphStore.nodesStore.setNodeExpanded(this.nodeModel, false);
  }

  @computed get
  childNodeElements() {
    const columns = this.boxGraphStore.nodesStore.getNodeColumns(this.nodeModel);
    return columns.map((columnId: string) => {
      const childrenForColumn = this.childNodes
        .filter((node: IBoxGraphNode) => `${node.columnId}` === columnId)
        .map((childNode, index) => childNode.isExpanded
          ? this.getExpandedNode(childNode, index)
          : this.getCollapsedNode(childNode, index)
        );
      return (
        <div
          key={columnId}
          className={[
            'ArcBoxGraph-ExpandedNode-children-column',
            `ArcBoxGraph-ExpandedNode-children-column-${columnId}`,
          ].join(' ')}
        >
          {childrenForColumn}
        </div>);
    });
  }

  getExpandedNode(nodeModel: IBoxGraphNode, index: number): JSX.Element {
    return (
      <ExpandedNode
        nodeModel={nodeModel}
        expandedChildLayers={this.props.expandedChildLayers
          ? this.props.expandedChildLayers - 1 : 0}
        key={`expanded-child-node-${index}`}
        boxGraphStore={this.boxGraphStore}
      />
    )
  }

  getCollapsedNode(nodeModel: IBoxGraphNode, index: number): JSX.Element {
    return (
      <CollapsedNode
        nodeModel={nodeModel}
        key={`expanded-child-node-${index}`}
        boxGraphStore={this.boxGraphStore}
      />
    )
  }

  @computed get
  childrenElement(): JSX.Element | undefined {
    return this.childNodes.length ?
      (<div className="ArcBoxGraph-ExpandedNode-children">
        { this.childNodeElements }
      </div>) : undefined
  }

  @computed get
  internalElements() {
    if (this.nodeModel.expandedContentGenerator) {
      return this.nodeModel.expandedContentGenerator(this.nodeModel);
    }
    if (this.nodeModel.title) {
      return this.nodeModel.title;
    }
    return this.nodeModel.id;
  }

  render(): RenderResults {
    return (
      <div
        className={[
          'ArcBoxGraph-Node ArcBoxGraph-ExpandedNode',
          this.nodeModel.className ? this.nodeModel.className : '',
          this.isBeingDragged ? 'drag' : '',
          this.isSelected ? 'selected' : '',
          (this.isBeingDraggedOverWithEligibleChild && !this.isBeingDragged) ? 'drag-over' : '',
        ].join(' ')}
        ref={elem => this.setNodeElementMapping(this.nodeModel, elem ? elem : undefined)}
        onClick={ev => this.click(ev)}
        onDoubleClick={ev => this.doubleClick(ev)}
        onDrop={ev => this.drop(ev)}
        onDragOver={ev => ev.preventDefault()}
        draggable={this.boxGraphStore.userInputProps.enableDrag ? 'true' : undefined}
        onDragStart={ev => this.drag(ev)}
        onDragEnter={ev => this.dragEnter(ev)}
        onDragLeave={ev => this.dragLeave(ev)}
        onContextMenu={ev => this.rightClick(ev)}
      >
        <div className="ArcBoxGraph-Node-drag-target"></div>
        { this.internalElements }
        { this.childrenElement }
      </div>
    );
  }
}
