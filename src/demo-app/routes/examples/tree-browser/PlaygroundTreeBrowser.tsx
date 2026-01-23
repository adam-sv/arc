import { useState, type JSX } from 'react';
import { Panel, TreeBrowser, Dropdown, IDropdownItem } from '@adam-sv/arc';
import nodes from './example-nodes';

const displayItems = [
  { label: 'Show Current Value', value: true },
  { label: 'Hide Current Value', value: false },
];
const asModalItems = [
  { label: 'Use as Modal', value: true },
  { label: 'Inline', value: false },
];

export function PlaygroundTreeBrowser(): JSX.Element {
  const [selectedNodeId, setSelectedNodeId] = useState<number | undefined>();
  const [selectedDisplayItem, setSelectedDisplayItem] = useState<IDropdownItem>(
    displayItems[0]
  );
  const [selectedAsModalItem, setSelectedAsModalItem] = useState<IDropdownItem>(
    asModalItems[0]
  );

  return (
    <Panel>
      <div className='ArcSizeCompact flex-row' style={{ marginBottom: 20 }}>
        <Dropdown
          items={displayItems}
          onChange={setSelectedDisplayItem}
          value={selectedDisplayItem.value}
        />
        <Dropdown
          items={asModalItems}
          onChange={setSelectedAsModalItem}
          value={selectedAsModalItem.value}
        />
      </div>
      <TreeBrowser
        displayCurrentValue={selectedDisplayItem.value as boolean | undefined}
        label='Playground TreeBrowser'
        onChange={(node) => {
          setSelectedNodeId(node ? node.id : undefined);
        }}
        placeholder='Select a node...'
        selectedNodeId={selectedNodeId}
        titleText='Playground TreeBrowser'
        trees={[{ nodes }]}
        useAsModal={selectedAsModalItem.value as boolean | undefined}
      />
    </Panel>
  );
}
