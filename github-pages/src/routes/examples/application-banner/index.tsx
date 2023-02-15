import DefaultApplicationBanner from './DefaultApplicationBanner';
import ApplicationBannerWithChildren from './ApplicationBannerWithChildren';
import PurpleApplicationBanner from './PurpleApplicationBanner';
import ApplicationBannerAirbusLink from './ApplicationBannerAirbusLink';
import ApplicationBannerCustomLogo from './ApplicationBannerCustomLogo';

import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'ApplicationBanner',
    label: 'Application Banner',
    parentId: null,
    data: {
      path: '/application-banner',
      component: '',
      redirect: '/application-banner/default',
    },
  },
  {
    id: 'ApplicationBanner:default',
    label: 'Default',
    parentId: 'ApplicationBanner',
    data: {
      path: '/application-banner/default',
      component: DefaultApplicationBanner,
      title: 'Default Application Banner',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/application-banner/DefaultApplicationBanner.tsx',
      ],
    },
  },
  {
    id: 'ApplicationBanner:children',
    label: 'With Children',
    parentId: 'ApplicationBanner',
    data: {
      path: '/application-banner/children',
      component: ApplicationBannerWithChildren,
      title: 'Application Banner with Children',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/application-banner/ApplicationBannerWithChildren.tsx',
      ],
    },
  },
  {
    id: 'ApplicationBanner:purple',
    label: 'Purple Theme',
    parentId: 'ApplicationBanner',
    data: {
      path: '/application-banner/purple',
      component: PurpleApplicationBanner,
      title: 'ApplicationBanner - Purple Theme',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/application-banner/PurpleApplicationBanner.tsx',
      ],
    },
  },
  {
    id: 'ApplicationBanner:airbus',
    label: 'External Link',
    parentId: 'ApplicationBanner',
    data: {
      path: '/application-banner/airbus',
      component: ApplicationBannerAirbusLink,
      title: 'ApplicationBanner - Airbus.com link',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/application-banner/ApplicationBannerAirbusLink.tsx',
      ],
    },
  },
  {
    id: 'ApplicationBanner:logo',
    label: 'Custom Logo',
    parentId: 'ApplicationBanner',
    data: {
      path: '/application-banner/logo',
      component: ApplicationBannerCustomLogo,
      title: 'ApplicationBanner - Custom Logo',
      renderVertically: true,
      codeBlocks: [
        '/src/routes/examples/application-banner/ApplicationBannerCustomLogo.tsx',
      ],
    },
  },
];
