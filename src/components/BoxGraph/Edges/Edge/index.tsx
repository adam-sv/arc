import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { ICoords, RenderResults } from '@adam-sv/arc';
import { BoxGraphStore } from '../../BoxGraph.store';
import './style.css';
import { IBoxGraphEdge } from './types';

export interface IEdgeProps {
  boxGraphStore?: BoxGraphStore;
  edgeModel: IBoxGraphEdge;
}

@inject('boxGraphStore')
@observer
export class Edge extends React.Component<IEdgeProps> {
  @computed get
  edgeModel(): IBoxGraphEdge {
    return this.props.edgeModel;
  }

  @computed get
  boxGraphStore(): BoxGraphStore {
    return this.props.boxGraphStore!;
  }

  @computed get
  originatingCoords(): ICoords {
    return this.boxGraphStore.edgesStore.originatingCoords.get(this.edgeModel.id);
  }

  @computed get
  terminatingCoords(): ICoords {
    return this.boxGraphStore.edgesStore.terminatingCoords.get(this.edgeModel.id);
  }

  @computed get
  lineRise(): number {
    return this.terminatingCoords.y - this.originatingCoords.y;
  }

  @computed get
  lineRun(): number {
    return this.terminatingCoords.x - this.originatingCoords.x;
  }

  @computed get
  rotationTransform(): string {
    const slope = this.lineRise / this.lineRun;
    const radians = Math.atan(slope);
    let degrees = radians * (180 / Math.PI);
    if (this.lineRun < 0) {
      degrees += 180;
    }

    return `rotate(${degrees}deg)`;
  }

  @computed get
  lineLength(): number {
    return Math.sqrt((this.lineRise * this.lineRise) + (this.lineRun * this.lineRun));
  }

  render(): RenderResults {
    if (!this.originatingCoords) {
      return '';
    }

    const draggingNode = this.boxGraphStore.dragStore.draggingNode;

    if (draggingNode && this.edgeModel.nodes.find(nodeId => nodeId === draggingNode.id)) {
      return '';
    }

    const style = {
      top: this.originatingCoords.y,
      left: this.originatingCoords.x,
      transform: this.rotationTransform,
      width: this.lineLength,
    };

    return (
      <div
        className={[
          'ArcBoxGraph-Edge',
          this.edgeModel.type,
          this.edgeModel.originHidden ? 'origin-hidden' : 'origin-visible',
          this.edgeModel.terminusHidden ? 'terminus-hidden' : 'terminus-visible',
        ].join(' ')}
        style={style}
      >
        <div className={'origin-icon'}></div>
        <div className={'terminus-icon'}></div>
      </div>
    );
  }
}
