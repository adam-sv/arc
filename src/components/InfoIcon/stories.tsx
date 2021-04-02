import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { InfoIcon } from '.';

storiesOf('General/InfoIcon', module).add('Default', () => (
  <InfoIcon text="Sample InfoIcon" />
));
