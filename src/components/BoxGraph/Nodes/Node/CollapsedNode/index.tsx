import { RenderableContent, RenderResults } from '@adam-sv/arc';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { INodeProps, Node } from '../';
import './style.css';

@inject('boxGraphStore')
@observer
export class CollapsedNode extends Node {
  constructor(props: INodeProps) {
    super(props);
  }

  @computed get rightClickMenuOptions(): {
    label: string;
    onClick: () => void;
  }[] {
    const { nodesStore } = this.boxGraphStore;
    const expandOption = {
      label: 'Expand',
      // iconUrl: `${mountedPath}/assets/delete_menu.svg`,
      onClick: () => {
        this.boxGraphStore.nodesStore.setNodeExpanded(this.nodeModel, true);
        // window.modal.ensureClosed('BoxGraphContextMenu');
      },
    };
    if (!this.selectedNode || this.isSelected) {
      return [
        expandOption,
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
    }

    return [expandOption];
  }

  @computed get internalElements(): RenderableContent {
    if (this.nodeModel.collapsedContentGenerator) {
      return this.nodeModel.collapsedContentGenerator(this.nodeModel);
    }

    return (
      <div className="ArcBoxGraph-CollapsedNode-internal-content">
        <span>{this.nodeModel.title}</span>
        &nbsp;
        <span
          className="ArcBoxGraph-CollapsedNode-plus"
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            this.boxGraphStore.nodesStore.setNodeExpanded(this.nodeModel, true);
          }}
        >
          +
        </span>
      </div>
    );
  }

  render(): RenderResults {
    return (
      <div
        className={[
          'ArcBoxGraph-Node ArcBoxGraph-CollapsedNode',
          this.nodeModel.className ? this.nodeModel.className : '',
          this.isBeingDragged ? 'drag' : '',
          this.isSelected ? 'selected' : '',
          this.isBeingDraggedOverWithEligibleChild && !this.isBeingDragged
            ? 'drag-over'
            : '',
        ].join(' ')}
        ref={elem =>
          this.setNodeElementMapping(this.nodeModel, elem ? elem : undefined)
        }
        onClick={ev => this.click(ev)}
        onDoubleClick={ev => this.doubleClick(ev)}
        onDrop={ev => this.drop(ev)}
        onDragOver={ev => ev.preventDefault()}
        draggable={
          this.boxGraphStore.userInputProps.enableDrag ? 'true' : undefined
        }
        onDragStart={ev => this.drag(ev)}
        onDragEnter={ev => this.dragEnter(ev)}
        onDragLeave={ev => this.dragLeave(ev)}
        onContextMenu={ev => this.rightClick(ev)}
      >
        <div className="ArcBoxGraph-Node-drag-target"></div>
        {this.internalElements}
      </div>
    );
  }
}
