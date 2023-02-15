import React, { useState } from 'react';
import {
  Panel,
  TreeBrowser,
  Dropdown,
  TreeNodeId,
  IDropdownItem,
} from '@adam-sv/arc';
import nodes from './example-nodes';

export function PlaygroundTreeBrowser(): JSX.Element {
  const [selectedNodeId, setSelectedNodeId] = useState<
    TreeNodeId | undefined
  >();
  const displayItems = [
    { label: 'Show Current Value', value: true },
    { label: 'Hide Current Value', value: false },
  ];
  const asModalItems = [
    { label: 'Use as Modal', value: true },
    { label: 'Inline', value: false },
  ];
  const [selectedDisplayItem, setSelectedDisplayItem] = useState<IDropdownItem>(
    displayItems[0]
  );
  const [selectedAsModalItem, setSelectedAsModalItem] = useState<IDropdownItem>(
    asModalItems[0]
  );

  const value = selectedDisplayItem === displayItems[0];
  const useAsModal = selectedDisplayItem === asModalItems[0];

  return (
    <Panel>
      <div className='ArcSizeCompact flex-row' style={{ marginBottom: 20 }}>
        <Dropdown
          items={displayItems}
          onChange={setSelectedDisplayItem}
          value={selectedDisplayItem?.value || displayItems[0].value || false}
        />
        <Dropdown
          items={asModalItems}
          onChange={setSelectedAsModalItem}
          value={selectedAsModalItem?.value || asModalItems[0].value || false}
        />
      </div>
      <TreeBrowser
        displayCurrentValue={value}
        label='Playground TreeBrowser'
        onChange={(node) => setSelectedNodeId(node ? node.id : undefined)}
        placeholder='Select a node...'
        selectedNodeId={selectedNodeId}
        titleText='Playground TreeBrowser'
        trees={[{ nodes }]}
        useAsModal={useAsModal}
      />
    </Panel>
  );
}
