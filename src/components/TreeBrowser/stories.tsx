// dependencies
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
// StoryTelling
import { Dropdown, TreeBrowser } from '@adam-sv/arc';
import { StoryContainer as Story, StoryVariableDisplay as VariableDisplay } from '../../utils';
// types
import type { IProcessedTreeNode, ITreeNode, TreeNodeId } from '@adam-sv/arc';

const treeBrowserStoryStyle = {
  width: '700px',
  maxWidth: 'calc(100vw - 20px)',
  background: 'var(--surface)',
};
const treeNodes:ITreeNode[] = [
  {
    id: 1,
    label: 'Node One',
    parentId: null,
  },
  {
    id: 2,
    label: 'Node Two',
    parentId: 1,
  },
  {
    id: 3,
    label: 'Node Three',
    parentId: 1,
    disabled: true,
  },
  {
    id: 4,
    label: 'Node Four',
    parentId: null,
  },
  {
    id: 5,
    label: 'Node Five',
    parentId: 4,
  },
  {
    id: 6,
    label: 'Node Six',
    parentId: 5,
  },
  {
    id: 7,
    label: 'Node Seven',
    parentId: 6,
  },
  {
    id: 8,
    label: 'Node Eight',
    parentId: 4,
  },
  {
    id: 9,
    label: 'Node Nine',
    parentId: 8,
  },
  {
    id: 10,
    label: 'Node Ten',
    parentId: 9,
  },
  {
    id: 11,
    label: 'Node Eleven',
    parentId: 10,
  },
  {
    id: 12,
    label: 'Node Twelve',
    parentId: 11,
  },
  {
    id: 13,
    label: 'Node Thirteen',
    parentId: 12,
  },
  {
    id: 14,
    label: 'Node Fourteen',
    parentId: 13,
  },
  {
    id: 15,
    label: 'Node Fifteen',
    parentId: 14,
  },
];
const noop = () => null;

storiesOf('General/TreeBrowser/Modes', module)
  .add('Inline', () => (
    <Story style={treeBrowserStoryStyle}>
      <TreeBrowser
        label="My TreeBrowser"
        placeholder="No file selected..."
        trees={[
          { nodes: treeNodes }
        ]}
        onChange={noop}
      />
    </Story>
  ))
  .add('As Modal', () => (
    <Story style={treeBrowserStoryStyle}>
      <TreeBrowser
        label="My TreeBrowser"
        placeholder="No file selected..."
        trees={[
          { nodes: treeNodes }
        ]}
        onChange={noop}
        useAsModal
        info="Shows info via InputSkeleton"
        error="Required"
      />
    </Story>
  ));

storiesOf('General/TreeBrowser/Display Options', module)
  .add('Playground', () => {
    const [selectedNodeId, setSelectedNodeId] = useState<TreeNodeId | undefined>();
    const [isChecked, setIsChecked] = useState(true);
    const [useAsModal, setUseAsModal] = useState(false);
    const displayItems = [
      { label: 'Show Current Value', value: true },
      { label: 'Hide Current Value', value: false },
    ];
    const asModalItems = [
      { label: 'Use as Modal', value: true },
      { label: 'Inline', value: false },
    ]
    return (
      <Story style={treeBrowserStoryStyle}>
        <div className="ArcSizeCompact flex-row" style={{ marginBottom: 20 }}>
          <Dropdown
            items={displayItems}
            selected={isChecked ? displayItems[0] : displayItems[1]}
            onChange={e => setIsChecked(!isChecked)}
          />
          <Dropdown
            items={asModalItems}
            selected={useAsModal ? asModalItems[0] : asModalItems[1]}
            onChange={e => setUseAsModal(!useAsModal)}
          />
        </div>
        <TreeBrowser
          label="My TreeBrowser"
          placeholder="Select a node..."
          displayCurrentValue={isChecked}
          trees={[
            { nodes: treeNodes }
          ]}
          onChange={node => setSelectedNodeId(node ? node.id : undefined)}
          selectedNodeId={selectedNodeId}
          useAsModal={useAsModal}
        />
      </Story>
    );
  });

storiesOf('General/TreeBrowser/Sizes', module)
  .add('Default', () => (
    <Story style={treeBrowserStoryStyle}>
      <TreeBrowser
        label="My TreeBrowser"
        placeholder="No file selected..."
        trees={[
          { nodes: treeNodes }
        ]}
        onChange={noop}
      />
    </Story>
  ))
  .add('Compact', () => (
    <Story style={treeBrowserStoryStyle}>
      <TreeBrowser
        label="My Compact TreeBrowser"
        placeholder="No file selected..."
        trees={[
          { nodes: treeNodes }
        ]}
        onChange={noop}
        componentSize="compact"
      />
    </Story>
  ))
  .add('Large', () => (
    <Story style={treeBrowserStoryStyle}>
      <TreeBrowser
        label="My Large TreeBrowser"
        placeholder="No file selected..."
        trees={[
          { nodes: treeNodes }
        ]}
        onChange={noop}
        componentSize="large"
      />
    </Story>
  ));

storiesOf('General/TreeBrowser/Load While Navigating', module)
  .add('Adds random handlers', () => {
    const [nodes, setNodes] = useState<ITreeNode[]>([
      { id: 1, label: 'One', parentId: null },
      { id: 2, label: 'Two', parentId: 1 },
    ]);
    return (
      <Story style={treeBrowserStoryStyle}>
        <TreeBrowser
          trees={[{
            nodes: nodes,
            nodeListeners: {
              didExpand: (node: IProcessedTreeNode) => {
                nodes.push({
                  parentId: node.id,
                  label: 'Generated by didExpand handler',
                  id: `${node.id}-${Math.random().toString(36).slice(2, 11)}`,
                });
                setNodes(nodes.slice());
              },
            },
          }]}
          onChange={noop}
          initiallyExpandedDepth={0}
        />
      </Story>
    );
  });

storiesOf('General/TreeBrowser', module)
  .add('Variables', () => (
    <VariableDisplay
      vars={{
        treeNodes,
        treeBrowserStoryStyle,
      }}
    />
  ));
