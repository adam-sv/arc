// dependencies
import React from 'react';
import { action, computed, reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
// internals
import { BoxGraphStore } from '../BoxGraph.store';
import { EdgeType } from './../const';
import { getClosestPointsBetweenRects } from './const';
import { Edge } from './Edge';
// style
import './style.css';
// types
import type { ICoords, RenderResults } from '@adam-sv/arc';
import type { IBoxGraphEdge } from './Edge/types';

export interface IEdgesProps {
  boxGraphStore?: BoxGraphStore;
}

@inject('boxGraphStore')
@observer
export class Edges extends React.Component<IEdgesProps> {

  reactionDisposer = reaction(
    () => [...Array.from(this.nodeElementMap.values()), ...this.edges],
    () => this.recomputeCoords(),
  );

  componentWillUnmount() {
    this.reactionDisposer();
  }

  @computed get
  boxGraphStore() {
    return this.props.boxGraphStore!;
  }

  @computed get
  edgesStore() {
    return this.boxGraphStore.edgesStore;
  }

  @computed get
  nodesStore() {
    return this.boxGraphStore.nodesStore;
  }

  @action.bound
  recomputeCoords() {
    const { edgesStore, nodesStore } = this;

    return this.edges
      .filter((edge: IBoxGraphEdge) => edge.type !== EdgeType.Hereditary)
      .map((edge: IBoxGraphEdge) => {
        const origNode = nodesStore.getNode(edge.nodes[0]);
        const termNode = nodesStore.getNode(edge.nodes[1]);

        if (!origNode || !termNode) { return; }
        const origClosestVisible = nodesStore.getClosestVisibleAncestor(origNode)!;
        const termClosestVisible = nodesStore.getClosestVisibleAncestor(termNode)!;

        edge.originHidden = origNode.id !== origClosestVisible.id;
        edge.terminusHidden = termNode.id !== termClosestVisible.id;

        if (!origClosestVisible || !termClosestVisible) { return; }
        const origElement = this.nodeElementMap.get(origClosestVisible.id!);
        const termElement = this.nodeElementMap.get(termClosestVisible.id!);

        const containerElement = this.props.boxGraphStore!.edgesStore.edgesContainerElement;

        if (origElement && containerElement && termElement) {
          const origElementRect: DOMRect = origElement.getBoundingClientRect();
          const containerElementRect: DOMRect = containerElement.getBoundingClientRect();
          const termElementRect: DOMRect = termElement.getBoundingClientRect();
          const [originatingCoords, terminatingCoords] =
            getClosestPointsBetweenRects(origElementRect, termElementRect)
            .map((coords: ICoords) => {
              return {
                x: coords.x - containerElementRect.x,
                y: coords.y - containerElementRect.y,
              } as ICoords;
            });

          edgesStore.updateEdgeCoords(edge, originatingCoords, terminatingCoords);
        } else {
          edgesStore.updateEdgeCoords(edge, undefined, undefined);
        }
      });
  }

  @computed get
  nodeElementMap(): Map<string, HTMLDivElement | undefined> {
    return this.props.boxGraphStore!.nodesStore.nodeElementMap;
  }

  @computed get
  edges(): IBoxGraphEdge[] {
    return this.props.boxGraphStore!.edgesStore.edges;
  }

  @computed get
  edgeElements(): JSX.Element[] {
    return this.edges
      .filter((edge: IBoxGraphEdge) => {
        if (edge.type === EdgeType.Hereditary) { return false; }
        return this.nodesStore.getNode(edge.nodes[0]);
      })
      .map((edge: IBoxGraphEdge) => {
        return (
          <Edge
            edgeModel={edge}
            key={`edge-${edge.id}`}
          />
        )
      });
  }

  @action.bound
  setEdgesContainerRef(element: HTMLDivElement) {
    this.props.boxGraphStore!.edgesStore.edgesContainerElement = element;
  }

  render(): RenderResults {
    return (
      <div className='ArcBoxGraph-Edges' ref={this.setEdgesContainerRef}>
        {this.edgeElements}
      </div>
    );
  }
}
