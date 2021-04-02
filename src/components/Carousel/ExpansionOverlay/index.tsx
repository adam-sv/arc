// dependencies
import React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
// internals
import { CarouselStore } from '../Carousel.store';
// style
import './style.css';
// types
import type { RenderableContent } from '@adam-sv/arc';
import type { IEntry } from '../types';

const EXPANSION_MULTIPLIER = 1.4;

export interface IExpansionOverlayProps {
  carouselStore?: CarouselStore;
}

@inject('carouselStore')
@observer
export class ExpansionOverlay extends React.Component<IExpansionOverlayProps> {
  @computed get
  carouselStore(): CarouselStore {
    return this.props.carouselStore!;
  }

  @computed get
  entryModel(): IEntry | undefined {
    return this.carouselStore.expandedEntry;
  }

  @computed get
  trackElement(): HTMLDivElement |undefined {
    return this.carouselStore.trackElement;
  }

  @computed get
  content(): RenderableContent | undefined {
    return this.entryModel?.expandedContentGenerator(
      this.entryModel,
      this.carouselStore.getSectionFromEntry(this.entryModel),
    );
  }

  @computed get
  boundingBox(): DOMRect | undefined {
    return this.entryModel?.element?.getBoundingClientRect()
  }

  @computed get
  trackBoundingBox(): DOMRect | undefined {
    return this.trackElement?.getBoundingClientRect();
  }

  @computed get
  leftOffset(): number | undefined {
    const { boundingBox, trackBoundingBox } = this;
    // if the dimensions aren't available, retrun undefined
    if (!boundingBox || !trackBoundingBox) { return undefined; }

    const leftDiff = boundingBox.left - trackBoundingBox.left;
    const rightDiff = boundingBox.right - trackBoundingBox.right;
    const pxThreshold = ((EXPANSION_MULTIPLIER - 1) / 2) * boundingBox.width;

    if (leftDiff < pxThreshold) {
      return trackBoundingBox.left + pxThreshold;
    }
    if (rightDiff > (pxThreshold * -1)) {
      return (trackBoundingBox.left + trackBoundingBox.width)
        - (boundingBox.width + pxThreshold)
        - 2; // subtract 2 for border width x 2
    }

    return boundingBox.left;
  }

  @computed get
  expansionOverlayStyle(): React.CSSProperties {
    const { boundingBox, leftOffset } = this;
    return boundingBox ? {
      top: boundingBox.top,
      left: leftOffset,
      height: boundingBox.height,
      width: boundingBox.width,
    } : {};
  }

  @computed get
  expansionBackgroundStyle(): React.CSSProperties {
    const { boundingBox } = this;
    return boundingBox ? {
      top: ((EXPANSION_MULTIPLIER - 1) / 2) * boundingBox.height * -1,
      left: ((EXPANSION_MULTIPLIER - 1) / 2) * boundingBox.width * -1,
      height: boundingBox.height * EXPANSION_MULTIPLIER,
      width: boundingBox.width * EXPANSION_MULTIPLIER,
    } : {};
  }

  render() {
    const { expansionOverlayStyle, expansionBackgroundStyle } = this;
    return (
      <div className="ArcCarousel-ExpansionOverlay" style={expansionOverlayStyle}>
        <div className="ArcCarousel-ExpansionOverlay-bg" style={expansionBackgroundStyle}>
          { this.content }
        </div>
      </div>
    );
  }
}
