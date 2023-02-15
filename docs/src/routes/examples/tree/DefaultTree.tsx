import React from 'react';
import { Panel, Tree } from '@adam-sv/arc';
import nodes from './example-nodes';
import { Title } from '@adam-sv/arc';
export default (
  <Panel>
    <Title>Default</Title>
    <Tree nodes={nodes} />
    <Title>Not Expanded Initially</Title>
    <Tree nodes={nodes} initiallyExpandedDepth={0} />
    <Title>Not Expanded Initially</Title>
    <Title titleType={4}>
      But we have selected &quot;Node Fifteen&quot;, so minimal expansion will
      happen
    </Title>
    <Tree
      nodes={nodes}
      initiallyExpandedDepth={0}
      selectedNodeId={nodes[14].id}
      nodeListeners={{ onClick: () => null }}
    />
  </Panel>
);
