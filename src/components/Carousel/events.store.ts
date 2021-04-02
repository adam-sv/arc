import { action } from 'mobx';
import { CarouselStore } from './Carousel.store';
import { IEntry, ISection } from './types';

export interface IEventsStoreProps {
  carouselStore?: CarouselStore;
  onClickTrack?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  onClickEntry?: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    entry: IEntry,
    section: ISection,
  ) => void;
}

export class EventsStore {
  carouselStore: CarouselStore;
  props: IEventsStoreProps;

  constructor(props: IEventsStoreProps) {
    this.carouselStore = props.carouselStore!;
    this.props = props;
  }

  @action.bound
  didClickTrack(event)  {
    event.stopPropagation();
    const { expandedEntry, setExpandedEntry } = this.carouselStore;
    if (expandedEntry) {
      setExpandedEntry(undefined);
    }

    if (this.props.onClickTrack) {
      this.props.onClickTrack(event);
    }
  }

  @action.bound
  didClickEntry(event, entry: IEntry) {
    const { expandedEntry, setExpandedEntry } = this.carouselStore;
    if (!expandedEntry)  {
      event.stopPropagation();
      setExpandedEntry(entry);
    }

    if (this.props.onClickEntry) {
      this.props.onClickEntry(event, entry, this.carouselStore.getSectionFromEntry(entry));
    }
  }
}
