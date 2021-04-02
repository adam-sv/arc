import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ApplicationBanner, MonoIcon } from '@adam-sv/arc';
import { StoryContainer as Story } from '../../utils/StoryContainer';
import './stories.style.css';

const style = {
  width: '100vw',
  display: 'grid',
  justifyContent: 'stretch',
  alignItems: 'stretch',
};

storiesOf('Layout/ApplicationBanner', module)
  .add('Default (Demo)', () => (
    <Story style={style}>
      <ApplicationBanner />
    </Story>
  ))
  .add('Children', () => (
    <Story style={style}>
      <ApplicationBanner>
        <div>custom</div>
        <div>custom</div>
        <div>custom</div>
      </ApplicationBanner>
    </Story>
  ))
  .add('Purple Theme', () => (
    <Story style={style}>
      <ApplicationBanner className="purple-example" />
    </Story>
  ))
  .add('Links to https://www.airbus.com', () => (
    <Story style={style}>
      <ApplicationBanner
        className="purple-example"
        logoLink="https://www.airbus.com"
      />
    </Story>
  ))
  .add('Links to https://example.com with custom logo', () => (
    <Story style={style}>
      <ApplicationBanner
        logo={<MonoIcon.ExternalLink />}
        logoLink="https://example.com"
      />
    </Story>
  ));
