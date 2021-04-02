// dependencies
import React from 'react';
import { computed, observable } from 'mobx';
import { observer, Provider } from 'mobx-react';
// internals
import { CarouselStore } from './Carousel.store';
import { EventsStore } from './events.store';
import { ExpansionOverlay } from './ExpansionOverlay';
import { Section } from './Section';
// style
import './style.css';
// types
import type { ICarouselProps, IEntryInput, ISectionInput, IEntry, ISection } from './types';

@observer
export class Carousel extends React.Component<ICarouselProps> {
  carouselStore: CarouselStore;

  constructor(props: ICarouselProps) {
    super(props);

    this.carouselStore = new CarouselStore({
      sections: props.sections
    });
  }

  @computed get
  eventsStore(): EventsStore {
    return this.carouselStore.eventsStore;
  }

  @computed get
  sectionElements(): JSX.Element[] {
    const sections = this.carouselStore.sections.map((section: ISection) =>
      <Section key={`section-${section.index}`} sectionModel={section}></Section>
    );
    const spacer = <Section key={`section-spacer`}></Section>
    return [...sections, spacer];
  }

  @computed get
  trackElement(): JSX.Element {
    return (
      <div
        onClick={ ev => this.eventsStore.didClickTrack(ev) }
        className='ArcCarousel-track'
        ref={ el => this.carouselStore.trackElement = el ? el : undefined }
      >
        { this.sectionElements }
        <span className="ArcCarousel-arrow ArcCarousel-arrow--left">
          <div
            className="ArcCarousel-arrow-click-target"
            onClick={this.carouselStore.scrollLeft}
          ></div>
        </span>
        <span className="ArcCarousel-arrow ArcCarousel-arrow--right">
          <div
            className="ArcCarousel-arrow-click-target"
            onClick={this.carouselStore.scrollRight}
          ></div>
        </span>
      </div>
    );
  }

  render() {
    return (
      <Provider carouselStore={ this.carouselStore }>
        <div
          style={this.props.style ? this.props.style : undefined}
          className={[
            'ArcCarousel',
            this.carouselStore.expandedEntry ? 'expanded' : 'not-expanded',
          ].join(' ')}
        >
          { this.trackElement }
          <ExpansionOverlay />
        </div>
      </Provider>
    );
  }
}

export type { ICarouselProps, IEntryInput, ISectionInput, IEntry, ISection };
