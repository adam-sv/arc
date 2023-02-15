import { SmartEdgeExample } from './SmartEdgeExample';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Chart:EdgeRouter',
    label: 'EdgeRouter',
    parentId: 'Chart',
    data: {
      path: '/chart/edgerouter',
      component: '',
      redirect: '/chart/edgerouter/smart',
    },
  },
  {
    id: 'Chart:EdgeRouter:Smart',
    label: 'Smart Edges',
    parentId: 'Chart:EdgeRouter',
    data: {
      path: '/chart/edgerouter/smart',
      component: SmartEdgeExample,
      title: 'EdgeRouter - Draws Edges for LogicalArcGraphs',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/edgerouter/SmartGraphExample.tsx'],
    },
  },
];
