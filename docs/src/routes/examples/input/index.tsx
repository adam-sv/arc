import { TemporalInputs } from './Temporal';
import { InputSkeletons } from './InputSkeleton';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Input',
    label: 'Input',
    parentId: null,
    data: {
      path: '/input',
      component: '',
      redirect: '/input/texts',
    },
  },
  {
    id: 'Input:Temporals',
    label: 'TemporalInput',
    parentId: 'Input',
    data: {
      path: '/input/temporals',
      component: TemporalInputs,
      title: 'Temporal Inputs',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/input/Temporal.tsx'],
    },
  },
  {
    id: 'Input:Skeleton',
    label: 'InputSkeleton',
    parentId: 'Input',
    data: {
      path: '/input/skeleton',
      component: InputSkeletons,
      title: 'Input Skeleton',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/input/InputSkeleton.tsx'],
    },
  },
];
