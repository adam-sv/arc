// dependencies
import { storiesOf } from '@storybook/react';
import React from 'react';

// story helper and component
import { BoxGraph } from '.';
import { getRandomInt } from '../../util';
import { StoryContainer as Story } from '../../utils/StoryContainer';
import { EdgeType } from './const';
import {
  IBoxGraphEdge,
  IBoxGraphHereditaryGroup,
  IBoxGraphNode,
} from '@adam-sv/arc';

const defaultStory = () => {
  const nodes: IBoxGraphNode[] = [
    { id: '1', title: 'Tree One' },
    { id: '2', title: 'Two - Child of One' },
    { id: '3', title: 'Three - Child of Two' },
    { id: '4', title: 'Four - Child of Two' },
    { id: '5', title: 'Five - Child of Two' },

    { id: '10', title: 'Tree Two' },
    { id: '11', title: '11 - Child of Tree Two' },
  ];
  const edges: IBoxGraphEdge[] = [
    { type: EdgeType.Hereditary, nodes: ['1', '2'] },
    { type: EdgeType.Hereditary, nodes: ['2', '3'] },
    { type: EdgeType.Hereditary, nodes: ['2', '4'] },
    { type: EdgeType.Hereditary, nodes: ['2', '5'] },
    { type: EdgeType.Hereditary, nodes: ['10', '11'] },
    { type: EdgeType.Custom, nodes: ['11', '3'] },
  ];

  return (
    <Story>
      <BoxGraph nodes={nodes} edges={edges} initialExpandedChildLayers={4} />
    </Story>
  );
};

const complexRandomizedStory = () => {
  interface IBoxGraphNodesAndEdges {
    nodes: IBoxGraphNode[];
    edges: IBoxGraphEdge[];
  }

  const rootNodeCount = getRandomInt(3, 5); // 3 - 5 root nodes

  const contentGenerator = (nodeModel: IBoxGraphNode) =>
    `${nodeModel.id} - Expanded view`;
  const nodesGenerator = (
    nodeId: string,
    groupId: string
  ): IBoxGraphNodesAndEdges => {
    const node = {
      title: `ID: ${nodeId}`,
      id: nodeId,
      expandedContentGenerator: contentGenerator,
      className: 'CustomNode',
      columnId: Math.random() > 0.5 ? 'test' : undefined,
      groupIds: [groupId],
      onClick: (ev, n) => console.log('you clicked node:', n.title),
      onDoubleClick: (ev, n) => {
        console.log('you double clicked node:', n.title);
        if (n.isExpanded) {
          n.collapse!();
        } else {
          n.expand!();
        }
      },
      didCollapse: n => console.log('you collapsed node:', n.title),
      didExpand: n => console.log('you expanded node:', n.title),
    } as IBoxGraphNode;
    let resultNodes: IBoxGraphNode[] = [node];
    let resultEdges: IBoxGraphEdge[] = [];

    if (Math.random() > 0.5) {
      // 50% chance to have any children
      for (let i = 0; i < getRandomInt(1, 3); i++) {
        // randomize between 1 and 3 children
        const childId = `${nodeId}-${i}`;
        const recurseResult = nodesGenerator(childId, 'child');
        resultNodes = [...resultNodes, ...recurseResult.nodes];
        resultEdges = [
          ...resultEdges,
          {
            nodes: [nodeId, childId],
            type: EdgeType.Hereditary,
          },
          ...recurseResult.edges,
        ];
      }
    }

    return { nodes: resultNodes, edges: resultEdges };
  };

  const { nodes, edges } = Array(rootNodeCount)
    .fill(0)
    .reduce(
      (acc: IBoxGraphNodesAndEdges, zero: number, index: number) => {
        const genResult = nodesGenerator(`R${index}`, 'root');
        return {
          nodes: [...acc.nodes, ...genResult.nodes],
          edges: [...acc.edges, ...genResult.edges],
        };
      },
      { nodes: [], edges: [] }
    );

  const hereditaryGroups: IBoxGraphHereditaryGroup[] = [
    {
      id: 'root',
      canBeChildOf: [], // empty array means it can't be a child of anything
    }, // missing canBeParentOf means it can be a parent of anything
    {
      id: 'child',
      canBeParentOf: ['child'],
      canBeChildOf: ['root', 'child'],
    },
  ];

  return (
    <Story>
      <BoxGraph
        nodes={nodes}
        edges={edges}
        initialExpandedChildLayers={1}
        hereditaryGroups={hereditaryGroups}
      />
    </Story>
  );
};

storiesOf('Visualization/BoxGraph', module)
  .add('Default', defaultStory)
  .add('Complex', complexRandomizedStory);
