// dependencies
import React, { useRef } from 'react';
// style
import './style.scss';
// types
import type { IEntry, IExpandEntry, ISection } from '../types';

export interface IEntryProps<T> {
  entry: IEntry<T>;
  section: ISection<T>;
  expandEntry: IExpandEntry<T>;
  isLastEntry?: boolean;
}

const getDividerElement = <T,>(
  props: IEntryProps<T>
): JSX.Element | undefined => {
  const { entry, isLastEntry } = props;
  const { section, index } = entry;
  return isLastEntry ? undefined : (
    <div
      key={`entry-${section.index}-${index}-divider`}
      className='ArcCarousel-Entry-divider'
    ></div>
  );
};

const didClickEntry = <T,>(
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  entryProps: IEntryProps<T>
) => {
  const { entry, expandEntry } = entryProps;
  const { expandedEntry, setExpandedEntry } = expandEntry;
  const { didClick, section } = entry;
  if (!expandedEntry) {
    event.stopPropagation();
    setExpandedEntry(entry);
  }

  if (didClick) {
    didClick({ event, entry, section });
  }
};

export const Entry = <T,>(props: IEntryProps<T>): JSX.Element => {
  const { entry, section } = props;
  const { contentGenerator, didClick } = entry;
  const entryRef = useRef<HTMLDivElement | null>(null);
  entry.ref = entryRef;

  return (
    <div
      className={'ArcCarousel-Entry'}
      onClick={(event) => (didClick ? didClickEntry(event, props) : undefined)}
      ref={entryRef}
    >
      {contentGenerator(entry, section)}
      {getDividerElement(props)}
    </div>
  );
};
