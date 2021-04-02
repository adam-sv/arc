import { action, computed, observable } from 'mobx';
import { generatePseudoRandomId } from '../../util';
import { EventsStore } from './events.store';
import { IEntry, IEntryInput, ISection, ISectionInput } from './types';

export interface ICarouselStoreProps {
  sections: ISectionInput[];
  onDataSetup?: (sections: ISection[], entryMap: Map<string, IEntry>) => void;
  onClickTrack?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  onClickEntry?: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    entry: IEntry,
    section: ISection,
  ) => void;
}

export class CarouselStore {
  public eventsStore: EventsStore;

  @observable private _expandedEntry: IEntry | undefined = undefined;
  @observable entryMap: Map<string, IEntry> = new Map();
  @observable trackElement: HTMLDivElement | undefined = undefined;
  @observable sections: ISection[];

  constructor(props: ICarouselStoreProps) {
    const { onClickEntry, onClickTrack, sections, onDataSetup } = props;
    this.eventsStore = new EventsStore({
      carouselStore: this,
      onClickEntry,
      onClickTrack,
    });

    this.sections = this.convertSectionInputs(sections);
    if (onDataSetup) {
      onDataSetup(this.sections, this.entryMap);
    }
  }

  convertSectionInputs(sectionInputs: ISectionInput[]): ISection[] {
    // process each section input
    return sectionInputs
      .map((sectionInput: ISectionInput, sectionIndex: number) => {
        // process entry inputs for section input
        const entries: IEntry[] = sectionInput.entries
          .map((entryInput: IEntryInput, entryIndex: number) => {
            // construct IEntry
            const id = generatePseudoRandomId();
            const entry = {
              ...entryInput,
              id,
              index: entryIndex,
              sectionIndex,
              expand: () => { this.expandEntry(id) },
              collapse: () => { this.collapseExpansion() },
            } as IEntry;
            this.entryMap.set(id, entry);
            return entry;
          });

        // construct ISection
        return {
          ...sectionInput,
          index: sectionIndex,
          entries,
        } as ISection;
      });
  }

  expandEntry(entryId: string) {
    this.setExpandedEntry(this.entryMap.get(entryId));
  }

  collapseExpansion() {
    this.setExpandedEntry(undefined);
  }

  getSection(sectionIndex: number) {
    return this.sections[sectionIndex];
  }

  getSectionFromEntry(entry: IEntry) {
    return this.getSection[entry.sectionIndex];
  }

  @action.bound
  scrollLeft() {
    const { trackElement } = this;
    if (trackElement) {
      trackElement.scroll({
        behavior: 'smooth',
        left: trackElement.scrollLeft - (trackElement.offsetWidth * 0.75),
      });
    }
  }

  @action.bound
  scrollRight() {
    const { trackElement } = this;
    if (trackElement) {
      trackElement.scroll({
        behavior: 'smooth',
        left: trackElement.scrollLeft + (trackElement.offsetWidth * 0.75),
      });
    }
  }

  @action.bound
  setTrackElement(element: HTMLDivElement) {
    this.trackElement = element;
  }

  @computed get
  expandedEntry(): IEntry | undefined {
    return this._expandedEntry;
  }

  @action.bound
  setExpandedEntry(entry: IEntry | undefined) {
    if (this.expandedEntry || !entry) { this._expandedEntry = undefined; }
    if (!this.trackElement || !entry || !entry.element) { return; }

    const boundingBox = entry.element.getBoundingClientRect();
    const trackBoundingBox = this.trackElement.getBoundingClientRect();

    if ((boundingBox.left - trackBoundingBox.left) < 0)  {
      entry.element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    if ((boundingBox.right - trackBoundingBox.right) > 0)  {
      entry.element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
    }

    this._expandedEntry = entry;
  }
}
