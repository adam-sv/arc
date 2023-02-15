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
import {
  useHistory,
  Route,
  Redirect,
  Switch,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
// Stories
import { treeNodes as accordionTreeNodes } from './accordion';
import { treeNodes as alertTreeNodes } from './alert-modal';
import { treeNodes as applicationBannerTreeNodes } from './application-banner';
import { treeNodes as autocompleteInputTreeNodes } from './autocomplete-input';
import { treeNodes as backgroundTreeNodes } from './background';
import { treeNodes as buttonTreeNodes } from './button';
import { treeNodes as carouselTreeNodes } from './carousel';
import { treeNodes as cabinViewTreeNodes } from './cabin-view';
import { treeNodes as chartTreeNodes } from './chart';
import { treeNodes as checkBoxTreeNodes } from './checkbox';
import { treeNodes as colorInputTreeNodes } from './color-input';
import { treeNodes as confirmTreeNodes } from './confirm-modal';
import { treeNodes as contextMenuTreeNodes } from './context-menu';
import { treeNodes as dropdownTreeNodes } from './dropdown';
import { treeNodes as edgeRouterTreeNodes } from './edgerouter';
import { treeNodes as fileInputNodes } from './file-input';
import { treeNodes as floatingPanelNodes } from './floating-panel';
import { treeNodes as formTreeNodes } from './form';
import { treeNodes as infoIconTreeNodes } from './info-icon';
import { treeNodes as inputTreeNodes } from './input';
import { treeNodes as leftNavigationTreeNodes } from './left-navigation';
import { treeNodes as menuListTreeNodes } from './menu-list';
import { treeNodes as modalTreeNodes } from './modal';
import { treeNodes as monoiconTreeNodes } from './monoicon';
import { treeNodes as mouseOverTreeNodes } from './mouse-over';
import { treeNodes as multiTextInputNodes } from './multitext-input';
import { treeNodes as navTreeNodes } from './nav';
import { treeNodes as panelTreeNodes } from './panel';
import { treeNodes as pinnedPanelNodes } from './pinned-panel';
import { treeNodes as segmentCanvasNodes } from './segment-canvas';
import { treeNodes as sliderTreeNodes } from './slider';
import { treeNodes as tableTreeNodes } from './table';
import { treeNodes as textInputTreeNodes } from './textinput';
import { treeNodes as titleTreeNodes } from './title';
import { treeNodes as toggleTreeNodes } from './toggle';
import { treeNodes as treeComponentNodes } from './tree';
import { treeNodes as treeBrowserNodes } from './tree-browser';
import { treeNodes as dragDropNodes } from './drag-drop';
// Pages
import Example from './Example';
// types
import type { TreeNodeId } from '@adam-sv/arc';
import type { IExampleData } from './types';
// version
import packageJson from '../../../package.json';

const treeNodes = [
  ...accordionTreeNodes,
  ...alertTreeNodes,
  ...applicationBannerTreeNodes,
  ...autocompleteInputTreeNodes,
  ...backgroundTreeNodes,
  ...buttonTreeNodes,
  ...carouselTreeNodes,
  ...cabinViewTreeNodes,
  ...chartTreeNodes,
  ...checkBoxTreeNodes,
  ...colorInputTreeNodes,
  ...confirmTreeNodes,
  ...contextMenuTreeNodes,
  ...dragDropNodes,
  ...dropdownTreeNodes,
  ...edgeRouterTreeNodes,
  ...fileInputNodes,
  ...floatingPanelNodes,
  ...formTreeNodes,
  ...infoIconTreeNodes,
  ...inputTreeNodes,
  ...leftNavigationTreeNodes,
  ...menuListTreeNodes,
  ...modalTreeNodes,
  ...monoiconTreeNodes,
  ...mouseOverTreeNodes,
  ...multiTextInputNodes,
  ...navTreeNodes,
  ...panelTreeNodes,
  ...pinnedPanelNodes,
  ...segmentCanvasNodes,
  ...sliderTreeNodes,
  ...tableTreeNodes,
  ...textInputTreeNodes,
  ...titleTreeNodes,
  ...toggleTreeNodes,
  ...treeComponentNodes,
  ...treeBrowserNodes,
];

const getRoutes = (pathRoot: string) =>
  treeNodes
    .filter((n) => !!n.data)
    .map((n) =>
      n.data?.redirect ? (
        <Redirect
          exact
          from={`${pathRoot}${n.data.path}`}
          to={`${pathRoot}${n.data.redirect}`}
          key={`redirect:${n.id}`}
        />
      ) : (
        <Route
          exact
          path={`${pathRoot}${n.data?.path || ''}`}
          key={`route:${n.id}`}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          <Example exampleData={n.data!} />
        </Route>
      )
    );

function Component(): JSX.Element {
  const history = useHistory();
  const [selectedNodeId, setSelectedNodeId] = useState<
    TreeNodeId | undefined
  >();
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const [autocompleteValue, setAutocompleteValue] = useState<
    string | undefined
  >();
  const [filteredTreeNodes, setFilteredTreeNodes] =
    useState<ITreeNode<IExampleData>[]>(treeNodes);

  const listeners = {
    onClick: (node: IProcessedTreeNode<IExampleData>) => {
      const redirectedNode = getRedirectDestination(node, filteredTreeNodes);
      if (redirectedNode.data) {
        history.push(`${path}${redirectedNode.data.path}`);
        setSelectedNodeId(redirectedNode.id);
      }
    },
  };

  // when we don't have selectedNodeId and we do have path, let's find the node
  useEffect(() => {
    if (pathname) {
      const pathMatch = pathname.slice(path.length);
      const selectedNode = filteredTreeNodes.find(
        (ftn) => ftn.data?.path === pathMatch
      );

      if (selectedNode && !selectedNodeId) {
        setSelectedNodeId(selectedNode.id);
      } else if (!pathMatch) {
        setSelectedNodeId(undefined);
      }
    }
  }, [pathname, selectedNodeId, filteredTreeNodes, path]);

  // when the autocompleteValue changes, update the tree
  useEffect(() => {
    // filter tree nodes based on value
    const filtered = treeNodes.filter(
      (treeNode: ITreeNode<IExampleData>) =>
        treeNode.label
          .toLowerCase()
          .includes((autocompleteValue || '').toLowerCase()) ||
        `${treeNode.id}`
          .toLowerCase()
          .includes((autocompleteValue || '').toLowerCase())
    );

    const filteredWithParents = filtered.reduce(
      (acc: ITreeNode<IExampleData>[], cur: ITreeNode<IExampleData>) => {
        // recursively get all parents, grandparents etc
        const parents = [cur];
        let nextParentId = cur.parentId;
        for (;;) {
          if (!nextParentId) break;
          const nextParent = treeNodes.find(
            (n: ITreeNode<IExampleData>) => n.id === nextParentId
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
      (acc: ITreeNode<IExampleData>[], cur: ITreeNode<IExampleData>) => {
        if (acc.find((n: ITreeNode<IExampleData>) => n.id === cur.id))
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
        (treeNode: ITreeNode<IExampleData>) =>
          treeNode.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${treeNode.id}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((treeNode: ITreeNode<IExampleData>) => `${treeNode.id}`)
      .slice(0, 5);
  };

  const routes = getRoutes(path);

  return (
    <div className='example-view'>
      <div className='example-explorer'>
        <AutocompleteInput
          onChange={(val: string | number) => setAutocompleteValue(`${val}`)}
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
      <Switch>
        <Route exact path={`${path}`} key={`route:examples`}>
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
                      Use the Tree in the Examples page to see component use
                      cases & their code implementations.
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
        </Route>
        {routes}
      </Switch>
    </div>
  );
}

export default Component;

const getRedirectDestination = (
  node: ITreeNode<IExampleData>,
  nodes: ITreeNode<IExampleData>[]
): ITreeNode<IExampleData> => {
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
    redirectPath = relatedNode?.data?.redirect;

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
