import React from 'react';
import { Button, Panel } from '@adam-sv/arc';

export const ButtonChildren = (): JSX.Element => (
  <Panel className='ButtonExamplesContainer'>
    <Button onClick={() => console.info('Button Clicked!')} type='default'>
      <div
        className='my-custom-button-content'
        style={{ background: 'purple', padding: '5px 10px', borderRadius: 4 }}
      >
        Hello World!
      </div>
    </Button>
  </Panel>
);
