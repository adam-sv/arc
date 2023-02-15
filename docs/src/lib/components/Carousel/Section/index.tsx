// dependencies
import React from 'react';
import { Entry } from '../Entry';
//style
import './style.scss';
// types
import type { IEntry, IExpandEntry, ISection } from '../types';

export interface ISectionProps<T> {
  section?: ISection<T>;
  isLastSection?: boolean;
  expandEntry: IExpandEntry<T>;
}

const getEntryElements = <T,>(
  section: ISection<T>,
  expandEntry: IExpandEntry<T>,
): JSX.Element[] => {
  if (!section) return [];
  return section.entries.map((entry: IEntry<T>, index: number) =>
    <Entry
      key={`entry-${entry.index}`}
      entry={entry}
      section={section}
      expandEntry={expandEntry}
      isLastEntry={index === (section.entries.length - 1)}
    ></Entry>);
};

const getDividerElement = <T,>(
  section: ISection<T>,
  isLastSection?: boolean,
): JSX.Element | undefined => {
  if (!section) { return undefined; }
  return isLastSection
    ? undefined
    : <div
      key={`section-${section.index}-divider`}
      className='ArcCarousel-Section-divider'
    ></div>;
};

export const Section = <T,>(props: ISectionProps<T>): JSX.Element => {
  const { section, isLastSection, expandEntry } = props;
  if (!section) return (
    <div className='ArcCarousel-Section ArcCarousel-Section--spacer'>
      <span className='ArcCarousel-Section-title'></span>
      <div className='ArcCarousel-Section-entries'></div>
    </div>
  );
  const entryElements = getEntryElements(section, expandEntry);
  const dividerElement = getDividerElement(section, isLastSection);
  return(
    <div className='ArcCarousel-Section'>
      <span className='ArcCarousel-Section-title'>
        { section ? section.title : '' }
      </span>
      <div className='ArcCarousel-Section-entries'>
        { entryElements }
        { dividerElement }
      </div>
    </div>
  );
};
