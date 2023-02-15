// Bar
import SimpleBarChart from './bar/SimpleBarChart';
import SimpleWithMouseTracking from './bar/SimpleWithMouseTracking';
import SimpleWithResize from './bar/SimpleWithResize';
import HorizontalBarChart from './bar/HorizontalBarChart';
import GroupedBarChart from './bar/GroupedBarChart';
import Stacked from './bar/Stacked';
import Background from './bar/BackgroundLineData';
import StackedWithLine from './bar/StackedWithLine';

// Gantt
import GanttChartWithEdges from './gantt/GanttChartWithEdges';
import SimpleGanttChart from './gantt/SimpleGanttChart';
import SimpleGanttChartWithMouseTracking from './gantt/SimpleGanttChartWithMouseTracking';
// Graph
import { CustomNodeExample } from './graph/CustomNodeExample';
import { GraphSelectionExample } from './graph/GraphSelectionExample';
import { SmartGraphExample } from './graph/SmartGraphExample';
// Line
import LineChart from './line/simple';
import NoMouseLineChart from './line/noMouseTracking';
import { DateMode } from './line/dateMode';
// Types
import type { ITreeNode } from '@adam-sv/arc';
import type { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'Chart',
    label: 'Chart',
    parentId: null,
    data: {
      path: '/chart',
      component: '',
      redirect: '/chart/bar',
    },
  },
  // Bar
  {
    id: 'Chart:Bar',
    label: 'Bar Chart',
    parentId: 'Chart',
    data: {
      path: '/chart/bar',
      component: '',
      redirect: '/chart/bar/grouped',
    },
  },
  {
    id: 'Chart:Bar:resize',
    label: 'Resize Axis',
    parentId: 'Chart:Bar',
    data: {
      path: '/chart/bar/resize',
      component: SimpleWithResize,
      title: 'Simple Bar Chart With Resizeable Axis',
      codeBlocks: ['/src/routes/examples/chart/bar/SimpleWithResize.tsx'],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:background-line',
    label: 'Background',
    parentId: 'Chart:Bar',
    data: {
      path: '/chart/bar/background',
      component: Background,
      title: 'Bar Chart with Background Line',
      codeBlocks: ['/src/routes/examples/chart/bar/BackgroundLineData.tsx'],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:stacked',
    label: 'Stacked',
    parentId: 'Chart:Bar',
    data: {
      path: '/chart/bar/stacked',
      component: Stacked,
      title: 'Stacked Bar Charts',
      codeBlocks: ['/src/routes/examples/chart/bar/Stacked.tsx'],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:stacked-with-line',
    label: 'Stacked With Line',
    parentId: 'Chart:Bar',
    data: {
      path: '/chart/bar/stacked-line',
      component: StackedWithLine,
      title: 'Stacked Bar Charts With Line',
      codeBlocks: ['/src/routes/examples/chart/bar/Stacked.tsx'],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:simple',
    label: 'Simple',
    parentId: 'Chart:Bar',
    data: {
      path: '/chart/bar/simple',
      component: SimpleBarChart,
      title: 'Simple Bar Chart',
      codeBlocks: ['/src/routes/examples/chart/bar/SimpleBarChart.tsx'],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:mouse-tracking',
    label: 'Mouse Tracking',
    parentId: 'Chart:Bar',
    data: {
      path: '/chart/bar/mouse-tracking',
      component: SimpleWithMouseTracking,
      title: 'Simple Bar Chart',
      codeBlocks: [
        '/src/routes/examples/chart/bar/SimpleWithMouseTracking.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:horizontal',
    label: 'Horizontal',
    parentId: 'Chart:Bar',
    data: {
      path: '/chart/bar/horizontal',
      component: HorizontalBarChart,
      title: 'Horizontal Bar Chart',
      codeBlocks: ['/src/routes/examples/chart/bar/HorizontalBarChart.tsx'],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:grouped',
    label: 'Grouped',
    parentId: 'Chart:Bar',
    data: {
      path: '/chart/bar/grouped',
      renderVertically: false,
      component: GroupedBarChart,
      title: 'Grouped Bar Chart',
      codeBlocks: [
        '/src/routes/examples/chart/bar/GroupedBarChart.tsx',
        '/src/routes/examples/chart/bar/grouped.scss',
      ],
    },
  },
  // Gantt
  {
    id: 'Chart:Gantt',
    label: 'Gantt Chart',
    parentId: 'Chart',
    data: {
      path: '/chart/gantt',
      component: '',
      redirect: '/chart/gantt/edges',
    },
  },
  {
    id: 'Chart:Gantt:simple',
    label: 'Simple',
    parentId: 'Chart:Gantt',
    data: {
      codeBlocks: ['/src/routes/examples/chart/gantt/SimpleGanttChart.tsx'],
      component: SimpleGanttChart,
      path: '/chart/gantt/simple',
      renderVertically: true,
      title: 'Simple Gantt Chart',
    },
  },
  {
    id: 'Chart:Gantt:MouseTracking',
    label: 'Mouse Tracking',
    parentId: 'Chart:Gantt',
    data: {
      codeBlocks: [
        '/src/routes/examples/chart/gantt/SimpleGanttChartWithMouseTracking.tsx',
      ],
      component: SimpleGanttChartWithMouseTracking,
      path: '/chart/gantt/mousetracking',
      renderVertically: true,
      title: 'Gantt Chart With Mouse Tracking',
    },
  },
  {
    id: 'Chart:Gantt:edges',
    label: 'w/ Edges',
    parentId: 'Chart:Gantt',
    data: {
      codeBlocks: ['/src/routes/examples/chart/gantt/GanttChartWithEdges.tsx'],
      component: GanttChartWithEdges,
      path: '/chart/gantt/edges',
      renderVertically: true,
      title: 'Gantt Chart + Edges (via EdgeRouter)',
    },
  },
  // Graph
  {
    id: 'Chart:Graph',
    label: 'Graph',
    parentId: 'Chart',
    data: {
      path: '/chart/graph',
      component: '',
      redirect: '/chart/graph/straight',
    },
  },
  {
    id: 'Chart:Graph:Smart',
    label: 'Smart Edges',
    parentId: 'Chart:Graph',
    data: {
      path: '/chart/graph/straight',
      component: SmartGraphExample,
      title: 'Graph - Smart Edges (via EdgeRouter)',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/chart/graph/SmartGraphExample.tsx'],
    },
  },
  {
    id: 'Chart:Graph:Selection',
    label: 'MultiSelect from the Graph',
    parentId: 'Chart:Graph',
    data: {
      path: '/chart/graph/selection',
      component: GraphSelectionExample,
      title: 'Graph - Selecting Multiple Nodes',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/chart/graph/GraphSelectionExample.tsx',
      ],
    },
  },
  {
    id: 'Chart:Graph:Custom',
    label: 'Custom Nodes',
    parentId: 'Chart:Graph',
    data: {
      path: '/chart/graph/custom',
      component: CustomNodeExample,
      title: 'Graph - Custom Nodes',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/chart/graph/CustomNodeExample.tsx'],
    },
  },
  // Line
  {
    id: 'Chart:Line',
    label: 'Line Chart',
    parentId: 'Chart',
    data: {
      path: '/chart/line',
      component: '',
      redirect: '/chart/line/simple',
    },
  },
  {
    id: 'Chart:Line:simple',
    label: 'Simple',
    parentId: 'Chart:Line',
    data: {
      path: '/chart/line/simple',
      component: LineChart,
      title: 'Simple Line Chart',
      codeBlocks: ['/src/routes/examples/chart/line/simple.tsx'],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Line:date',
    label: 'Date Mode',
    parentId: 'Chart:Line',
    data: {
      path: '/chart/line/date',
      component: DateMode,
      title: 'Date Mode Line Chart',
      codeBlocks: ['/src/routes/examples/chart/line/dateMode.tsx'],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Line:nomouse',
    label: 'No Mouseover',
    parentId: 'Chart:Line',
    data: {
      path: '/chart/line/nomouse',
      component: NoMouseLineChart,
      title: 'Line Chart - No Mouse Interactions',
      codeBlocks: ['/src/routes/examples/chart/line/noMouseTracking.tsx'],
      renderVertically: true,
    },
  },
];
