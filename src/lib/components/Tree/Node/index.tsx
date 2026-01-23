// dependencies
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { cn } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { GraphNodeId, RenderableContent } from '@adam-sv/arc';
import type { IProcessedTreeNode, ITreeGraph } from '..';

export interface INodeProps<NodeType, NodeIdType extends GraphNodeId> {
  node?: IProcessedTreeNode<NodeType, NodeIdType>;
  graph: ITreeGraph<NodeType, NodeIdType>;
  expandedMap: Map<NodeIdType, boolean>;
  onExpandToggleClicked: (
    e: SyntheticEvent,
    node: IProcessedTreeNode<NodeType, NodeIdType>
  ) => unknown;
  onNodeContentClicked: (
    e: SyntheticEvent,
    node: IProcessedTreeNode<NodeType, NodeIdType>
  ) => unknown;
  selectedNodeId?: NodeIdType;
  emptyContentMessage?: string | RenderableContent;
  allowNonLeafSelection?: boolean; // true if you can listen to click events on a node which has children (i.e. a "folder" if the Tree is a filesystem)
  hasClickListeners?: boolean; // true if ITreeProps.nodeListeners.onClick is a function
}

export const Node = <NodeType, NodeIdType extends GraphNodeId>(
  props: INodeProps<NodeType, NodeIdType>
) => {
  const {
    emptyContentMessage,
    expandedMap,
    graph,
    node,
    onExpandToggleClicked,
    onNodeContentClicked,
  } = props;
  const [collapseColIsHovered, setCollapseColIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const children = node ? graph.getChildren(node.id) : [];
  const isExpanded = node ? Boolean(expandedMap.get(node.id)) : false;
  const isLeaf = children.length === 0;
  const isClickable = Boolean(
    (props.allowNonLeafSelection || isLeaf) && props.hasClickListeners
  );
  const isSelected = node ? props.selectedNodeId === node.id : false;

  // try to scroll into view if selected thru a different mechanism
  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isSelected]);

  if (!node) {
    return null;
  }

  return (
    <div
      className={cn(
        'ArcTree-Node',
        node.className,
        node.disabled && 'ArcTree-Node-disabled',
        collapseColIsHovered && 'ArcTree-Node-pendingCollapse',
        isLeaf && 'ArcTree-Node-leaf',
        isSelected && 'ArcTree-Node-selected',
        isClickable && !node.disabled && 'ArcTree-Node-clickable'
      )}
      ref={ref}
    >
      <div
        className={cn(
          'ArcTree-Node-content',
          !isLeaf &&
            `ArcTree-Node-content-${isExpanded ? 'expanded' : 'collapsed'}`
        )}
        onClick={(e) => {
          // Allows user to click on the lable to expand/collapse the leaves
          e.preventDefault();
          if (!isLeaf) {
            onExpandToggleClicked(e, node);
          }
        }}
      >
        <NodeIcon isExpanded={isExpanded} isLeaf={isLeaf} />
        <div
          className='ArcTree-Node-label'
          onClick={(e) => onNodeContentClicked(e, node)}
        >
          {node.label}
        </div>
      </div>
      {isExpanded && (
        <div className='ArcTree-Node-childRow'>
          <div
            className='ArcTree-Node-childColumn'
            onClick={(e) => {
              onExpandToggleClicked(e, node);
              setCollapseColIsHovered(false);
            }}
            onMouseEnter={() => {
              setCollapseColIsHovered(true);
            }}
            onMouseLeave={() => {
              setCollapseColIsHovered(false);
            }}
          >
            <div className='ArcTree-Node-childColumn-background' />
          </div>
          {!isLeaf && (
            <div className='ArcTree-Node-children'>
              {children.map(
                (childNode: IProcessedTreeNode<NodeType, NodeIdType>) => (
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
                )
              )}
            </div>
          )}
          {isLeaf && emptyContentMessage && (
            <div className='ArcTree-Node-children ArcTree-Node-leaf'>
              {emptyContentMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface INodeIconProps {
  isLeaf: boolean;
  isExpanded: boolean;
}

function NodeIcon({ isLeaf, isExpanded }: INodeIconProps) {
  return (
    <div
      className={cn(
        'ArcTree-Node-iconContainer',
        isExpanded && 'ArcTree-Node-iconContainer-expanded'
      )}
    >
      <div
        className={cn(
          isLeaf ? 'ArcTree-Node-leafIcon' : 'ArcTree-Node-expansionIcon'
        )}
      />
    </div>
  );
}
