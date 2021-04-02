import { storiesOf } from '@storybook/react';
import React, { SyntheticEvent, useState } from 'react';

// story helper and component
import { Gantt } from '.';
import type { IGanttDatum } from './types';
import { StoryContainer as Story } from 'src/utils/StoryContainer';
import './story_assets/storyStyle.css';
import { ICoords } from 'src/types';


const storyStyle = {
  width: '700px',
  height: 'fit-content',
  maxWidth: 'calc(100vw - 20px)',
  background: 'var(--surface)',
};

function generateData(entries: number): IGanttDatum[] {
  const data = [];
  const now = Date.now();
  const fixedFactor = 2 * 60 * 60 * 1000;
  const maxPastFixedFactor = 5 * 60 * 60 * 1000;

  for (let i = 0; i < entries; i++) {
    data.push({
      id: i,
      label: `Row ${i}`,
      start: new Date(now + i * fixedFactor),
      finish: new Date(now + i * fixedFactor + (Math.random() + 0.05) * maxPastFixedFactor),
    });
  }
  return data;
}

const sampleData = generateData(10);

storiesOf('Visualization/Charts/Gantt', module)
  .add('Default', () => (
    <Story style={storyStyle} className="Gantt-Story">
      <Gantt
        key="default"
        data={sampleData}
        barOpts={{
          height: 12,
          padding: 10,
        }}
        xOpts={{
          nice: true,
          label: 'X Label',
          tickFormat: (dateMs: number) => new Date(dateMs).toLocaleTimeString(),
          tickCount: 8,
        }}
        yOpts={{}}
      />
    </Story>
  ))
  .add('With custom children', () => (
    <Story style={storyStyle} className="Gantt-Story">
      <Gantt
        key="custom"
        data={sampleData}
        edges={[
          { from: 1, to: 2 },
          { from: 2, to: 3 },
        ]}
        edgeMode="straight-midpoints-corners"
        barOpts={{
          height: 12,
          padding: 10,
        }}
        xOpts={{
          nice: true,
          label: 'X Label',
          tickFormat: (dateMs: number) => new Date(dateMs).toLocaleTimeString(),
          tickCount: 8,
        }}
        yOpts={{}}
      >
        {(graphRect, xScale, yScale) => {
          const visibleDate = new Date(Date.now() + 18000);

          const top = graphRect.top;
          const bottom = graphRect.bottom;
          const x = xScale(visibleDate);

          return (
            <line
              className="sick-line"
              strokeWidth="2px"
              strokeDasharray="8px 4px"
              stroke="green"
              x1={x}
              x2={x}
              y1={top}
              y2={bottom}
            />
          );
        }}
      </Gantt>
    </Story>
  ))
  .add('With mouseover', () => {
    const [datum, selectDatum] = useState<IGanttDatum>();
    const [location, setLocation] = useState<ICoords>();

    return (
      <Story style={storyStyle} className="Gantt-Story">
        <Gantt
          data={sampleData}
          edges={[
            { from: 1, to: 2 },
            { from: 2, to: 3 },
          ]}
          edgeMode="straight-midpoints-corners"
          barOpts={{
            height: 12,
            padding: 10,
            onMouseOver: (e: SyntheticEvent, datum: IGanttDatum) => {
              selectDatum(datum);
              try {
                setLocation({
                  x: Number(e.target.getAttribute('x')) || 100,
                  y: Number(e.target.getAttribute('y')) || 100,
                });
              } catch (e) {}
            },
            onMouseOut: (e: SyntheticEvent, datum: IGanttDatum) => {
              selectDatum(undefined);
            },
          }}
          xOpts={{
            nice: true,
            label: 'X Label',
            tickFormat: (dateMs: number) => new Date(dateMs).toLocaleTimeString(),
            tickCount: 8,
          }}
          yOpts={{}}
        />
        {datum && (
          <div
            className="absolute-mouseover"
            style={{
              top: location ? location.y : 100,
              left: location ? location.x : 100,
            }}
          >
            Datum: {datum.label}
          </div>
        )}
      </Story>
    );
  });
