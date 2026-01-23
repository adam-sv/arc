// stories
import { ChartBaseResponsiveExample } from './base/ChartBase-ResponsiveExample';
import { ChartBaseFitsWidthExample } from './base/ChartBase-FitsWidthExample';
import { ChartBaseFitsHeightExample } from './base/ChartBase-FitsHeight';
import { ChartBaseAxisSwimLanes } from './axes/ChartBase-SwimLanes';
import { ChartBaseAxisText } from './axes/ChartBase-AxisText';
import { treeNodes as edgeRouterTreeNodes } from './edgerouter';
import SimpleBarChart from './examples/bar/Simple';
import SimpleResizeBarChart from './examples/bar/SimpleWithResize';
import SimpleMouseTracking from './examples/bar/SimpleWithMouseTracking';
import VerticalBarChart from './examples/bar/Vertical';
import GroupedBarChart from './examples/bar/Grouped';
import StackedBarChart from './examples/bar/Stacked';
import StackedWithLineBarChart from './examples/bar/StackedWithLine';
import CustomMouseOver from './examples/bar/CustomMouseOver';
import SimpleLineChart from './examples/line/Simple';
import LineChartNoMouseTracking from './examples/line/NoMouseTracking';
import LineChartDateMode from './examples/line/DateMode';
import LineChartCustomMouseOver from './examples/line/CustomMouseOver';
import SimpleGanttChart from './examples/gantt/Simple';
import SmartEdgesGanttChart from './examples/gantt/SmartEdges';
import MouseOverGanttChart from './examples/gantt/MouseOver';
// graph stories
import { stories } from './graph';
// types
import type { ITreeNode } from '@adam-sv/arc';
import type { IExampleData } from '../types';
import { ChartBaseClipPathExample } from './base/ChartBase-ClipPathExample';

export const treeNodes: ITreeNode<IExampleData, string>[] = [
  {
    id: 'Chart',
    label: 'Charts',
    data: {
      path: 'chart',
      component: '',
      redirect: 'chart/base',
    },
  },
  // Usage Examples
  {
    id: 'Chart:Base',
    label: 'ChartBase Usage',
    parentId: 'Chart',
    data: {
      path: 'chart/base',
      component: '',
      redirect: 'chart/base/responsive',
    },
  },
  {
    id: 'Chart:Axes',
    label: 'ChartBase Axes',
    parentId: 'Chart',
    data: {
      path: 'chart/axes',
      component: '',
      redirect: 'chart/axes/tick',
    },
  },
  {
    id: 'Chart:Base:Responsive',
    label: 'Responsive',
    parentId: 'Chart:Base',
    data: {
      path: 'chart/base/responsive',
      component: <ChartBaseResponsiveExample />,
      title: 'ChartBase - Responsive Mode',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/base/ChartBase-ResponsiveExample.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Base:FitsWidth',
    label: 'Fits Width',
    parentId: 'Chart:Base',
    data: {
      path: 'chart/base/fits-width',
      component: <ChartBaseFitsWidthExample />,
      title: 'ChartBase - Fits Width Mode',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/base/ChartBase-FitsWidthExample.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Base:FitsHeight',
    label: 'Fits Height',
    parentId: 'Chart:Base',
    data: {
      path: 'chart/base/fits-height',
      component: <ChartBaseFitsHeightExample />,
      title: 'ChartBase - Fits Height Mode',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/base/ChartBase-FitsHeight.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Base:ClipPath',
    label: 'Clip Path',
    parentId: 'Chart:Base',
    data: {
      path: 'chart/base/clip-path',
      component: <ChartBaseClipPathExample />,
      title: 'ChartBase - Clip Path Example',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/base/ChartBase-ClipPathExample.tsx',
      ],
      renderVertically: true,
    },
  },
  // Axes examples
  {
    id: 'Chart:TickAxis',
    label: 'Tick Axis',
    parentId: 'Chart:Axes',
    data: {
      path: 'chart/axes/tick',
      component: <ChartBaseAxisText />,
      title: 'ChartBase - Tick Axis',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/axes/ChartBase-AxisText.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:SwimLanes',
    label: 'Swim Lanes Axis',
    parentId: 'Chart:Axes',
    data: {
      path: 'chart/axes/swimlanes',
      component: <ChartBaseAxisSwimLanes />,
      title: 'ChartBase - Swim Lanes',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/axes/ChartBase-SwimLanes.tsx',
      ],
      renderVertically: true,
    },
  },
  // BarChart
  {
    id: 'Chart:Bar',
    label: 'Barchart Examples',
    parentId: 'Chart',
    data: {
      path: 'chart/barchart-examples',
      component: '',
      redirect: 'chart/barchart-examples-simple',
    },
  },
  {
    id: 'Chart:Bar:Simple',
    label: 'Simple',
    parentId: 'Chart:Bar',
    data: {
      path: 'chart/barchart-examples-simple',
      component: SimpleBarChart,
      title: 'ChartBase - Simple Bar Chart (under development)',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/bar/Simple.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:SimpleResize',
    label: 'Simple With Resize',
    parentId: 'Chart:Bar',
    data: {
      path: 'chart/barchart-examples-simple-resize',
      component: SimpleResizeBarChart,
      title: 'ChartBase - Simple Bar Chart With Resize (under development)',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/bar/SimpleWithResize.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:SimpleMouseTracking',
    label: 'Simple With Mouse Tracking',
    parentId: 'Chart:Bar',
    data: {
      path: 'chart/barchart-examples-simple-mouse-tracking',
      component: SimpleMouseTracking,
      title:
        'ChartBase - Simple Bar Chart With Mouse Tracking (under development)',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/bar/SimpleWithMouseTracking.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:Vertical',
    label: 'Vertical',
    parentId: 'Chart:Bar',
    data: {
      path: 'chart/barchart-examples-simple-vertical',
      component: VerticalBarChart,
      title: 'ChartBase - Simple Vertical Bar Chart (under development)',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/bar/Vertical.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:Grouped',
    label: 'Grouped',
    parentId: 'Chart:Bar',
    data: {
      path: 'chart/barchart-examples-grouped',
      component: GroupedBarChart,
      title: 'ChartBase - Grouped Bar Chart (under development)',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/bar/Grouped.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:Stacked',
    label: 'Stacked',
    parentId: 'Chart:Bar',
    data: {
      path: 'chart/barchart-examples-stacked',
      component: StackedBarChart,
      title: 'ChartBase - Stacked Bar Chart (under development)',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/bar/Stacked.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:StackedWithLine',
    label: 'Stacked With Line',
    parentId: 'Chart:Bar',
    data: {
      path: 'chart/barchart-examples-stacked-with-line',
      component: StackedWithLineBarChart,
      title: 'ChartBase - Stacked With Line Bar Chart (under development)',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/bar/StackedWithLine.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Bar:CustomMouseOver',
    label: 'Custom Mouse Over',
    parentId: 'Chart:Bar',
    data: {
      path: 'chart/barchart-examples-custom-mouse-over',
      component: CustomMouseOver,
      title: 'ChartBase - Bar Chart With Custom Mouse Over (under development)',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/bar/CustomMouseOver.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Line',
    label: 'Line Examples',
    parentId: 'Chart',
    data: {
      path: 'chart/linechart-examples',
      component: '',
      redirect: 'chart/linechart-simple',
    },
  },
  // LineChart
  {
    id: 'Chart:Line:',
    label: 'Simple Line Chart',
    parentId: 'Chart:Line',
    data: {
      path: 'chart/linechart-simple',
      component: SimpleLineChart,
      title: 'Line Chart - Simple',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/line/simple.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Line:NoMouseTracking',
    label: 'Line Chart No Mouse Tracking',
    parentId: 'Chart:Line',
    data: {
      path: 'chart/linechart-no-mouse-tracking',
      component: LineChartNoMouseTracking,
      title: 'Line Chart - No Mouse Tracking',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/line/NoMouseTracking.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Line:DateMode',
    label: 'Line Chart Date Mode',
    parentId: 'Chart:Line',
    data: {
      path: 'chart/linechart-date-mode',
      component: LineChartDateMode,
      title: 'Line Chart - Date Mode',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/line/DateMode.tsx',
      ],
      renderVertically: true,
    },
  },

  {
    id: 'Chart:Line:CustomMouseOver',
    label: 'Line Chart Custom Mouse Over',
    parentId: 'Chart:Line',
    data: {
      path: 'chart/linechart-custom-mouse-over',
      component: LineChartCustomMouseOver,
      title: 'Line Chart - Custom Mouse Over',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/line/DateMode.tsx',
      ],
      renderVertically: true,
    },
  },
  // Gantt
  {
    id: 'Chart:Gantt',
    label: 'Gantt Examples',
    parentId: 'Chart',
    data: {
      path: 'chart/ganttchart-examples',
      component: '',
      redirect: 'chart/ganttchart-simple',
    },
  },
  {
    id: 'Chart:Gantt:Simple',
    label: 'Simple Gantt Chart',
    parentId: 'Chart:Gantt',
    data: {
      path: 'chart/ganttchart-simple',
      component: SimpleGanttChart,
      title: 'Gantt Chart - Simple',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/gantt/Simple.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Gantt:SmartEdges',
    label: 'Smart Edges Gantt Chart',
    parentId: 'Chart:Gantt',
    data: {
      path: 'chart/ganttchart-smart-edges',
      component: SmartEdgesGanttChart,
      title: 'Gantt Chart - Smart Edges',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/gantt/SmartEdges.tsx',
      ],
      renderVertically: true,
    },
  },
  {
    id: 'Chart:Gantt:MouseOver',
    label: 'Mouse Over Gantt Chart',
    parentId: 'Chart:Gantt',
    data: {
      path: 'chart/ganttchart-mouse-over',
      component: MouseOverGanttChart,
      title: 'Gantt Chart - Mouse Over',
      codeBlocks: [
        '/static/src/demo-app/routes/examples/chart/examples/gantt/MouseOver.tsx',
      ],
      renderVertically: true,
    },
  },

  ...stories,
  ...edgeRouterTreeNodes,
];
