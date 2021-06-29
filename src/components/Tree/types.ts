import type { IARCProps, ArcComponentSize, RenderableContent } from '@adam-sv/arc';

export type TreeNodeId = number | string;
export interface ITreeNode {
  id: TreeNodeId;
  label: string;
  className?: string;
  parentId: TreeNodeId | null;
  disabled?: boolean;
}

export interface IProcessedTreeNode extends ITreeNode {
  childrenIds: TreeNodeId[];
}

export interface ITreeProps extends IARCProps {
  nodes: ITreeNode[],
  selectedNodeId?: TreeNodeId;
  nodeListeners?: {
    didCollapse?: (node: IProcessedTreeNode) => void;
    didExpand?: (node: IProcessedTreeNode) => void;
    onClick?: (node: IProcessedTreeNode) => void;
  };
  initiallyExpandedDepth?: number;
  emptyContentMessage?: string | RenderableContent;
  componentSize?: ArcComponentSize;
  allowNonLeafSelection?: boolean; // true if you can select a node which has children (i.e. a "folder" if the Tree is a filesystem)
}

export interface ITreeGraph {
  nodes: IProcessedTreeNode[];
  rootNodes: IProcessedTreeNode[];
  getNode: (id: TreeNodeId) => ITreeNode | undefined;
  getChildren: (id: TreeNodeId) => IProcessedTreeNode[];
}
