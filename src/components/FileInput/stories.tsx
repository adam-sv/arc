// dependencies
import { action as userAction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React, { createRef } from 'react';

// StoryTelling
import { FileInput } from '@adam-sv/arc';
import { StoryContainer as Story } from '../../utils';

const storyStyle = {
  width: '700px',
  maxWidth: 'calc(100vw - 20px)',
  background: 'var(--surface)',
};

storiesOf('Form/FileInput', module)
  .add('Default', () => (
    <Story style={storyStyle}>
      <FileInput
        label="My InputLikeElement"
        onChange={(files) => console.log(files)}
      />
    </Story>
  ));
