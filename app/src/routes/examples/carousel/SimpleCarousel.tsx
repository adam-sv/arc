import { useState } from 'react';
import { Carousel, getRandomInt, Panel } from '@adam-sv/arc';
import type {
  IEntryInput,
  IEntryEventParams,
  ISectionInput,
} from '@adam-sv/arc';

interface IDatum {
  section: number;
  entry: number;
}

const getEntries = (
  sectionIndex: number,
  didClickEntry: (entry: IEntryEventParams<IDatum>) => unknown
): IEntryInput<IDatum>[] =>
  new Array(getRandomInt(5, 10))
    .fill(0)
    .map((sectionIndex: number, entryIndex: number) => ({
      contentGenerator: () =>
        `Section ${sectionIndex} - Entry ${entryIndex} Content`,
      expandedContentGenerator: () =>
        `Section ${sectionIndex} - Entry ${entryIndex} Content Expand`,
      data: { section: sectionIndex, entry: entryIndex } as IDatum,
      didClick: didClickEntry,
    }));

const getSections = (
  didClickEntry: (entry: IEntryEventParams<IDatum>) => unknown
): ISectionInput<IDatum>[] =>
  new Array(10).fill(0).map((zero: number, sectionIndex: number) => ({
    title: `Section ${sectionIndex}`,
    entries: getEntries(sectionIndex, didClickEntry),
  }));

export default function SimpleCarousel(): JSX.Element {
  const [entry, setEntry] = useState<IDatum>();
  const [sections] = useState(() =>
    getSections(({ entry }) => {
      console.info({ entry });
      setEntry(entry.data);
    })
  );

  let value = '-';
  if (entry) {
    console.info({ entry });
    value = `Section ${entry.section} - Entry ${entry.entry}`;
  }

  return (
    <Panel style={{ minHeight: 400, display: 'flex', flexDirection: 'column' }}>
      <div style={{ minHeight: 120, display: 'grid', placeContent: 'center' }}>
        <i>Current value:</i>
        <b>{value}</b>
      </div>
      <Carousel<IDatum>
        className='SimpleCarousel'
        sections={sections}
        onDataSetup={(sections) => {
          console.info({ sections });
        }}
      />
    </Panel>
  );
}
