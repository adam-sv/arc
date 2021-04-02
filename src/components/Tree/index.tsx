// dependencies
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
// internals
import { cn, getSizeClassName, LogicalArcGraph } from '@adam-sv/arc';
// styles
import './style.css';
// types
import type { RenderableContent } from '@adam-sv/arc';
import type { IProcessedTreeNode, ITreeGraph, ITreeNode, ITreeProps, TreeNodeId } from './types';
export type { TreeNodeId, ITreeNode, IProcessedTreeNode, ITreeProps, ITreeGraph };

export function Tree(props: ITreeProps) {
  // TODO: if you want nice levels, this should be done a bit smarter
  const { getNodeDepth, initialDepth } = getNodeHelpers(props);
  const [expandedMap, setExpandedMap] = useState<Map<TreeNodeId, boolean>>(
    new Map(props.nodes.map(n => [n.id, getNodeDepth(n) < initialDepth]))
  );

  function onNodeClicked(e: SyntheticEvent, node: IProcessedTreeNode) {
    const nodeExpansion = !expandedMap.get(node.id);
    expandedMap.set(node.id, nodeExpansion);
    setExpandedMap(new Map(expandedMap));

    const children = graph.getChildren(node.id);

    if (props.nodeListeners) {
      const { onClick, didExpand, didCollapse } = props.nodeListeners;

      if (onClick) { onClick(node); }
      if (children.length < 1) { return; }
      if (nodeExpansion && didExpand) { didExpand(node); }
      if (!nodeExpansion && didCollapse) { didCollapse(node); }
    }
  }

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
          onNodeClicked={onNodeClicked}
          selectedNodeId={props.selectedNodeId}
          emptyContentMessage={props.emptyContentMessage}
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

interface INodeProps {
  node?: IProcessedTreeNode;
  graph: ITreeGraph;
  expandedMap: Map<TreeNodeId, boolean>;
  onNodeClicked: (e: SyntheticEvent, node: IProcessedTreeNode) => void;
  selectedNodeId?: TreeNodeId;
  emptyContentMessage?: string | RenderableContent;
}

function Node(props: INodeProps) {
  const { emptyContentMessage, expandedMap, graph, node, onNodeClicked } = props;
  if (!node) {
    return null;
  }

  const children = graph.getChildren(node.id);
  const isExpanded = expandedMap.get(node.id);
  const isLeaf = children.length === 0;

  return (
    <div
      className={cn(
        "ArcTree-Node",
        node.className,
        node.disabled && 'disabled',
        isLeaf && 'ArcTree-Node-leaf',
        props.selectedNodeId === node.id && 'ArcTree-Node-selected',
      )}
    >
      <div
        className="ArcTree-Node-content"
        onClick={e => onNodeClicked(e, node)}
      >
        <div className="ArcTree-Node-content-iconContainer">
          <NodeIcon
            isExpanded={isExpanded}
            isLeaf={isLeaf}
          />
        </div>
        <div className="ArcTree-Node-label">{node.label}</div>
      </div>
      {isExpanded && !isLeaf && <div className="ArcTree-Node-children">
        {children.map((childNode:IProcessedTreeNode) =>
          <Node
            key={childNode.id}
            expandedMap={expandedMap}
            graph={graph}
            node={childNode}
            onNodeClicked={onNodeClicked}
            selectedNodeId={props.selectedNodeId}
            emptyContentMessage={props.emptyContentMessage}
          />
        )}
      </div>}
      {isExpanded && isLeaf && emptyContentMessage && (
        <div className="ArcTree-Node-children ArcTree-Node-leaf">
          {emptyContentMessage}
        </div>
      )}
    </div>
  );
}

function NodeIcon({ isLeaf, isExpanded }:{ isLeaf: boolean; isExpanded: boolean }) {
  let iconClassName = "ArcTree-Node-content-iconContainer";
  if (isLeaf) {
    return <div className={`${iconClassName}-leafIcon`}></div>;
  } else {
    iconClassName = cn(
      `${iconClassName}-expansionIcon`,
      `${iconClassName}-expansionIcon-${
          isExpanded ? 'expanded' : 'collapsed'
        }`,
    );
    return <div className={iconClassName} />;
  }
}
