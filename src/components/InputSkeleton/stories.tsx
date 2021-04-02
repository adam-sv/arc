// dependencies
import { action as userAction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React, { createRef } from 'react';

// StoryTelling
import { InputSkeleton } from '@adam-sv/arc';
import { StoryContainer as Story } from '../../utils';

const storyStyle = {
  width: '700px',
  maxWidth: 'calc(100vw - 20px)',
  background: 'var(--surface)',
};

storiesOf('Form/InputSkeleton/Sizes', module)
  .add('Default', () => (
    <Story style={storyStyle}>
      <InputSkeleton
        label="My InputLikeElement"
        buttonProps={{
          text: 'Change File',
          onClick: userAction('onClick'),
          type: 'success',
        }}
        info="How is info behaving?"
      />
    </Story>
  ))
  .add('Compact', () => (
    <Story style={storyStyle}>
      <InputSkeleton
        label="My Compact InputLikeElement"
        value="Sample Value"
        buttonProps={{
          text: 'Change File',
          onClick: userAction('onClick'),
          type: 'warning',
        }}
        componentSize="compact"
        info="How is info behaving?"
      />
    </Story>
  ))
  .add('Large', () => (
    <Story style={storyStyle}>
      <InputSkeleton
        label="My Large InputLikeElement"
        value="Sample Value"
        buttonProps={{
          text: 'Change File',
          onClick: userAction('onClick'),
          type: 'primary',
        }}
        componentSize="large"
        info="How is info behaving?"
      />
    </Story>
  ));

storiesOf('Form/InputSkeleton/Values', module)
  .add('Easily omit button', () => (
    <Story style={storyStyle}>
      <InputSkeleton label="My Value" value="Honesty" error="Required" />
    </Story>
  ))
  .add('Value prop', () => (
    <Story style={storyStyle}>
      <InputSkeleton
        label="With Value"
        value="a_real_file.xlsx"
        buttonProps={{
          text: 'Change File',
          onClick: userAction('onClick'),
          type: 'primary',
        }}
      />
    </Story>
  ))
  .add('Placeholder prop', () => (
    <Story style={storyStyle}>
      <InputSkeleton
        label="With Placeholder"
        placeholder="Pick any excel file..."
        buttonProps={{
          text: 'Change File',
          onClick: userAction('onClick'),
          type: 'primary',
        }}
      />
    </Story>
  ))
  .add('Placeholder hidden when value is present', () => (
    <Story style={storyStyle}>
      <InputSkeleton
        label="Value overrides Placeholder"
        value="a_real_file.xlsx"
        placeholder="Pick any excel file..."
        buttonProps={{
          text: 'Change File',
          onClick: userAction('onClick'),
          type: 'primary',
        }}
      />
    </Story>
  ));

storiesOf('Form/InputSkeleton/refs', module).add(
  'Getting the ref from a parent component',
  () => {
    const ref = createRef<HTMLDivElement>();

    setTimeout(userAction('My DOM node ref'), 1000, ref);
    setTimeout(() => console.log('Ref object:', ref), 1000);

    return (
      <Story style={storyStyle}>
        <InputSkeleton
          label="Excel File"
          value="a_real_file.xlsx"
          placeholder="Pick any excel file..."
          buttonProps={{
            text: 'Change File',
            onClick: userAction('onClick'),
            type: 'primary',
          }}
          domRef={ref}
        />
      </Story>
    );
  }
);
