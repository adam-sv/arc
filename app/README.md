# Docs App

This is our replacement for Storybook.

## Caveats

When developing the app, the source code of the examples is copied to the `public` folder so we can statically display the code. However, as you change the examples, it does not get re-copied, so the code doesn't hot-reload. Just run `yarn start` again to get around it.

### Adding component examples to demo app

To add an example of a component to our demo app, take the following steps. If you're adding an example to an existing component, skip to step 4.

1. (new components only) Create your component folder in /app/src/routes/examples in kebab base
ex: `~/arc/ mkdir app/src/routes/examples/your-component`

2. (new components only) Create an index file that exports a root tree node so we can route to your examples. Please keep capitalization and spacing consistent.

```
app/src/routes/examples/your-component/index.ts(x)

import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'YourComponent',
    label: 'Your Component',
    parentId: null,
    data: {
      path: '/your-component',
      component: '', // no component needed, because we're redirecting
      redirect: '/your-component/simple' // redirect to your most basic example (made in step 4)
    }
  },
}
```

3. (new components only) Add your tree nodes to /app/src/routes/examples/index.tsx 

```
/app/src/routes/examples/index.tsx

import { treeNodes as yourComponentTreeNodes } from './your-component';

const treeNodes = [
  <other component spreads>
  ...yourComponentTreeNodes,
  <other component spreads>
];
```

4. Create your example component. Put any data that will be shared between multiple examples in another file.

```
/app/src/routes/examples/your-component/SimpleYourComponent.tsx

import { YourComponent } from '@adam-sv/arc';
import items from './items';

export default (
  <YourComponent items={items} />
);

```

```
/app/src/routes/examples/your-component/items.ts

export default [
  { id: 'item-1', value: 7 },
  { id: 'item-2', value: 14 },
]
```

5. Create a tree node for your new example. Include all code used to generate your example in the codeBlocks field.

```
app/src/routes/examples/your-component/index.ts(x)

import { ITreeNode } from '@adam-sv/arc';
import { IExampleData } from '../types';
import SimpleYourComponent from './SimpleYourComponent';

export const treeNodes: ITreeNode<IExampleData>[] = [
  {
    id: 'YourComponent',
    label: 'Your Component',
    parentId: null,
    data: {
      path: '/your-component',
      component: '', // no component needed, because we're redirecting
      redirect: '/your-component/simple' // redirect to your most basic example (made in step 4)
    }
  },
  {
    id: 'YourComponent:simple',
    label: 'Simple',
    parentId: 'YourComponent',
    data: {
      path: '/your-component/simple',
      component: SimpleYourComponent,
      codeBlocks: [
        '/src/routes/examples/your-component/SimpleYourComponent.tsx',
        '/src/routes/examples/your-component/items.ts',
      ]
    }
  },
}

```

6. Your codeBlock files need to be copied into the public folder and will only be available after a new `yarn start`. After the dev server starts up, navigate to /examples/ to see your new example included in the example explorer tree.
