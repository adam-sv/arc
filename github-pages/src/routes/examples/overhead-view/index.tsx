import OverHeadChiral from './Chiral';
import OverheadPointBased from './PointBased';
import OverheadFreeCoords from './FreeCoords';
import OverheadFreeCoordsYCenterline from './FreeCoordsYCenterline';
import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'OverheadView',
    label: 'OverheadView',
    parentId: null,
    data: {
      path: '/OverheadView',
      component: '',
      redirect: '/OverheadView/chiral',
    },
  },
  {
    id: 'OverheadView:Chiral',
    label: 'Chiral',
    parentId: 'OverheadView',
    data: {
      path: '/OverheadView/chiral',
      component: OverHeadChiral,
      title: 'OverheadView Chiral Segments',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/overhead-view/Chiral.tsx'],
    },
  },
  {
    id: 'OverheadView:PointBased',
    label: 'Point Based',
    parentId: 'OverheadView',
    data: {
      path: '/OverheadView/pointbased',
      component: OverheadPointBased,
      title: 'OverheadView Point Based Segments',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/overhead-view/PointBased.tsx'],
    },
  },
  {
    id: 'OverheadView:FreeCoords',
    label: 'Free Coords',
    parentId: 'OverheadView',
    data: {
      path: '/OverheadView/freecoords',
      component: OverheadFreeCoords,
      title: 'OverheadView Free Position Segments',
      renderVertically: true,
      codeBlocks: ['/src/routes/examples/overhead-view/FreeCoords.tsx'],
    },
  },
  {
    id: 'OverheadView:FreeCoordsYCenterline',
    label: 'Free Coords w/ Y-centerline',
    parentId: 'OverheadView',
    data: {
      path: '/OverheadView/freecoords-y-centerline',
      component: OverheadFreeCoordsYCenterline,
      title: 'OverheadView Free Position Segments - Y Centerline',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/overhead-view/FreeCoordsYCenterline.tsx',
      ],
    },
  },
];
