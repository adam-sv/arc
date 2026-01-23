import type {
  IARCProps,
  ArcComponentSize,
  RenderableContent,
} from '@adam-sv/arc';
import { GraphNodeId } from '@adam-sv/arc';
import { IGraphNode } from '@adam-sv/arc';

export interface ITreeNode<NodeType, NodeIdType extends GraphNodeId>
  extends IGraphNode<NodeType, NodeIdType> {
  data?: NodeType;
  disabled?: boolean;
}

export interface IProcessedTreeNode<NodeType, NodeIdType extends GraphNodeId>
  extends ITreeNode<NodeType, NodeIdType> {
  childrenIds: NodeIdType[];
}

export interface ITreeProps<NodeType, NodeIdType extends GraphNodeId>
  extends IARCProps {
  nodes: ITreeNode<NodeType, NodeIdType>[];
  selectedNodeId?: NodeIdType;
  nodeListeners?: {
    didCollapse?: (node: IProcessedTreeNode<NodeType, NodeIdType>) => void;
    didExpand?: (node: IProcessedTreeNode<NodeType, NodeIdType>) => void;
    onClick?: (node: IProcessedTreeNode<NodeType, NodeIdType>) => void;
  };
  initiallyExpandedDepth?: number;
  emptyContentMessage?: string | RenderableContent;
  componentSize?: ArcComponentSize;
  allowNonLeafSelection?: boolean; // true if you can select a node which has children (i.e. a "folder" if the Tree is a filesystem)
  dontExpandParentChain?: boolean; // pass true if you dont want us to force-show the selectedNodeId you passed
  domRef?: React.RefObject<HTMLDivElement | null>;
}

export interface ITreeGraph<NodeType, NodeIdType extends GraphNodeId> {
  nodes: IProcessedTreeNode<NodeType, NodeIdType>[];
  rootNodes: IProcessedTreeNode<NodeType, NodeIdType>[];
  getNode: (id: NodeIdType) => ITreeNode<NodeType, NodeIdType> | undefined;
  getChildren: (id: NodeIdType) => IProcessedTreeNode<NodeType, NodeIdType>[];
}
