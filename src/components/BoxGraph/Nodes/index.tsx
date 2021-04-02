// dependencies
import React from 'react';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
// internals
import { BoxGraphStore } from '../BoxGraph.store';
import { ExpandedNode } from './Node/ExpandedNode';
// style
import './style.css';
// types
import type { RenderResults } from '@adam-sv/arc';

export interface INodesProps {
  boxGraphStore?: BoxGraphStore;
  columnId: string | number;
}

@inject('boxGraphStore')
@observer
export class Nodes extends React.Component<INodesProps> {

  @computed get
  nodeElements(): JSX.Element[] {
    if (!this.props.boxGraphStore!.nodesStore.nodesContainerElement) {
      return [];
    }
    const { boxGraphStore } = this.props;
    const { nodesStore } = boxGraphStore!;
    const { rootNodes } = nodesStore;
    return rootNodes
      .filter((node) => `${node.columnId}` === `${this.props.columnId}`)
      .map((node, index) => {
        return (
          <ExpandedNode
            expandedChildLayers={boxGraphStore!.initialExpandedChildLayers - 1}
            nodeModel={node}
            key={`root-node-${index}`}
          />
        )
      });
  }

  @action.bound
  setNodesContainerRef(element: HTMLDivElement) {
    this.props.boxGraphStore!.nodesStore.nodesContainerElement = element;
  }

  render(): RenderResults {
    return (
      <div className='ArcBoxGraph-Nodes' ref={this.setNodesContainerRef}>
        {this.nodeElements}
      </div>
    );
  }
}
