import React, { useState } from 'react';
import { Panel, TreeBrowser, TreeNodeId } from '@adam-sv/arc';
import nodes from './example-nodes';

export function CompactTreeBrowser(): JSX.Element {
  const [selectedNodeId, setSelectedNodeId] = useState<TreeNodeId | undefined>(
    nodes[1].id
  );

  return (
    <Panel>
      <TreeBrowser
        componentSize='compact'
        onChange={(node) => {
          console.info({ node });
          setSelectedNodeId(node?.id);
        }}
        selectedNodeId={selectedNodeId}
        placeholder='No file selected...'
        titleText='Compact TreeBrowser'
        trees={[{ nodes }]}
      />
      <div style={{ minHeight: 80, display: 'grid', placeContent: 'center' }}>
        <i>Selected value:</i>
        <b>{selectedNodeId}</b>
      </div>
    </Panel>
  );
}
