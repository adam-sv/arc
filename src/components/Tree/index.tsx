// dependencies
import React, { SyntheticEvent, useState } from 'react';
// internals
import { cn, getSizeClassName, LogicalArcGraph } from '@adam-sv/arc';
import { Node } from './Node';
// styles
import './style.css';
// types
import type { IProcessedTreeNode, ITreeGraph, ITreeNode, ITreeProps, TreeNodeId } from './types';
export type { TreeNodeId, ITreeNode, IProcessedTreeNode, ITreeProps, ITreeGraph };

export function Tree(props: ITreeProps) {
  const { getNodeDepth, initialDepth } = getNodeHelpers(props);
  const [expandedMap, setExpandedMap] = useState<Map<TreeNodeId, boolean>>(
    new Map(props.nodes.map(n => [n.id, getNodeDepth(n) < initialDepth]))
  );

  function onNodeContentClicked(e: SyntheticEvent, node: IProcessedTreeNode) {
    if (props.nodeListeners) {
      const { onClick } = props.nodeListeners;

      if (onClick && !node.disabled) {
        onClick(node);
      }
    }
  }
  
  function onExpandToggleClicked(e: SyntheticEvent, node: IProcessedTreeNode) {
    const nodeExpansion = !expandedMap.get(node.id);
    expandedMap.set(node.id, nodeExpansion);
    setExpandedMap(new Map(expandedMap));

    if (props.nodeListeners) {
      const children = graph.getChildren(node.id);
      const { didExpand, didCollapse } = props.nodeListeners;

      if (children.length < 1) {
        return;
      } else if (nodeExpansion && didExpand) {
        didExpand(node);
      } else if (!nodeExpansion && didCollapse) {
        didCollapse(node);
      }
    }
  }

  // LogicalArcGraph knows parent/child relationships independently of 'edges'
  // as it supports nested graphs
  const graph = new LogicalArcGraph(props.nodes, []);
  return (
    <div
      className={cn(
        !props.overrideDefaultClassName && "ArcTree",
        props.className,
        props.componentSize && getSizeClassName(props.componentSize),
      )}
    >
      {graph.rootNodes.map((rootNode: IProcessedTreeNode) =>
        <Node
          key={rootNode.id}
          expandedMap={expandedMap}
          graph={graph}
          node={rootNode}
          onExpandToggleClicked={onExpandToggleClicked}
          onNodeContentClicked={onNodeContentClicked}
          selectedNodeId={props.selectedNodeId}
          emptyContentMessage={props.emptyContentMessage}
          allowNonLeafSelection={props.allowNonLeafSelection}
          hasClickListeners={typeof props.nodeListeners?.onClick === 'function'}
        />
      )}
    </div>
  );
}

interface INodeHelpers {
  nodeMap: Map<TreeNodeId, ITreeNode>;
  getNodeDepth: (node: ITreeNode) => number;
  initialDepth: number;
}

function getNodeHelpers(props: ITreeProps): INodeHelpers {
  const nodeMap = new Map(props.nodes.map(node => [node.id, node]));
  function getNodeDepth(node: ITreeNode): number {
    if (node.parentId === null || !nodeMap.get(node.parentId)) {
      return 0;
    }
    return getNodeDepth(nodeMap.get(node.parentId)) + 1;
  }

  let initialDepth = 1;
  if (typeof props.initiallyExpandedDepth === 'number') {
    if (props.initiallyExpandedDepth < 0) {
      initialDepth = Infinity;
    } else {
      initialDepth = props.initiallyExpandedDepth;
    }
  }

  return { nodeMap, getNodeDepth, initialDepth };
}
