// dependencies
import { useEffect, useState } from 'react';
import {
  AutocompleteInput,
  IProcessedTreeNode,
  ITreeNode,
  Panel,
  Title,
  Tree,
} from '@adam-sv/arc';
import { useNavigate, Route, Navigate, useMatch, Outlet } from 'react-router';
// Stories
import { treeNodes as accordionTreeNodes } from './accordion';
import { treeNodes as alertTreeNodes } from './alert-modal';
import { treeNodes as applicationBannerTreeNodes } from './application-banner';
import { treeNodes as autocompleteInputTreeNodes } from './autocomplete-input';
import { treeNodes as backgroundTreeNodes } from './background';
import { treeNodes as buttonTreeNodes } from './button';
import { treeNodes as carouselTreeNodes } from './carousel';
import { treeNodes as chartTreeNodes } from './chart';
import { treeNodes as checkBoxTreeNodes } from './checkbox';
import { treeNodes as colorInputTreeNodes } from './color-input';
import { treeNodes as confirmTreeNodes } from './confirm-modal';
import { treeNodes as contextMenuTreeNodes } from './context-menu';
import { treeNodes as dropdownTreeNodes } from './dropdown';
import { treeNodes as fileInputNodes } from './file-input';
import { treeNodes as floatingPanelNodes } from './floating-panel';
import { treeNodes as formTreeNodes } from './form';
import { treeNodes as infoIconTreeNodes } from './info-icon';
import { treeNodes as inputTreeNodes } from './input';
import { treeNodes as leftNavigationTreeNodes } from './left-navigation';
import { treeNodes as loaderTreeNodes } from './loader';
import { treeNodes as menuListTreeNodes } from './menu-list';
import { treeNodes as modalTreeNodes } from './modal';
import { treeNodes as mouseOverTreeNodes } from './mouse-over';
import { treeNodes as multiTextInputNodes } from './multitext-input';
import { treeNodes as navTreeNodes } from './nav';
import { treeNodes as panelTreeNodes } from './panel';
import { treeNodes as parallelAxisChartNodes } from './parallel-axis-chart';
import { treeNodes as pinnedPanelNodes } from './pinned-panel';
import { treeNodes as sliderTreeNodes } from './slider';
import { treeNodes as spinnerTreeNodes } from './spinner';
import { treeNodes as tableTreeNodes } from './table';
import { treeNodes as textInputTreeNodes } from './textinput';
import { treeNodes as titleTreeNodes } from './title';
import { treeNodes as toggleTreeNodes } from './toggle';
import { treeNodes as treeComponentNodes } from './tree';
import { treeNodes as treeBrowserNodes } from './tree-browser';
import { treeNodes as dragDropNodes } from './drag-drop';
import { treeNodes as matIconNodes } from './mat-icon';
// Pages
import Example from './Example';
// types
import type { IExampleData } from './types';
// version
import packageJson from '../../../../package.json';

const treeNodes = [
  ...accordionTreeNodes,
  ...alertTreeNodes,
  ...applicationBannerTreeNodes,
  ...autocompleteInputTreeNodes,
  ...backgroundTreeNodes,
  ...buttonTreeNodes,
  ...carouselTreeNodes,
  ...chartTreeNodes,
  ...checkBoxTreeNodes,
  ...colorInputTreeNodes,
  ...confirmTreeNodes,
  ...contextMenuTreeNodes,
  ...dragDropNodes,
  ...dropdownTreeNodes,
  ...fileInputNodes,
  ...floatingPanelNodes,
  ...formTreeNodes,
  ...infoIconTreeNodes,
  ...inputTreeNodes,
  ...leftNavigationTreeNodes,
  ...loaderTreeNodes,
  ...matIconNodes,
  ...menuListTreeNodes,
  ...modalTreeNodes,
  ...mouseOverTreeNodes,
  ...multiTextInputNodes,
  ...navTreeNodes,
  ...panelTreeNodes,
  ...parallelAxisChartNodes,
  ...pinnedPanelNodes,
  ...sliderTreeNodes,
  ...spinnerTreeNodes,
  ...tableTreeNodes,
  ...textInputTreeNodes,
  ...titleTreeNodes,
  ...toggleTreeNodes,
  ...treeComponentNodes,
  ...treeBrowserNodes,
];

export const getRoutes = () => {
  return treeNodes
    .filter((n) => !!n.data)
    .map((n) => {
      const path = n.data?.path;
      const redirect = n.data?.redirect;

      return path ? (
        <Route
          key={`${redirect ? 'redirect' : 'route'}:${n.id}`}
          path={path}
          element={
            redirect ? (
              <Navigate to={redirect} />
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              <Example key={`example:${n.id}`} exampleData={n.data!} />
            )
          }
        />
      ) : null;
    });
};

function Component(): React.JSX.Element {
  const navigate = useNavigate();
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();
  const path = useMatch('/examples/*');
  const [autocompleteValue, setAutocompleteValue] = useState<
    string | undefined
  >();
  const [filteredTreeNodes, setFilteredTreeNodes] =
    useState<ITreeNode<IExampleData, string>[]>(treeNodes);

  const listeners = {
    onClick: (node: IProcessedTreeNode<IExampleData, string>) => {
      const redirectedNode = getRedirectDestination(node, filteredTreeNodes);
      if (redirectedNode.data) {
        // NB: => paths with leading '/' are considered absolute paths
        void navigate(redirectedNode.data.path);
        setSelectedNodeId(redirectedNode.id);
      }
    },
  };

  // when we don't have selectedNodeId and we do have path, let's find the node
  useEffect(() => {
    if (path?.pathname) {
      const { pathname, pathnameBase } = path;
      /**
       * pathname = /examples/accordian/simple
       * pathnameBase = /examples
       * data.path = accordian/simple
       */
      const pathMatch = pathname.slice(pathnameBase.length + 1);

      const selectedNode = filteredTreeNodes.find(
        (ftn) => ftn.data?.path === pathMatch
      );

      if (selectedNode && !selectedNodeId) {
        setSelectedNodeId(selectedNode.id);
      } else if (!pathMatch) {
        setSelectedNodeId(undefined);
      }
    }
  }, [path, selectedNodeId, filteredTreeNodes]);

  // when the autocompleteValue changes, update the tree
  useEffect(() => {
    // filter tree nodes based on value
    const filtered = treeNodes.filter(
      (treeNode: ITreeNode<IExampleData, string>) =>
        treeNode.label
          .toLowerCase()
          .includes((autocompleteValue || '').toLowerCase()) ||
        treeNode.id
          .toLowerCase()
          .includes((autocompleteValue || '').toLowerCase())
    );

    const filteredWithParents: ITreeNode<IExampleData, string>[] =
      filtered.reduce<ITreeNode<IExampleData, string>[]>(
        (
          acc: ITreeNode<IExampleData, string>[],
          cur: ITreeNode<IExampleData, string>
        ) => {
          // recursively get all parents, grandparents etc
          const parents = [cur];
          let nextParentId = cur.parentId;
          for (;;) {
            if (!nextParentId) break;
            const nextParent = treeNodes.find(
              (n: ITreeNode<IExampleData, string>) => n.id === nextParentId
            );
            if (!nextParent) break;
            parents.push(nextParent);
            if (!nextParent.parentId) break;
            else nextParentId = nextParent.parentId;
          }

          return [...acc, ...parents];
        },
        []
      );

    // deduplicate tree nodes
    const dedupedFilteredWithParents = filteredWithParents.reduce(
      (
        acc: ITreeNode<IExampleData, string>[],
        cur: ITreeNode<IExampleData, string>
      ) => {
        if (acc.find((n: ITreeNode<IExampleData, string>) => n.id === cur.id))
          return acc;
        return [...acc, cur];
      },
      []
    );

    setFilteredTreeNodes(dedupedFilteredWithParents);
  }, [autocompleteValue]);

  const autocompleteExamples = (searchTerm: string) => {
    return treeNodes
      .filter(
        (treeNode: ITreeNode<IExampleData, string>) =>
          treeNode.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          treeNode.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((treeNode: ITreeNode<IExampleData, string>) => treeNode.id)
      .slice(0, 5);
  };

  const onSelectNode = (entry: string) => {
    const node = treeNodes.find((node) => node.id === entry);
    if (node)
      listeners.onClick(node as IProcessedTreeNode<IExampleData, string>);
  };

  return (
    <div className='example-view'>
      <div className='example-explorer'>
        <AutocompleteInput
          displayClear
          onChange={(val: string | number) => {
            setAutocompleteValue(`${val}`);
          }}
          autocompleteEntryWasSelected={onSelectNode}
          placeholder='Search for an example'
          autocompleteSearch={autocompleteExamples}
          label='Example Search'
        />
        <Tree
          nodes={filteredTreeNodes}
          nodeListeners={listeners}
          allowNonLeafSelection={true}
          selectedNodeId={selectedNodeId}
        />
      </div>
      {useMatch('/examples') && (
        <Panel className='ExamplesBlurb'>
          <Title titleType={4}>Project ADAM React Components - ARC</Title>
          <Title titleType={5}>Version ${packageJson.version}</Title>
          <div className='ExamplesBlurb-text'>
            Use the app-level LeftNav to switch between Theming and Examples.
            <ul>
              <li>
                The Examples are presented in a Storybook-like fashion, with a
                live UI rendered and the React code written to render it.
                <ul>
                  <li>
                    Use the Tree in the Examples page to see component use cases
                    & their code implementations.
                  </li>
                </ul>
              </li>
              <li>
                The Theming allows you to dynamically change the theme of the
                app - all colors are defined via CSS variables.
              </li>
            </ul>
          </div>
        </Panel>
      )}
      <Outlet />
    </div>
  );
}

export default Component;

const getRedirectDestination = (
  node: ITreeNode<IExampleData, string>,
  nodes: ITreeNode<IExampleData, string>[]
): ITreeNode<IExampleData, string> => {
  let redirectPath = node.data?.redirect;
  let relatedNode = node;

  let i = 0;
  while (
    redirectPath &&
    nodes.find((tn) => tn.data?.path === redirectPath) &&
    // safety is ugly, but so is a bad tree configuration crashing Chrome
    i < nodes.length * 2
  ) {
    relatedNode =
      nodes.find((tn) => tn.data?.path === redirectPath) || relatedNode;
    redirectPath = relatedNode.data?.redirect;

    i++;
    if (i > nodes.length * 2 - 2) {
      // eslint-disable-next-line
      console.warn(
        'ARC warning: redirects in the component tree seem to be cyclic'
      );
    }
  }

  return relatedNode;
};
