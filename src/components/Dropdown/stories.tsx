import { action as userAction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Dropdown } from '.';
import { StoryContainer as Story } from '../../utils/StoryContainer';

function Text(props) {
  return <div className="Text">{props.children}</div>;
}

const dropdownItems = [
  { label: 'Zero', value: 0 },
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: { three: 3 } },
];

const dropdownStoryStyle = {
  width: 'calc(100vw - 20px)',
  maxWidth: `450px`,
  background: 'var(--surface)',
};

const labelStories = storiesOf('Form/Dropdown/Label Options', module);
labelStories.add('With Label', () => (
  <Story style={dropdownStoryStyle}>
    <Dropdown
      onChange={userAction('onChange')}
      label="Four Numbers"
      items={dropdownItems}
    />
  </Story>
));
labelStories.add('With Error Message', () => (
  <Story style={dropdownStoryStyle}>
    <Dropdown
      onChange={userAction('onChange')}
      label="Four Numbers"
      error="Error Message"
      items={dropdownItems}
    />
  </Story>
));

const infoStories = storiesOf('Form/Dropdown/Info Prop', module);
infoStories.add('Passing text', () => (
  <Story style={dropdownStoryStyle}>
    <Dropdown
      onChange={userAction('onChange')}
      label="Badly Typed Numbers"
      items={dropdownItems}
      info="The info field could maybe explain why the option labeled 'Three' returns an object, but it could also not!"
    />
  </Story>
));
infoStories.add('Passing a renderable element', () => (
  <Story style={dropdownStoryStyle}>
    <Dropdown
      onChange={userAction('onChange')}
      label="Array In Info"
      items={dropdownItems}
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

const sizeStories = storiesOf('Form/Dropdown/Sizes', module);
sizeStories.add('Default size', () => (
  <Story style={dropdownStoryStyle}>
    <Dropdown
      componentSize="default" // same as not passing
      onChange={userAction('onChange')}
      label="Default Size"
      items={dropdownItems}
      info="This is a default rendering of an Input."
    />
  </Story>
));
sizeStories.add('Compact size', () => (
  <Story style={dropdownStoryStyle}>
    <Dropdown
      componentSize="compact"
      onChange={userAction('onChange')}
      label="Compact Size"
      items={dropdownItems}
      info="This is a compact rendering of an Input."
    />
  </Story>
));
sizeStories.add('Large size', () => (
  <Story style={dropdownStoryStyle}>
    <Dropdown
      componentSize="large"
      onChange={userAction('onChange')}
      label="Large Size"
      items={dropdownItems}
      info="This is a large rendering of an Input."
    />
  </Story>
));
