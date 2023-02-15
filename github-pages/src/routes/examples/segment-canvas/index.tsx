import { DefaultSegmentCanvasStory } from './DefaultSegmentCanvasStory';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'SegmentCanvas',
    label: 'Segment Canvas',
    parentId: null,
    data: {
      path: '/segment-canvas',
      component: '',
      redirect: '/segment-canvas/default',
    },
  },
  {
    id: 'SegmentCanvas:Default',
    label: 'Default',
    parentId: 'SegmentCanvas',
    data: {
      path: '/segment-canvas/default',
      component: DefaultSegmentCanvasStory,
      title: 'Default',
      renderVertically: false,
      codeBlocks: [
        '/src/routes/examples/segment-canvas/DefaultSegmentCanvasStory.tsx',
        '/src/routes/examples/segment-canvas/style.scss',
      ],
    },
  },
];
