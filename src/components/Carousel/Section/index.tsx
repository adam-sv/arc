// dependencies
import React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
// internals
import { CarouselStore } from '../Carousel.store';
import { Entry } from '../Entry';
//style
import './style.css';
// types
import type { IEntry, ISection } from '../types';

export interface ISectionProps {
  carouselStore?: CarouselStore;
  sectionModel?: ISection;
}

@inject('carouselStore')
@observer
export class Section extends React.Component<ISectionProps> {
  constructor(props) {
    super(props);
  }

  @computed get
  carouselStore(): CarouselStore {
    return this.props.carouselStore!;
  }

  @computed get
  sectionModel(): ISection | undefined {
    return this.props.sectionModel;
  }

  @computed get
  entryElements(): JSX.Element[] {
    const { sectionModel } = this;
    if (!sectionModel) {
      return [];
    }
    return sectionModel.entries.map((entry: IEntry) =>
      <Entry key={`entry-${entry.index}`} entryModel={entry}></Entry>)
  }

  @computed get
  dividerElement(): JSX.Element | undefined {
    const { sectionModel } = this;
    if (!sectionModel) { return undefined }
    return sectionModel.index === (this.carouselStore.sections.length - 1)
      ? undefined :
      <div
        key={`section-${sectionModel.index}-divider`}
        className="ArcCarousel-Section-divider"
      ></div>
  }

  render() {
    const { sectionModel } = this;
    return(
      <div
        className={[
          'ArcCarousel-Section',
          sectionModel ? '' : 'ArcCarousel-Section--spacer',
        ].join(' ')}
      >
        <span className="ArcCarousel-Section-title">
          { sectionModel ? sectionModel.title : '' }
        </span>
        <div className="ArcCarousel-Section-entries">
          { this.entryElements }
          { this.dividerElement }
        </div>
      </div>
    )
  }
}
