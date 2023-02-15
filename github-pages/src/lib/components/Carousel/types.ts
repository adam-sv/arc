import { IARCProps } from '@adam-sv/arc';
import { generatePseudoRandomId, RenderableContent } from '@adam-sv/arc';
export interface ICarouselProps<T> extends IARCProps {
  sections: ISectionInput<T>[];
  onDataSetup?: (sections: ISection<T>[]) => void;
  onClickTrack?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClickEntry?: (params: IEntryEventParams<T>) => void;
}

export interface IEntryEventParams<T> {
  event: React.MouseEvent<HTMLDivElement, MouseEvent>;
  entry: IEntry<T>;
  section: ISection<T>;
}

export interface ISectionInput<T> {
  title: string;
  entries: IEntryInput<T>[];
}

export interface ISection<T> extends ISectionInput<T> {
  index: number;
  entries: IEntry<T>[];
}

export interface IEntryInput<T> {
  contentGenerator: (
    entry: IEntry<T>,
    section: ISection<T>
  ) => RenderableContent;
  expandedContentGenerator: (
    entry: IEntry<T>,
    section: ISection<T>
  ) => RenderableContent;
  data: T;
}

export interface IEntry<T> extends IEntryInput<T> {
  id: string;
  ref?: React.MutableRefObject<HTMLDivElement | null>;
  index: number;
  section: ISection<T>;
  expand: () => void;
  collapse: () => void;
  didClick?: (params: IEntryEventParams<T>) => void;
}

export interface IExpandEntry<T> {
  expandedEntry: IEntry<T> | null;
  setExpandedEntry: (entry: IEntry<T> | null) => void;
}

export const convertSectionInputs = <T>(
  sectionInputs: ISectionInput<T>[],
  setExpandedEntry: (entry: IEntry<T> | null) => void,
  trackRef: React.MutableRefObject<HTMLDivElement | null>
): ISection<T>[] => {
  // process each section input
  return sectionInputs.map(
    (sectionInput: ISectionInput<T>, sectionIndex: number) => {
      const section: ISection<T> = {
        ...sectionInput,
        index: sectionIndex,
        entries: [],
      };
      section.entries = sectionInput.entries.map(
        (entryInput: IEntryInput<T>, entryIndex: number) => {
          // construct IEntry
          const id = generatePseudoRandomId();

          const expand = () => {
            setExpandedEntry(entry);

            const entryElement = entry.ref?.current;
            if (entryElement && trackRef?.current) {
              const boundingBox = entryElement.getBoundingClientRect();
              const trackBoundingBox = trackRef.current.getBoundingClientRect();

              if (boundingBox.left - trackBoundingBox.left < 0) {
                entryElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'start',
                });
              }

              if (boundingBox.right - trackBoundingBox.right > 0) {
                entryElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'end',
                });
              }
            }
          };

          const entry: IEntry<T> = {
            ...entryInput,
            id,
            index: entryIndex,
            section,
            expand,
            collapse: () => setExpandedEntry(null),
          };

          return entry;
        }
      );

      // construct ISection
      return section ;
    }
  );
};
