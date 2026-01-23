import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';
import { MatIconStory } from './MatIconStory';
import { NewMatIcon } from './NewMatIcon';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'MatIcon',
    label: 'MatIcon',
    data: {
      path: 'maticon',
      component: '',
      redirect: 'maticon/default',
    },
  },
  {
    id: 'MatIcon:Default',
    label: 'Default',
    parentId: 'MatIcon',
    data: {
      path: 'maticon/default',
      component: <MatIconStory />,
      title: 'MatIcons',
      renderVertically: false,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/mat-icon/MatIconStory.tsx',
      ],
    },
  },
  {
    id: 'MatIcon:New',
    label: 'Icons Not In Library',
    parentId: 'MatIcon',
    data: {
      path: 'maticon/new',
      component: <NewMatIcon />,
      title: 'Material Symbols Outlined',
      renderVertically: false,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/mat-icon/style.scss',
        '/static/src/demo-app/routes/examples/mat-icon/NewMatIcon.tsx',
      ],
    },
  },
];
