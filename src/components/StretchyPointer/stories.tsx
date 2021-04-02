// dependencies
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { StoryContainer as Story } from '../../utils/StoryContainer';
import React from 'react';

// internals
import { IStretchyPointerProps } from './types.d';
import { StretchyPointer } from '.';

// set background color
import './story-only.css';

const spStoryStyle = {
  width: '300px',
  background: '#444',
  border: '1px solid var(--color-border)',
  padding: '10px',
  overflow: 'visible',
};

function MySpecialStoryContainer({ children, style }) {
  return (
    <div className="MySpecialStoryContainer">
      <div className="story-content" style={style}>
        {children}
      </div>
    </div>
  );
}

storiesOf('StretchyPointer', module)
  .add('Points left, 20px', () => (
    <MySpecialStoryContainer style={spStoryStyle}>
      <StretchyPointer overflowDirection={'left'} overflowAmount="20px">
        Im a smaller slug
      </StretchyPointer>
    </MySpecialStoryContainer>
  ))
  .add('Points left, 3em', () => (
    <MySpecialStoryContainer style={spStoryStyle}>
      <StretchyPointer overflowDirection={'left'} overflowAmount="3em">
        Im a smaller slug
      </StretchyPointer>
    </MySpecialStoryContainer>
  ))
  .add('Points right, 40px', () => (
    <MySpecialStoryContainer style={spStoryStyle}>
      <StretchyPointer overflowDirection={'right'} overflowAmount="40px">
        Im a larger slug
      </StretchyPointer>
    </MySpecialStoryContainer>
  ))
  .add('Taller pointing right, 30px', () => (
    <MySpecialStoryContainer style={spStoryStyle}>
      <StretchyPointer overflowDirection={'right'} overflowAmount="30px">
        Hello!
        <br />
        Hello!
        <br />
        Hello!
      </StretchyPointer>
    </MySpecialStoryContainer>
  ))
  .add('Aggressively tall pointing right, 30px', () => (
    <MySpecialStoryContainer style={spStoryStyle}>
      <StretchyPointer overflowDirection={'right'} overflowAmount="30px">
        <div
          style={{ textAlign: 'left', display: 'flex', justifyContent: 'left' }}
        >
          <div style={{ flex: '1 1 auto', height: 50 }}>
            Some column content
          </div>
          <div style={{ flex: '1 1 auto' }}>Some other column content</div>
        </div>
      </StretchyPointer>
    </MySpecialStoryContainer>
  ));
