import { storiesOf } from '@storybook/react';
import React, { SyntheticEvent, useState } from 'react';

// story helper and component
import { ChartContainer } from '.';
import { StoryContainer as Story } from 'src/utils/StoryContainer';


const storyStyle = {
  width: '700px',
  height: 'fit-content',
  maxWidth: 'calc(100vw - 20px)',
  background: 'var(--surface)',
};

const sampleData = [
  {
    x: 1,
    y: 1,
  },
  {
    x: 3,
    y: 8,
  },
  {
    x: 4,
    y: 4,
  },
  {
    x: 10,
    y: 10,
  },
];

storiesOf('Visualization/Charts/ChartContainer', module)
  .add('Default', () => (
    <Story style={storyStyle} className="Line-Story">
      I must be honest - look at the Gantt implementation for now. Later, stories will come.
    </Story>
  ));
