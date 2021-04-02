import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { StationBanner } from '.';
import { StoryContainer as Story } from '../../utils/StoryContainer';

const style = {
  width: '100vw',
  display: 'grid',
  justifyContent: 'stretch',
  alignItems: 'stretch',
};

storiesOf('Layout/StationBanner', module).add('Default', () => (
  <Story style={style}>
    <StationBanner
      stations={[1, 2, 3, 4, 50]}
      onStationSelected={action('onStationSelected')}
    />
  </Story>
));
