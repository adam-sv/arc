import React, { useState } from 'react';
import { Panel, TreeBrowser, TreeNodeId } from '@adam-sv/arc';
import { getAppRootElement } from 'src/app';
import nodes from './example-nodes';

export function ModalTreeBrowser(): JSX.Element {
  const [selectedNodeId, setSelectedNodeId] = useState<TreeNodeId | undefined>(
    nodes[1].id
  );

  return (
    <Panel>
      <TreeBrowser
        info='Shows info via InputSkeleton'
        error='Required'
        label='Modal TreeBrowser'
        onChange={(node) => {
          console.info({ node });
          setSelectedNodeId(node?.id);
        }}
        placeholder='No file selected...'
        portalTargetElement={getAppRootElement()}
        selectedNodeId={selectedNodeId}
        trees={[{ nodes }]}
        useAsModal
      />
      <div style={{ minHeight: 80, display: 'grid', placeContent: 'center' }}>
        <i>Selected value:</i>
        <b>{selectedNodeId}</b>
      </div>
    </Panel>
  );
}
