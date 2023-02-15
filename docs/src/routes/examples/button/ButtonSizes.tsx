import React from 'react';
import { Button, Panel } from '@adam-sv/arc';
import './style.scss';

export default (
  <Panel className={'ButtonExamplesContainer'}>
    <Button onClick={() => console.info('Default Size Button Clicked!')}>
      Default Size
    </Button>
    <Button
      onClick={() => console.info('Compact Size Button Clicked!')}
      componentSize='compact'
    >
      Compact Size
    </Button>
    <Button
      onClick={() => console.info('Large Size Button Clicked!')}
      componentSize='large'
    >
      Large Size
    </Button>
  </Panel>
);
