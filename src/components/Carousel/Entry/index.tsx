// dependencies
import React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
// internals
import { CarouselStore } from '../Carousel.store';
// style
import './style.css';
// types
import type { IEntry, ISection } from '../types';

export interface IEntryProps {
  carouselStore?: CarouselStore;
  entryModel: IEntry;
}

@inject('carouselStore')
@observer
export class Entry extends React.Component<IEntryProps> {
  @computed get
  carouselStore(): CarouselStore {
    return this.props.carouselStore!;
  }

  @computed get
  entryModel(): IEntry {
    return this.props.entryModel;
  }

  @computed get
  sectionModel(): ISection {
    return this.carouselStore.getSection(this.props.entryModel.sectionIndex);
  }

  @computed get
  isLastEntry(): boolean {
    const { entryModel } = this;
    const { sectionIndex } = entryModel;
    return entryModel.index === (this.carouselStore.sections[sectionIndex].entries.length - 1)
  }

  @computed get
  dividerElement(): JSX.Element | undefined {
    const { entryModel } = this;
    const { sectionIndex, index } = entryModel;
    return this.isLastEntry
      ? undefined :
      <div
        key={`entry-${sectionIndex}-${index}-divider`}
        className="ArcCarousel-Entry-divider"
      ></div>
  }

  render() {
    const { contentGenerator } = this.entryModel;
    const content = contentGenerator(this.entryModel, this.sectionModel);
    return (
      <div
        className={'ArcCarousel-Entry'}
        onClick={ ev => this.carouselStore.eventsStore.didClickEntry(ev, this.entryModel) }
        ref={ el => this.entryModel.element = el ? el : undefined }
      >
        { content }
        { this.dividerElement }
      </div>
    )
  }
}
