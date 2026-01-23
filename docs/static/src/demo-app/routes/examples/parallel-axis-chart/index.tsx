import { DefaultParallelAxisChartStory } from './DefaultParallelAxisChartStory';
import { SelectableColumnsParallelAxisChartStory } from './SelectableColumnsParallelAxisChartStory';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';
import './style.scss';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'ParallelAxisChart',
    label: 'ParallelAxisChart',
    data: {
      path: 'parallel-axis-chart',
      component: '',
      redirect: 'parallel-axis-chart/default',
    },
  },
  {
    id: 'ParallelAxisChart:Default',
    label: 'Default',
    parentId: 'ParallelAxisChart',
    data: {
      path: 'parallel-axis-chart/default',
      component: DefaultParallelAxisChartStory,
      title: 'ParallelAxisChart Default',
      exampleClassName: 'parallel-axis-chart-example',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/parallel-axis-chart/DefaultParallelAxisChartStory.tsx',
        '/static/src/demo-app/routes/examples/parallel-axis-chart/getData.ts',
        '/static/src/demo-app/routes/examples/parallel-axis-chart/style.scss',
      ],
    },
  },
  {
    id: 'ParallelAxisChart:SelectableColumns',
    label: 'Selectable Columns',
    parentId: 'ParallelAxisChart',
    data: {
      path: 'parallel-axis-chart/selectable-columns',
      component: SelectableColumnsParallelAxisChartStory,
      title: 'ParallelAxisChart Selectable Columns',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/parallel-axis-chart/SelectableColumnsParallelAxisChartStory.tsx',
        '/static/src/demo-app/routes/examples/parallel-axis-chart/getData.ts',
      ],
    },
  },
];
