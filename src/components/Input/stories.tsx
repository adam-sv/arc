import { action as userAction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Input } from '.';
import { StoryContainer as Story } from '../../utils/StoryContainer';
import { InputType } from '@adam-sv/arc';

function Text(props) {
  return <div className="Text">{props.children}</div>;
}

const inputStoryStyle = {
  width: 'calc(100vw - 20px)',
  maxWidth: `450px`,
  background: 'var(--surface)',
};

const typeStories = storiesOf('Form/Input/Types', module);
['text', 'textarea', 'password', 'integer', 'float'].forEach(inputType => {
  typeStories.add(`type "${inputType}"`, () => {
    const value = inputType;

    return (
      <Story style={inputStoryStyle}>
        <Input
          onChange={(e, val) => {
            console.log('Input changed, read via:', e.target.value, val);
          }}
          label={value.charAt(0).toUpperCase() + value.slice(1)}
          type={value as InputType}
        />
      </Story>
    );
  });
});

const labelStories = storiesOf('Form/Input/Label Options', module);
labelStories.add('Always Floating', () => (
  <Story style={inputStoryStyle}>
    <Input onChange={userAction('onChange')} label="Label" alwaysShowLabel />
  </Story>
));
labelStories.add('With Error Message', () => (
  <Story style={inputStoryStyle}>
    <Input
      onChange={userAction('onChange')}
      label="Label"
      error="Error Message"
    />
  </Story>
));
labelStories.add('Always Floating & Error Message', () => (
  <Story style={inputStoryStyle}>
    <Input
      onChange={userAction('onChange')}
      label="Floating Label"
      alwaysShowLabel
      error="Required"
    />
  </Story>
));
labelStories.add('Always Floating & Placeholder', () => (
  <Story style={inputStoryStyle}>
    <Input
      onChange={userAction('onChange')}
      label="Label Text"
      placeholder="Input Placeholder"
      alwaysShowLabel
    />
  </Story>
));

const infoStories = storiesOf('Form/Input/Info Prop', module);
infoStories.add('Passing text', () => (
  <Story style={inputStoryStyle}>
    <Input
      onChange={userAction('onChange')}
      label="My Confusing Input"
      info="My confusing input specifically will update the property of your model which you find most confusing"
    />
  </Story>
));
infoStories.add('Passing a renderable element', () => (
  <Story style={inputStoryStyle}>
    <Input
      onChange={userAction('onChange')}
      label="Array In Info"
      value="Wow!"
      info={[
        <Text key={0}>Holy smokes it's a Text[]</Text>,
        <Text key={1}>I didn't even know this was possible!</Text>,
        <Text key={2}>
          Well to tell you the truth, previously it was illegal according to
          PropTypes but fine in practice. Fortunately, TypeScript actually has
          the teeth to make you fix that type of issue.
        </Text>,
      ]}
    />
  </Story>
));

const sizeStories = storiesOf('Form/Input/Sizes', module);
sizeStories.add('Default size', () => (
  <Story style={inputStoryStyle}>
    <Input
      componentSize="default" // same as not passing
      onChange={userAction('onChange')}
      label="Default Size"
      value="Provided a value for clarity..."
      info="This is a default rendering of an Input."
    />
  </Story>
));
sizeStories.add('Compact size', () => (
  <Story style={inputStoryStyle}>
    <Input
      componentSize="compact"
      onChange={userAction('onChange')}
      label="Compact Size"
      value="Provided a value for clarity..."
      info="This is a compact rendering of an Input."
    />
  </Story>
));
sizeStories.add('Large size', () => (
  <Story style={inputStoryStyle}>
    <Input
      componentSize="large"
      onChange={userAction('onChange')}
      label="Large Size"
      value="Provided a value for clarity..."
      info="This is a large rendering of an Input."
    />
  </Story>
));
