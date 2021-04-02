// dependencies
import { storiesOf } from '@storybook/react';
import React from 'react';
// internals
import { version } from '../package.json';
import { StoryContainer } from './utils';

// This file exists in order to display the version in the sidebar
// we can and should replace this content with something more useful
storiesOf(`ADAM React Components/${version}`, module)
  .add('Installation', () => (
    <StoryContainer style={{
      width: '450px',
      height: '200px',
      background: 'white',
      border: '1px solid #e0e2e4',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{ marginBottom: 8 }}>
        Set your registry to <a href="https://npm.internal.adam-sv.com/">https://npm.internal.adam-sv.com</a>. Then:
      </div>
      <div style={{
        padding: 8,
        background: '#f2f4f8',
        border: '1px solid #e0e2e4',
        borderRadius: 4,
        fontFamily: 'monospace',
      }}>
        yarn add @adam-sv/arc
      </div>
    </StoryContainer>
  ));

export const noop = () => null;
