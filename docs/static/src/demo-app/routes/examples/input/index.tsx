import { TemporalInputs } from './Temporal';
import { InputSkeletons } from './InputSkeleton';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Input',
    label: 'Input',
    data: {
      path: 'input',
      component: '',
      redirect: 'input/skeleton',
    },
  },
  {
    id: 'Input:Temporals',
    label: 'TemporalInput',
    parentId: 'Input',
    data: {
      path: 'input/temporals',
      component: TemporalInputs,
      title: 'Temporal Inputs',
      renderVertically: true,
      codeBlocks: ['/static/src/demo-app/routes/examples/input/Temporal.tsx'],
    },
  },
  {
    id: 'Input:Skeleton',
    label: 'InputSkeleton',
    parentId: 'Input',
    data: {
      path: 'input/skeleton',
      component: InputSkeletons,
      title: 'Input Skeleton',
      renderVertically: true,
      codeBlocks: [
        '/static/src/demo-app/routes/examples/input/InputSkeleton.tsx',
      ],
    },
  },
];
