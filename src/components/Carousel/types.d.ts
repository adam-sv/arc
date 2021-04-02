import type { RenderableContent } from '@adam-sv/arc';

export interface ICarouselProps<T = any> {
  sections: ISectionInput[];
  style?: React.CSSProperties;
  onDataSetup?: (sections: ISection[], entryMap: Map<string, IEntry>) => void;
  onClickTrack?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  onClickEntry?: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    entry: IEntry,
    section: ISection,
  ) => void;
}

export interface ISectionInput<T = any> {
  title: string;
  entries: IEntryInput<T>[];
}

export interface ISection extends ISectionInput {
  index: number;
  entries: IEntry[];
}

export interface IEntryInput<T = any> {
  contentGenerator: (entry: IEntry, section: ISection) => RenderableContent;
  expandedContentGenerator: (entry: IEntry, section: ISection) => RenderableContent;
  data: T;
}

export interface IEntry extends IEntryInput {
  id: string,
  element?: HTMLDivElement;
  index: number;
  sectionIndex: number;
  expand: () => void;
}
