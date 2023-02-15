import React, { useState } from 'react';
import { Panel, TreeBrowser, TreeNodeId } from '@adam-sv/arc';
import nodes from './example-nodes';

export function LargeTreeBrowser(): JSX.Element {
  const [selectedNodeId, setSelectedNodeId] = useState<TreeNodeId | undefined>(
    nodes[1].id
  );

  return (
    <Panel>
      <TreeBrowser
        componentSize='large'
        onChange={(node) => {
          console.info({ node });
          setSelectedNodeId(node?.id);
        }}
        placeholder='No file selected...'
        selectedNodeId={selectedNodeId}
        titleText='Large TreeBrowser'
        trees={[{ nodes }]}
      />
      <div style={{ minHeight: 80, display: 'grid', placeContent: 'center' }}>
        <i>Selected value:</i>
        <b>{selectedNodeId}</b>
      </div>
    </Panel>
  );
}
