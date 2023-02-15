// dependencies
import React, { useState } from 'react';
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
  IProcessedTreeNode,
  ITreeNode,
  ITreeProps,
  TreeNodeId,
} from '@adam-sv/arc';
import type { ITreeBrowserProps } from './types';
export type { ITreeBrowserProps };

export const TreeBrowser = <T,>(props: ITreeBrowserProps<T>) => {
  const [isOpen, setIsOpen] = useModal();
  const [currentlySelected, _setCurrentlySelected] =
    useState<IProcessedTreeNode<T> | null>(null);
  function setCurrentlySelected(node: IProcessedTreeNode<T> | null) {
    if (node && node.disabled) {
      return;
    }
    _setCurrentlySelected(node);
  }

  // note: this is not intended to be controlled by `currentlySelected` above
  // instead, the point is that we let users have `currentlySelected` to represent their ephemeral choice,
  // but once they confirm via Button click, the props.selectedNodeId needs to be passed to keep the choice
  const selectedNode = findSelectedNode(props.trees, props.selectedNodeId);
  const value = selectedNode ? selectedNode.label : props.possiblyUnloadedValue;

  const actualTreeBrowser = (
    <div
      className={cn(
        !props.overrideDefaultClassName && 'ArcTreeBrowser',
        props.className,
        props.componentSize && getSizeClassName(props.componentSize)
      )}
      id={props.id}
      style={props.style}
    >
      {props.titleText && <Title titleType={4}>{props.titleText}</Title>}
      {props.displayCurrentValue && (
        <InputSkeleton
          label='Currently Selected'
          info={props.info}
          error={props.error}
          disabled
        >
          <label className='ArcTreeBrowser-ArcInput-value'>{value}</label>
          {!value && props.placeholder && (
            <label className='ArcTreeBrowser-ArcInput-placeholder'>
              {props.placeholder}
            </label>
          )}
        </InputSkeleton>
      )}
      {props.trees.map((tree: ITreeProps<T>, i: number) => (
        <Tree
          key={i}
          nodes={tree.nodes}
          nodeListeners={Object.assign(
            {
              onClick: (node: IProcessedTreeNode<T>) => {
                if (
                  props.allowNonLeafSelection ||
                  node.childrenIds.length < 1
                ) {
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
            currentlySelected ? currentlySelected.id : props.selectedNodeId
          }
          initiallyExpandedDepth={
            typeof tree.initiallyExpandedDepth === 'number'
              ? tree.initiallyExpandedDepth
              : props.initiallyExpandedDepth
          }
          allowNonLeafSelection={props.allowNonLeafSelection}
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
            if (props.onChange) props.onChange(currentlySelected);
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

  if (!props.useAsModal) {
    return actualTreeBrowser;
  }

  const modalProps = { actualTreeBrowser, isOpen, selectedNode, setIsOpen };
  return <ModalView {...props} {...modalProps} />;
};

interface IModalViewProps<T> extends ITreeBrowserProps<T> {
  actualTreeBrowser: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedNode?: ITreeNode<T>;
}

const ModalView = <T,>(props: IModalViewProps<T>): JSX.Element => {
  const value = props.selectedNode
    ? props.selectedNode.label
    : props.possiblyUnloadedValue;

  const { placeholder } = props;

  return (
    <InputSkeleton
      buttonProps={{
        type: props.buttonType,
        children: props.buttonText || 'Change Selection',
        onClick: () => props.setIsOpen(true),
      }}
      className='ArcTreeBrowser ArcTreeBrowser-modalController'
      error={props.error}
      label={props.label}
      id={props.inputId}
      info={props.info}
      onDoubleClick={() => props.setIsOpen(true)}
      style={props.inputStyle}
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
        isOpen={props.isOpen}
        setIsOpen={props.setIsOpen}
        animationDuration={300}
        portalTargetElement={props.portalTargetElement}
      >
        {props.actualTreeBrowser}
      </Modal>
    </InputSkeleton>
  );
};

const findSelectedNode = <T,>(
  trees: ITreeProps<T>[],
  selectedNodeId?: TreeNodeId
): ITreeNode<T> | undefined => {
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
