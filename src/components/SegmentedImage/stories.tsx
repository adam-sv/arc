import { storiesOf } from '@storybook/react';
import React from 'react';

// story helper and component
import { SegmentedImage } from '.';
import { StoryContainer as Story } from '../../utils/StoryContainer';
import { ISegmentInput } from '@adam-sv/arc';
// style
import './story_assets/storyStyle.css';
// story assets
import maskPaths from './story_assets/mask_paths';
import A318 from './story_assets/A318.svg';
import A319 from './story_assets/A319.svg';
import A320 from './story_assets/A320.svg';
import A321 from './story_assets/A321.svg';
import A321XLR from './story_assets/A321XLR.svg';


const segmentedImageStoryStyle = {
  width: '700px',
  height: '400px',
  maxWidth: 'calc(100vw - 20px)',
  background: 'var(--surface)',
};

const segments: ISegmentInput[] = [
  {
    isLhs: true,
    x: 0.0,
    length: 0.05,
    midlineOffset: 0,
    data: {
      title: 'a',
    },
  },
  {
    isLhs: false,
    x: 0.2,
    length: 0.05,
    midlineOffset: 0,
    contentGenerator: segDef => {
      return <span style={{ color: 'green' }}>{segDef.data.title}</span>;
    },
    data: {
      title: 'b',
    },
  },
  {
    isLhs: true,
    x: 0.3,
    length: 0.1,
    midlineOffset: -0.1,
    data: {
      title: 'c',
    },
  },
  {
    isLhs: false,
    x: 0.5,
    length: 0.1,
    midlineOffset: -0.1,
    data: {
      title: 'd',
    },
  },
  {
    isLhs: false,
    x: 0.8,
    length: 0.1,
    midlineOffset: 0.1,
    data: {
      title: 'e',
    },
  },
];

storiesOf('General/SegmentedImage', module)
  .add('Default', () => (
    <Story style={segmentedImageStoryStyle} className="SegmentedImage-Story">
      <SegmentedImage
        actualLengthDimension={1}
        actualWidthDimension={1}
        xOriginOffset={0.05}
        invertX
        segments={segments}
      />
    </Story>
  ))
  .add('A318 Provided assets', () => (
    <Story style={segmentedImageStoryStyle} className="SegmentedImage-Story">
      <SegmentedImage
        actualLengthDimension={1}
        actualWidthDimension={1}
        xOriginOffset={0.05}
        segments={segments}
        backgroundImage={{
          imgAsSrc: A318,
          maskAsPath: maskPaths.A318,
          maskWidth: 1278.9,
          maskHeight: 198.8,
        }}
      />
    </Story>
  ))
  .add('A318 Provided assets - mirrored', () => (
    <Story style={segmentedImageStoryStyle} className="SegmentedImage-Story">
      <SegmentedImage
        actualLengthDimension={1}
        actualWidthDimension={1}
        xOriginOffset={0.05}
        segments={segments}
        invertX
        backgroundImage={{
          imgAsSrc: A318,
          maskAsPath: maskPaths.A318,
          maskWidth: 1278.9,
          maskHeight: 198.8,
        }}
      />
    </Story>
  ))
  .add('A319 Provided assets', () => (
    <Story style={segmentedImageStoryStyle} className="SegmentedImage-Story">
      <SegmentedImage
        actualLengthDimension={1}
        actualWidthDimension={1}
        xOriginOffset={0.05}
        segments={segments}
        backgroundImage={{
          imgAsSrc: A319,
          maskAsPath: maskPaths.A319,
          maskWidth: 1398.3,
          maskHeight: 198.5,
        }}
      />
    </Story>
  ))
  .add('A320 Provided assets', () => (
    <Story style={segmentedImageStoryStyle} className="SegmentedImage-Story">
      <SegmentedImage
        actualLengthDimension={1}
        actualWidthDimension={1}
        xOriginOffset={0.05}
        segments={segments}
        backgroundImage={{
          imgAsSrc: A320,
          maskAsPath: maskPaths.A320,
          maskWidth: 1584.9,
          maskHeight: 198.6,
        }}
      />
    </Story>
  ))
  .add('A321 Provided assets', () => (
    <Story style={segmentedImageStoryStyle} className="SegmentedImage-Story">
      <SegmentedImage
        actualLengthDimension={1}
        actualWidthDimension={1}
        xOriginOffset={0.05}
        segments={segments}
        backgroundImage={{
          imgAsSrc: A321,
          maskAsPath: maskPaths.A321,
          maskWidth: 1931.6,
          maskHeight: 198.4,
        }}
      />
    </Story>
  ))
  .add('A321XLR Provided assets', () => (
    <Story style={segmentedImageStoryStyle} className="SegmentedImage-Story">
      <SegmentedImage
        actualLengthDimension={1}
        actualWidthDimension={1}
        xOriginOffset={0.05}
        segments={segments}
        backgroundImage={{
          imgAsSrc: A321XLR,
          maskAsPath: maskPaths.A321XLR,
          maskWidth: 1931.6,
          maskHeight: 198.5,
        }}
      />
    </Story>
  ));
