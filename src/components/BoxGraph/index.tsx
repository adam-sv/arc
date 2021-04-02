// dependencies
import React from 'react';
import { computed, observable } from 'mobx';
import { observer, Provider } from 'mobx-react';
// internals
import { BoxGraphStore } from './BoxGraph.store';
import { Edges } from './Edges';
import { Nodes } from './Nodes';
// style
import './style.css';
// types
import type { RenderResults } from '@adam-sv/arc';
import type { IBoxGraphProps, IBoxGraphHereditaryGroup } from './types';
import type { IBoxGraphNode } from './Nodes/Node/types';
import type { IBoxGraphEdge } from './Edges/Edge/types';

// window.modal = window.modal || {};

@observer
export class BoxGraph extends React.Component<IBoxGraphProps> {
  @observable boxGraphStore: BoxGraphStore;

  constructor(props: IBoxGraphProps) {
    super(props);
    this.boxGraphStore = new BoxGraphStore({
      userInputProps: props,
      defaultNodes: props.nodes ? props.nodes : [],
      defaultEdges: props.edges ? props.edges : [],
      hereditaryGroups: props.hereditaryGroups ? props.hereditaryGroups : [],
      initialExpandedChildLayers: props.initialExpandedChildLayers
        ? props.initialExpandedChildLayers : 0,
    });
  }

  @computed get
  drop() {
    return this.boxGraphStore.dragStore.dropOnViewport;
  }

  @computed get
  graphColumns(): JSX.Element | JSX.Element[] {
    return this.boxGraphStore.nodesStore.getNodeColumns().map((columnId: string) =>
      <Nodes key={columnId} columnId={columnId}/>
    );
  }

  render(): RenderResults {
    return (
      <Provider boxGraphStore={ this.boxGraphStore }>
        <div className='ArcBoxGraph'>
          <div className="ArcBoxGraph-viewport"
            onDrop={e => this.drop(e)}
            onDragOver={e => e.preventDefault()}>
            { this.graphColumns }
            <Edges />
          </div>
        </div>
      </Provider>
    );
  }
}

export type { IBoxGraphProps, IBoxGraphHereditaryGroup, IBoxGraphEdge, IBoxGraphNode };
