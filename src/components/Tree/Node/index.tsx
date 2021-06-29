// dependencies
import React, { SyntheticEvent, useState } from 'react';
import { cn } from '@adam-sv/arc';
// style
import './style.css';
// types
import type { RenderableContent } from '@adam-sv/arc';
import type { IProcessedTreeNode, ITreeGraph, TreeNodeId } from '..';

export interface INodeProps {
  node?: IProcessedTreeNode;
  graph: ITreeGraph;
  expandedMap: Map<TreeNodeId, boolean>;
  onExpandToggleClicked: (e: SyntheticEvent, node: IProcessedTreeNode) => unknown;
  onNodeContentClicked: (e: SyntheticEvent, node: IProcessedTreeNode) => unknown;
  selectedNodeId?: TreeNodeId;
  emptyContentMessage?: string | RenderableContent;
  allowNonLeafSelection?: boolean; // true if you can listen to click events on a node which has children (i.e. a "folder" if the Tree is a filesystem)
  hasClickListeners?: boolean;     // true if ITreeProps.nodeListeners.onClick is a function
}

export function Node(props: INodeProps) {
  const { emptyContentMessage, expandedMap, graph, node, onExpandToggleClicked, onNodeContentClicked } = props;
  const [collapseColIsHovered, setCollapseColIsHovered] = useState(false);

  // why would we protect against this?
  if (!node) {
    return null;
  }

  const children = graph.getChildren(node.id);
  const isExpanded = expandedMap.get(node.id);
  const isLeaf = children.length === 0;
  const isClickable = Boolean((props.allowNonLeafSelection || isLeaf) && props.hasClickListeners);

  return (
    <div
      className={cn(
        "ArcTree-Node",
        node.className,
        node.disabled && 'ArcTree-Node-disabled',
        collapseColIsHovered && 'ArcTree-Node-pendingCollapse',
        isLeaf && 'ArcTree-Node-leaf',
        props.selectedNodeId === node.id && 'ArcTree-Node-selected',
        isClickable && 'ArcTree-Node-clickable',
      )}
    >
      <div className="ArcTree-Node-content">
        <NodeIcon
          onClick={(e) => onExpandToggleClicked(e, node)}
          isExpanded={isExpanded}
          isLeaf={isLeaf}
        />
        <div
          className="ArcTree-Node-label"
          onClick={e => onNodeContentClicked(e, node)}
        >
          {node.label}
        </div>
      </div>
      {isExpanded && (
        <div className="ArcTree-Node-childRow">
          <div
            className="ArcTree-Node-childColumn"
            onClick={e => onExpandToggleClicked(e, node)}
            onMouseEnter={e => setCollapseColIsHovered(true)}
            onMouseLeave={e => setCollapseColIsHovered(false)}
          >
            <div className="ArcTree-Node-childColumn-background" />
          </div>
          {!isLeaf && <div className="ArcTree-Node-children">
            {children.map((childNode:IProcessedTreeNode) =>
              <Node
                key={childNode.id}
                expandedMap={expandedMap}
                graph={graph}
                node={childNode}
                onExpandToggleClicked={onExpandToggleClicked}
                onNodeContentClicked={onNodeContentClicked}
                selectedNodeId={props.selectedNodeId}
                emptyContentMessage={props.emptyContentMessage}
                allowNonLeafSelection={props.allowNonLeafSelection}
                hasClickListeners={props.hasClickListeners}
              />
            )}
          </div>}
          {isLeaf && emptyContentMessage && (
            <div className="ArcTree-Node-children ArcTree-Node-leaf">
              {emptyContentMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface INodeIconProps {
  isLeaf: boolean;
  isExpanded: boolean;
  onClick: (e: SyntheticEvent) => unknown;
}

function NodeIcon({ isLeaf, isExpanded, onClick }:INodeIconProps) {
  return (
    <div
      className={cn(
        "ArcTree-Node-iconContainer",
        `ArcTree-Node-iconContainer-${
          isLeaf
            ? 'leaf'
            : isExpanded ? 'expanded' : 'collapsed'
      }`)}
      onClick={onClick}
    >
      <div
        className={cn(isLeaf
          ? "ArcTree-Node-leafIcon"
          : "ArcTree-Node-expansionIcon"
        )}
      />
    </div>
  );
}
