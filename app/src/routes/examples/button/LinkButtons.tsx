import React from 'react';
import { Button, Panel } from '@adam-sv/arc';
import './style.scss';

export default (
  <Panel className={'ButtonExamplesContainer'}>
    <Button to={'/examples/button/link'}>Link Button</Button>
    <Button to={'/examples/button/link'} disabled type='success'>
      Sucess, Disabled
    </Button>
    <Button to={'https://google.com'} type='danger'>
      External Link
    </Button>
  </Panel>
);
