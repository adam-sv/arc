// dependencies
import React, { useState } from 'react';
// internals
import { Button, cn, composeFunctions, getSizeClassName, InputSkeleton, Modal, Title, Tree, useModal } from '@adam-sv/arc';
// styles
import './style.css';
// types
import type { IProcessedTreeNode, ITreeNode, ITreeProps, TreeNodeId } from '@adam-sv/arc';
import type { ITreeBrowserProps } from './types';
export type { ITreeBrowserProps };

export function TreeBrowser(props: ITreeBrowserProps) {
  const [isOpen, setIsOpen] = useModal();
  const [currentlySelected, _setCurrentlySelected] = useState<IProcessedTreeNode | null>(null);
  function setCurrentlySelected(node: IProcessedTreeNode | null) {
    if (node && node.disabled) { return; }
    _setCurrentlySelected(node);
  }

  const selectedNode = findSelectedNode(props.trees, props.selectedNodeId);

  // does this actually do anything
  const actualTreeBrowser = (
    <div
      className={cn(
        !props.overrideDefaultClassName && "ArcTreeBrowser",
        props.className,
        props.componentSize && getSizeClassName(props.componentSize),
      )}
    >
      <Title titleType={4} text={props.titleText} />
      {props.displayCurrentValue &&
        <InputSkeleton
          label="Currently Selected"
          value={selectedNode
            ? selectedNode.label
            : props.possiblyUnloadedValue
          }
          placeholder={props.placeholder}
          info={props.info}
          error={props.error}
          disallowFocus
        />
      }
      {props.trees.map((tree:ITreeProps, i: number) =>
        <Tree
          key={i}
          nodes={tree.nodes}
          nodeListeners={Object.assign({
            onClick: composeFunctions(
              (node: IProcessedTreeNode) =>
                node.childrenIds.length < 1 && setCurrentlySelected(node),
              (node: IProcessedTreeNode) =>
                tree.nodeListeners?.onClick && tree.nodeListeners.onClick(node),
            ),
          }, tree.nodeListeners || {})}
          selectedNodeId={currentlySelected ? currentlySelected.id : props.selectedNodeId}
          initiallyExpandedDepth={typeof tree.initiallyExpandedDepth === 'number'
            ? tree.initiallyExpandedDepth
            : props.initiallyExpandedDepth
          }
        />
      )}
      <div className="ArcTreeBrowser-controls">
        <Button
          type="success"
          text="Confirm Change"
          onClick={e => {
            props.onChange(currentlySelected);
            setCurrentlySelected(null);
            setIsOpen(false);
          }}
          disabled={currentlySelected === null}
        />
        <Button
          type="danger"
          text="Cancel"
          onClick={e => {
            setCurrentlySelected(null);
            setIsOpen(false);
          }}
          disabled={currentlySelected === null}
        />
      </div>
    </div>
  );

  if (!props.useAsModal) {
    return actualTreeBrowser;
  }

  const modalProps = { actualTreeBrowser, isOpen, selectedNode, setIsOpen };
  return <ModalView {...props} {...modalProps} />
}

interface IModalViewProps extends ITreeBrowserProps {
  actualTreeBrowser: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedNode: ITreeNode;
}

function ModalView(props: IModalViewProps): JSX.Element {
  return (
    <div className="ArcTreeBrowser-modalController">
      <InputSkeleton
        label={props.label}
        value={props.selectedNode ? props.selectedNode.label : props.possiblyUnloadedValue}
        placeholder={props.placeholder}
        buttonProps={{
          type: props.buttonType,
          text: props.buttonText || 'Change Selection',
          onClick: e => props.setIsOpen(true),
        }}
        info={props.info}
        error={props.error}
        onDoubleClick={e => props.setIsOpen(true)}
      />
      <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen} animationDuration={300}>
        {props.actualTreeBrowser}
      </Modal>
    </div>
  );
}

function findSelectedNode(
  trees: ITreeProps[],
  selectedNodeId?: TreeNodeId,
): ITreeNode | undefined {
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
}
