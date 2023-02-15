// dependencies
import React, { SyntheticEvent, useEffect, useState } from 'react';
// internals
import { cn, getSizeClassName, LogicalArcGraph } from '@adam-sv/arc';
import { Node } from './Node';
// styles
import './style.scss';
// types
import type {
  IProcessedTreeNode,
  ITreeGraph,
  ITreeNode,
  ITreeProps,
  TreeNodeId,
} from './types';
export type {
  TreeNodeId,
  ITreeNode,
  IProcessedTreeNode,
  ITreeProps,
  ITreeGraph,
};

export function Tree<T>(props: ITreeProps<T>) {
  const { getNodeDepth, getNodeParentIds, initialDepth } =
    getNodeHelpers(props);
  const selectedChain = getNodeParentIds(
    props.nodes.find((n) => n.id === props.selectedNodeId)
  );
  const isExpanded = (node: ITreeNode<T>) =>
    getNodeDepth(node) < initialDepth ||
    (!props.dontExpandParentChain && selectedChain.includes(node.id));

  // expansion is based on level OR if it is a parent of the selected node
  const [expandedMap, setExpandedMap] = useState<Map<TreeNodeId, boolean>>(
    new Map(props.nodes.map((n) => [n.id, isExpanded(n)]))
  );
  // change the expansion based on eligibility when criteria change
  useEffect(() => {
    setExpandedMap(
      new Map(
        props.nodes.map((n) => [n.id, expandedMap.get(n.id) || isExpanded(n)])
      )
    );
  }, [props.selectedNodeId, initialDepth]);

  function onNodeContentClicked(
    e: SyntheticEvent,
    node: IProcessedTreeNode<T>
  ) {
    if (props.nodeListeners) {
      const { onClick } = props.nodeListeners;

      if (onClick && !node.disabled) {
        onClick(node);
      }
    }
  }

  const onExpandToggleClicked = (
    e: SyntheticEvent,
    node: IProcessedTreeNode<T>
  ) => {
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
  };

  // LogicalArcGraph knows parent/child relationships independently of 'edges'
  // as it supports nested graphs
  const graph = new LogicalArcGraph(props.nodes, []);
  return (
    <div
      className={cn(
        !props.overrideDefaultClassName && 'ArcTree',
        props.className,
        props.componentSize && getSizeClassName(props.componentSize)
      )}
    >
      {graph.rootNodes.map((rootNode: IProcessedTreeNode<T>) => (
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
      ))}
    </div>
  );
}

interface INodeHelpers<T> {
  nodeMap: Map<TreeNodeId, ITreeNode<T>>;
  getNodeDepth: (node: ITreeNode<T>) => number;
  getNodeParentIds: (node?: ITreeNode<T>) => TreeNodeId[];
  initialDepth: number;
}

const getNodeHelpers = <T,>(props: ITreeProps<T>): INodeHelpers<T> => {
  const nodeMap = new Map(props.nodes.map((node) => [node.id, node]));
  function getNodeDepth(node: ITreeNode<T>): number {
    const treeNode = node.parentId ? nodeMap.get(node.parentId) : undefined;
    if (!treeNode) return 0;
    return getNodeDepth(treeNode) + 1;
  }
  function getNodeParentIds(node?: ITreeNode<T>): TreeNodeId[] {
    if (!node) {
      return [];
    }

    const chain = [node.id];
    let curr = node;
    let i = 0;
    while (
      curr.parentId !== null &&
      props.nodes.find((n) => n.id === curr.parentId) &&
      i < props.nodes.length * 2
    ) {
      curr = props.nodes.find((n) => n.id === curr.parentId) || curr;
      chain.push(curr.id);
      i++;
    }
    return chain;
  }

  let initialDepth = 1;
  if (typeof props.initiallyExpandedDepth === 'number') {
    if (props.initiallyExpandedDepth < 0) {
      initialDepth = Infinity;
    } else {
      initialDepth = props.initiallyExpandedDepth;
    }
  }

  return { nodeMap, getNodeDepth, getNodeParentIds, initialDepth };
};
