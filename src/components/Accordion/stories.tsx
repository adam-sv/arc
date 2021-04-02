// dependencies
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
// internals
import { Accordion } from '@adam-sv/arc';
import { StoryContainer as Story } from '../../utils/StoryContainer';
// types
import { IAccordionItem } from '@adam-sv/arc';

const accordionStoryStyle = {
  width: '700px',
  height: '400px',
  maxWidth: 'calc(100vw - 20px)',
  background: 'var(--surface)',
};
const isInitiallyExpanded = true;

storiesOf('General/Accordion/Default', module)
  .add('Default', () => (
    <React.StrictMode>
      <Story style={accordionStoryStyle}>
        <Accordion
          items={[
            { id: 1, label: 'One', children: <div>Hello</div>, isInitiallyExpanded },
            {
              id: 2,
              label: 'Two',
              children: [<div key={0}>Hello</div>, <div key={1}>Hello again</div>],
              isInitiallyExpanded,
            },
            {
              id: 3,
              label: 'Three Wow a Long Title I Wonder Why',
              children: <div>Hello for the final time</div>,
              isInitiallyExpanded,
            },
          ]}
          onExpansionChanged={() => {
            console.log('React to possibly new DOM positions');
          }}
        />
      </Story>
    </React.StrictMode>
  ))
  .add('Maximum one expanded', () => (
    <Story style={accordionStoryStyle}>
      <Accordion
        items={[
          { id: 1, label: 'One', children: <div>Hello</div> },
          {
            id: 2,
            label: 'Two',
            children: [<div>Hello</div>, <div>Hello again</div>],
          },
          {
            id: 3,
            label: 'Three Wow a Long Title I Wonder Why',
            children: <div>Hello for the final time</div>,
          },
        ]}
        onExpansionChanged={() => {
          console.log('Hello! Expansion changed on the Accordion.');
        }}
        onlyOneItemCanBeExpanded
      />
    </Story>
  ));
