// dependencies
import { useState, type JSX } from 'react';
// internals
import {
  Button,
  cn,
  getSizeClassName,
  InputSkeleton,
  Modal,
  Title,
  Tree,
  useModal,
} from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type {
  GraphNodeId,
  IProcessedTreeNode,
  ITreeNode,
  ITreeProps,
} from '@adam-sv/arc';

import { ITreeBrowserProps } from '@adam-sv/arc';

export const TreeBrowser = <NodeType, NodeIdType extends GraphNodeId>(
  props: ITreeBrowserProps<NodeType, NodeIdType>
) => {
  const {
    skeletonRef,
    domRef,
    treeRef,
    trees,
    selectedNodeId,
    possiblyUnloadedValue,
    className,
    overrideDefaultClassName,
    componentSize,
    id,
    style,
    titleText,
    displayCurrentValue,
    info,
    error,
    placeholder,
    allowNonLeafSelection,
    initiallyExpandedDepth,
    onChange,
    useAsModal,
  } = props;

  const [isOpen, setIsOpen] = useModal();
  const [currentlySelected, _setCurrentlySelected] =
    useState<IProcessedTreeNode<NodeType, NodeIdType> | null>(null);
  function setCurrentlySelected(
    node: IProcessedTreeNode<NodeType, NodeIdType> | null
  ) {
    if (node && node.disabled) {
      return;
    }
    _setCurrentlySelected(node);
  }

  // note: this is not intended to be controlled by `currentlySelected` above
  // instead, the point is that we let users have `currentlySelected` to represent their ephemeral choice,
  // but once they confirm via Button click, the selectedNodeId needs to be passed to keep the choice
  const selectedNode = findSelectedNode(trees, selectedNodeId);
  const value = selectedNode ? selectedNode.label : possiblyUnloadedValue;

  const actualTreeBrowser = (
    <div
      className={cn(
        !overrideDefaultClassName && 'ArcTreeBrowser',
        className,
        componentSize && getSizeClassName(componentSize)
      )}
      id={id}
      style={style}
      ref={domRef}
    >
      {titleText && <Title titleType={4}>{titleText}</Title>}
      {displayCurrentValue && (
        <InputSkeleton
          label='Currently Selected'
          info={info}
          error={error}
          disabled
          skeletonRef={skeletonRef}
        >
          <label className='ArcTreeBrowser-ArcInput-value'>{value}</label>
          {!value && placeholder && (
            <label className='ArcTreeBrowser-ArcInput-placeholder'>
              {placeholder}
            </label>
          )}
        </InputSkeleton>
      )}
      {trees.map((tree: ITreeProps<NodeType, NodeIdType>, i: number) => (
        <Tree
          key={i}
          nodes={tree.nodes}
          domRef={treeRef}
          nodeListeners={Object.assign(
            {
              onClick: (node: IProcessedTreeNode<NodeType, NodeIdType>) => {
                if (allowNonLeafSelection || node.childrenIds.length < 1) {
                  setCurrentlySelected(node);
                }
                if (tree.nodeListeners?.onClick) {
                  tree.nodeListeners.onClick(node);
                }
              },
            },
            tree.nodeListeners || {}
          )}
          selectedNodeId={
            currentlySelected ? currentlySelected.id : selectedNodeId
          }
          initiallyExpandedDepth={
            typeof tree.initiallyExpandedDepth === 'number'
              ? tree.initiallyExpandedDepth
              : initiallyExpandedDepth
          }
          allowNonLeafSelection={allowNonLeafSelection}
        />
      ))}
      <div className='ArcTreeBrowser-controls'>
        <Button
          type='danger'
          onClick={() => {
            setCurrentlySelected(null);
            setIsOpen(false);
          }}
          disabled={currentlySelected === null}
        >
          Cancel
        </Button>
        <Button
          type='success'
          onClick={() => {
            if (onChange) onChange(currentlySelected);
            setCurrentlySelected(null);
            setIsOpen(false);
          }}
          disabled={currentlySelected === null}
        >
          Confirm Change
        </Button>
      </div>
    </div>
  );

  if (!useAsModal) {
    return actualTreeBrowser;
  }

  const modalProps = { actualTreeBrowser, isOpen, selectedNode, setIsOpen };
  return <ModalView {...props} {...modalProps} />;
};

interface IModalViewProps<NodeType, NodeIdType extends GraphNodeId>
  extends ITreeBrowserProps<NodeType, NodeIdType> {
  actualTreeBrowser: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedNode?: ITreeNode<NodeType, NodeIdType>;
}

const ModalView = <NodeType, NodeIdType extends GraphNodeId>(
  props: IModalViewProps<NodeType, NodeIdType>
): JSX.Element => {
  const {
    selectedNode,
    possiblyUnloadedValue,
    buttonType,
    buttonText,
    setIsOpen,
    isOpen,
    portalTargetElement,
    actualTreeBrowser,
    error,
    label,
    inputId,
    info,
    inputStyle,
    skeletonRef,
    placeholder,
  } = props;
  const value = selectedNode ? selectedNode.label : possiblyUnloadedValue;

  return (
    <InputSkeleton
      buttonProps={{
        type: buttonType,
        children: buttonText || 'Change Selection',
        onClick: () => {
          setIsOpen(true);
        },
      }}
      className='ArcTreeBrowser ArcTreeBrowser-modalController'
      error={error}
      label={label}
      id={inputId}
      info={info}
      onDoubleClick={() => {
        setIsOpen(true);
      }}
      style={inputStyle}
      skeletonRef={skeletonRef}
    >
      {value && (
        <label className='ArcTreeBrowser-ArcInput-value'>{value}</label>
      )}
      {!value && placeholder && (
        <label className='ArcTreeBrowser-ArcInput-placeholder'>
          {placeholder}
        </label>
      )}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        portalTargetElement={portalTargetElement}
      >
        {actualTreeBrowser}
      </Modal>
    </InputSkeleton>
  );
};

const findSelectedNode = <NodeType, NodeIdType extends GraphNodeId>(
  trees: ITreeProps<NodeType, NodeIdType>[],
  selectedNodeId?: NodeIdType
): ITreeNode<NodeType, NodeIdType> | undefined => {
  if (selectedNodeId === undefined) {
    return undefined;
  }

  if (selectedNodeId) {
    for (const tree of trees) {
      const { nodes } = tree;
      for (const node of nodes) {
        if (node.id === selectedNodeId) {
          return node;
        }
      }
    }
  }

  return undefined;
};
