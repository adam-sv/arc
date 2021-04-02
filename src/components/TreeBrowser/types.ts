import type { IARCProps, ArcComponentSize, ButtonType, IProcessedTreeNode, ITreeProps, TreeNodeId } from '@adam-sv/arc';

export interface ITreeBrowserProps extends IARCProps {
  // you must always pass trees
  trees: ITreeProps[];
  initiallyExpandedDepth?: number;
  // display the current value in the modal view?
  displayCurrentValue?: boolean;
  selectedNodeId?: TreeNodeId | undefined;
  onChange: (node: IProcessedTreeNode | null) => void;
  // if you useAsModal, you can pass InputSkeleton props
  useAsModal?: boolean;
  titleText?: string;
  label?: string;
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
}
