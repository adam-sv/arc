// dependencies
import { EdgeRouter, LogicalArcGraph } from '@adam-sv/arc';
import { storiesOf } from '@storybook/react';
import React, { CSSProperties, useState } from 'react';
import { StoryContainer as Story } from '../../utils/StoryContainer';
// types
import type { IGraphEdge, IGraphNode } from '@adam-sv/arc';

const graphStoryStyle: CSSProperties = {
  width: '1000px',
  maxWidth: 'calc(100vw - 20px)',
  minHeight: '400px',
  background: 'var(--surface)',
};

const nodes:IGraphNode[] = [
  { id: 0, label: 'Zero', parentId: null, position: { x: 0, y: 0 } },
  { id: 1, label: 'One', parentId: null, position: { x: 250, y: 100 } },
  { id: 2, label: 'Two', parentId: null, position: { x: 500, y: 0 } },
  { id: 3, label: 'Three', parentId: null, position: { x: 750, y: 100 } },
  { id: 5, label: 'Five', parentId: null, position: { x: 750, y: 220 } },
  { id: 6, label: 'Six', parentId: null, position: { x: 250, y: 320 } },
];
const edges:IGraphEdge[] = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 5 },
  { from: 5, to: 6 },
];

nodes.forEach(node => {
  node.size = { width: 180, height: 80 };
});

const graph = new LogicalArcGraph(nodes, edges);

storiesOf('Visualization/EdgeRouter', module)
  .add('Straight Router', () => (
    <Story style={graphStoryStyle}>
      <EdgeRouter graph={graph} edgeMode="straight" shift={{ x: 15, y: 40 }} />
    </Story>
  ))
  .add('Smart Router', () => (
    <Story style={graphStoryStyle}>
      <EdgeRouter
        graph={graph}
        edgeMode="smart"
        edgeSpacing={20}
        shift={{ x: 15, y: 40 }}
      />
    </Story>
  ));
