import React from 'react';
import type {
  IARCProps,
  ArcComponentSize,
  ButtonType,
  IProcessedTreeNode,
  ITreeProps,
  TreeNodeId,
} from '@adam-sv/arc';

export interface ITreeBrowserProps<T> extends IARCProps {
  // you must always pass trees
  trees: ITreeProps<T>[];
  initiallyExpandedDepth?: number; // 0 means top-level nodes are all collapsed, 1 means top-level nodes are open and their children are collapsed, ...
  displayCurrentValue?: boolean; // true to display the current value in the modal view, false to hide it
  selectedNodeId?: TreeNodeId | undefined;
  onChange?: (node: IProcessedTreeNode<T> | null) => void;
  allowNonLeafSelection?: boolean; // true if you can select a node which has children (i.e. a "folder" if the Tree is a filesystem)
  useAsModal?: boolean; // if useAsModal is true, we render an InputSkeleton that opens a modal with the TreeBrowser
  titleText?: string;
  label?: string; // only for when you render it as an InputSkeleton, i.e. in a Form
  info?: JSX.Element | string;
  error?: string;
  value?: string | number;
  // let's say you were loading a document tree asynchronously but wanted to show something still
  // we will directly render this for you :)
  possiblyUnloadedValue?: string | number;
  placeholder?: string | number;
  buttonText?: string;
  buttonType?: ButtonType;
  // CSS Sizing API is implemented
  componentSize?: ArcComponentSize;
  // modal targets
  portalTargetElement?: Element | null;
  // for this component, we only pass ID and style to the actual TreeBrowser, not the input component
  // to target the input component (i.e. useAsModal), pass inputId and inputStyle
  inputId?: string;
  inputStyle?: React.CSSProperties;
}
