// tales
import { GraphCustomNodeContent } from './CustomNodeExample';
import { GraphFunctionalNodes } from './FunctionalGraph';
import { GraphNestedNodes } from './NestedGraph';
import { ChartBaseGraph } from './SimpleGraph';
import { DragAndDropChart } from './DragAndDrop';
import { ZoomChart } from './Zoom';
import { BackgroundOptions } from './BackGroundOptions';

// types
import type { ITreeNode } from '@adam-sv/arc';
import type { IExampleData } from 'src/demo-app/routes/examples/types';

export const stories: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Chart:Graph',
    label: 'Graphs',
    parentId: 'Chart',
    data: {
      path: 'chart/graph',
      component: '',
      redirect: 'chart/graph/basic',
    },
  },
  {
    id: 'Chart:Graph:Basic',
    label: 'Basic Graph',
    parentId: 'Chart:Graph',
    data: {
      path: 'chart/graph/basic',
      component: <ChartBaseGraph />,
      title: 'Basic Graph',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/graph/SimpleGraph.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Graph:Zoom',
    label: 'Comprehensive Example',
    parentId: 'Chart:Graph',
    data: {
      path: 'chart/graph/Zoom',
      component: <ZoomChart />,
      title: 'Zoom',
      codeBlocks: ['/static/src/demo-app/routes/examples/chart/graph/Zoom.tsx'],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Graph:CustomNodes',
    label: 'Custom Node Content',
    parentId: 'Chart:Graph',
    data: {
      path: 'chart/graph/custom-nodes',
      component: <GraphCustomNodeContent />,
      title: 'Custom Node Content',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/graph/CustomNodeExample.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Graph:Function Nodes',
    label: 'Function Nodes',
    parentId: 'Chart:Graph',
    data: {
      path: 'chart/graph/function-nodes',
      component: <GraphFunctionalNodes />,
      title: 'Function Nodes',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/graph/FunctionalGraph.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Graph:Nested Nodes',
    label: 'Nested Nodes',
    parentId: 'Chart:Graph',
    data: {
      path: 'chart/graph/nested-nodes',
      component: <GraphNestedNodes />,
      title: 'Nested Nodes',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/graph/NestedGraph.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Graph:Drag And Drop',
    label: 'Drag And Drop',
    parentId: 'Chart:Graph',
    data: {
      path: 'chart/graph/drag-drop',
      component: <DragAndDropChart />,
      title: 'Drag And Drop',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/graph/DragAndDrop.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Graph:Background',
    label: 'Background',
    parentId: 'Chart:Graph',
    data: {
      path: 'chart/graph/background',
      component: <BackgroundOptions />,
      title: 'Zoom',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/graph/BackGroundOptions.tsx',
      ],
      renderVertically: true,
    },
  },
];
