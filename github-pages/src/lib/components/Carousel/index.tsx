// dependencies
import React, { useRef, useState } from 'react';
// internals
import { ExpansionOverlay } from './ExpansionOverlay';
import { Section } from './Section';
// style
import './style.scss';
// types
import {
  ICarouselProps,
  IEntryInput,
  IEntryEventParams,
  ISectionInput,
  IEntry,
  ISection,
  convertSectionInputs,
  IExpandEntry,
} from './types';

const getSectionElements = <T,>(
  sections: ISection<T>[],
  expandEntry: IExpandEntry<T>
): JSX.Element[] => {
  const sectionElems = sections.map((section: ISection<T>, index: number) => (
    <Section
      key={`section-${section.index}`}
      section={section}
      expandEntry={expandEntry}
      isLastSection={index === sections.length - 1}
    ></Section>
  ));
  const spacer = <Section key={`section-spacer`} expandEntry={expandEntry} />;
  return [...sectionElems, spacer];
};

const scrollLeft = (
  trackRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const trackElement = trackRef.current;
  if (trackElement) {
    trackElement.scroll({
      behavior: 'smooth',
      left: trackElement.scrollLeft - trackElement.offsetWidth * 0.75,
    });
  }
};

const scrollRight = (
  trackRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const trackElement = trackRef.current;
  if (trackElement) {
    trackElement.scroll({
      behavior: 'smooth',
      left: trackElement.scrollLeft + trackElement.offsetWidth * 0.75,
    });
  }
};

const didClickTrack = <T,>(
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  expandEntry: IExpandEntry<T>,
  onClickTrack?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
) => {
  event.stopPropagation();
  const { expandedEntry, setExpandedEntry } = expandEntry;
  if (expandedEntry) setExpandedEntry(null);
  if (onClickTrack) onClickTrack(event);
};

export const Carousel = <T,>({
  className,
  id,
  onClickTrack,
  onDataSetup,
  sections,
  style,
}: ICarouselProps<T>): JSX.Element => {
  const [expandedEntry, setExpandedEntry] = useState<IEntry<T> | null>(null);
  const trackRef = useRef(null);
  const processedSections = convertSectionInputs(
    sections,
    setExpandedEntry,
    trackRef
  );
  if (onDataSetup) onDataSetup(processedSections);

  const expandEntry = { expandedEntry, setExpandedEntry };
  const trackElement = (
    <div
      className='ArcCarousel-track'
      id={id}
      onClick={(ev) => didClickTrack(ev, expandEntry, onClickTrack)}
      style={style}
      ref={trackRef}
    >
      {getSectionElements(processedSections, expandEntry)}
      <span className='ArcCarousel-arrow ArcCarousel-arrow--left'>
        <div
          className='ArcCarousel-arrow-click-target'
          onClick={() => scrollLeft(trackRef)}
        ></div>
      </span>
      <span className='ArcCarousel-arrow ArcCarousel-arrow--right'>
        <div
          className='ArcCarousel-arrow-click-target'
          onClick={() => scrollRight(trackRef)}
        ></div>
      </span>
    </div>
  );

  return (
    <div
      style={style ? style : undefined}
      className={[
        'ArcCarousel',
        expandedEntry ? 'expanded' : 'not-expanded',
        className,
      ].join(' ')}
    >
      {trackElement}
      <ExpansionOverlay
        entry={expandedEntry || undefined}
        trackRef={trackRef}
      />
    </div>
  );
};

export type {
  ICarouselProps,
  IEntryInput,
  IEntryEventParams,
  ISectionInput,
  IEntry,
  ISection,
};
