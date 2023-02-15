import type {
  IARCProps,
  ArcComponentSize,
  RenderableContent,
} from '@adam-sv/arc';

export type TreeNodeId = number | string;
export interface ITreeNode<T> {
  id: TreeNodeId;
  label: string;
  className?: string;
  parentId: TreeNodeId | null;
  disabled?: boolean;
  data?: T;
}

export interface IProcessedTreeNode<T> extends ITreeNode<T> {
  childrenIds: TreeNodeId[];
}

export interface ITreeProps<T> extends IARCProps {
  nodes: ITreeNode<T>[];
  selectedNodeId?: TreeNodeId;
  nodeListeners?: {
    didCollapse?: (node: IProcessedTreeNode<T>) => void;
    didExpand?: (node: IProcessedTreeNode<T>) => void;
    onClick?: (node: IProcessedTreeNode<T>) => void;
  };
  initiallyExpandedDepth?: number;
  emptyContentMessage?: string | RenderableContent;
  componentSize?: ArcComponentSize;
  allowNonLeafSelection?: boolean; // true if you can select a node which has children (i.e. a "folder" if the Tree is a filesystem)
  dontExpandParentChain?: boolean; // pass true if you dont want us to force-show the selectedNodeId you passed
}

export interface ITreeGraph<T> {
  nodes: IProcessedTreeNode<T>[];
  rootNodes: IProcessedTreeNode<T>[];
  getNode: (id: TreeNodeId) => ITreeNode<T> | undefined;
  getChildren: (id: TreeNodeId) => IProcessedTreeNode<T>[];
}
