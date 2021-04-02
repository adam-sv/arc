import { action as userAction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { StoryContainer as Story } from '../../utils/StoryContainer';

import { Title } from '.';
import { ITitleProps } from '@adam-sv/arc';

const titleStoryStyle = {
  width: '700px',
  padding: '20px',
  maxWidth: 'calc(100vw - 20px)',
  height: '100px',
  background: 'var(--surface)',
};

const sizeStories = storiesOf('General/Title/Sizes', module);
[1, 2, 3, 4, 5, 6].forEach(tt => {
  sizeStories.add(`h${tt}`, () => (
    <Story style={titleStoryStyle}>
      <Title titleType={tt as 1 | 2 | 3 | 4 | 5 | 6} text="My Custom Title" />
    </Story>
  ));
});

const textAlignStories = storiesOf('General/Title/Text Alignments', module);
['left', 'center', 'right'].forEach(pos => {
  textAlignStories.add(pos, () => (
    <Story style={titleStoryStyle}>
      <Title
        titleType={3}
        textAlign={pos as 'left' | 'center' | 'right'}
        text={`My ${pos[0].toUpperCase()}${pos.slice(1)}-Aligned Title`}
      />
    </Story>
  ));
});
