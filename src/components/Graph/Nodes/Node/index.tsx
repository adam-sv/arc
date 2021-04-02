// dependencies
import React, { RefObject, useRef } from 'react';
import { Transition } from 'react-transition-group';
// internals
import { cn, shortenString } from '@adam-sv/arc';
// styles
import './style.css';
// types
import type { IARCProps, IBoxSize, ICoords } from '@adam-sv/arc';
import type { IGraphConnectionActions, IGraphNodeActions } from '../../types';
import type { GraphNodeDecorationRenderProp, IGraphNode, IProcessedGraphNode, LogicalArcGraph } from '@adam-sv/arc';
export interface INodeProps extends IARCProps {
  id?: string;
  node: IProcessedGraphNode;
  graph: LogicalArcGraph;
  // actions
  nodeActions?: IGraphNodeActions;
  connectionActions?: IGraphConnectionActions;
  // display
  position: ICoords;
  shift: ICoords;
  size: IBoxSize;
  portSize?: number;
  inputs?: any[];
  outputs?: any[];
  domRef?: RefObject<SVGGElement>;
  name?: any
}

export function Node(props: INodeProps) {
  const { graph, node, portSize, size, name } = props;
  const { x, y } = getPosition(props);
  const lastDecorationRef = useRef<GraphNodeDecorationRenderProp | null>(null);
  const setLastDecoration = (newLastDecoration: GraphNodeDecorationRenderProp | null) => {
    lastDecorationRef.current = newLastDecoration;
  };

  // we assume 5.5px wide characters and 10px padding is the desired aesthetic
  // css style changes endanger this assumption
  const trueSize = graph.computeBoundingRect([node]);
  const { inputs, outputs, other } = getChildren(node);
  const acceptableNameLength = Math.max(Math.round((size.width - 20) / 5.5), 4);
  const nodeActions = props.nodeActions || {};

  return (
    <g
      className={cn(
        !props.overrideDefaultClassName && 'ArcNode',
        props.className,
        props.node.className,
      )}
      id={props.node
        ? `${props.node.id}`
        : props?.id
      }
      transform={`translate(${x}, ${y})`}
      onClick={nodeActions.onClick ? (e) => nodeActions.onClick(e, node) : null}
      onDoubleClick={nodeActions.onDoubleClick ? (e) => nodeActions.onDoubleClick(e, node) : null}
      onContextMenu={nodeActions.onContextMenu ? (e) => nodeActions.onContextMenu(e, node) : null}
      ref={props.domRef}
    >
      <rect
        className="bounding-box"
        width={`${trueSize.width}px`}
        height={`${trueSize.height}px`}
      />
      {privilegedDecoration(
        node,
        trueSize,
        lastDecorationRef.current,
        setLastDecoration,
      )}
      {icon(node)}
      <text
        x={`${trueSize.width / 2}px`}
        y={`${trueSize.height - 9}px`}
      >
        <title>{name}</title>
        {shortenString(node.label, acceptableNameLength)}
      </text>
      <g className="ports-group">
        {inputPorts(inputs, portSize, trueSize)}
        {outputPorts(outputs, portSize, trueSize)}
      </g>
    </g>
  );
}

function privilegedDecoration(
  node: IProcessedGraphNode,
  size: IBoxSize,
  lastDecoration: any,
  setLastDecoration: (d: any) => void,
) {
  const decoration = node?.hooks?.decoration;
  setLastDecoration(decoration || null);

  if (typeof decoration !== 'function' && typeof lastDecoration !== 'function') {
    return null;
  }
  const useCurrentDec = typeof decoration === 'function';

  return (
    <Transition in={useCurrentDec} appear timeout={700}>
      {state => useCurrentDec
        ? decoration(size, state)
        : lastDecoration(size, state)
      }
    </Transition>
  );
}

function icon(node: IGraphNode) {
  return node.Icon;
}

function inputPorts(nodes: IProcessedGraphNode[], portSize: number, trueSize: DOMRect) {
  return <Ports
    className="Ports-inputPorts"
    nodes={nodes}
    portSize={portSize}
    textOffset={5 + portSize}
    xPos={portSize * 0.5}
    ySize={trueSize.height - 20}
  />;
}

function outputPorts(nodes: IProcessedGraphNode[], portSize: number, trueSize: DOMRect) {
  return <Ports
    className="Ports-outputPorts"
    nodes={nodes}
    portSize={portSize}
    textOffset={-5}
    xPos={trueSize.width -  portSize * 1.5}
    ySize={trueSize.height - 20}
  />;
}

interface IPortsProps extends IARCProps {
  nodes: IProcessedGraphNode[];
  portSize: number;
  textOffset: number;
  xPos: number;
  ySize: number;
}

function Ports({ className, nodes, portSize, textOffset, xPos, ySize }:IPortsProps) {
  const height = (nodes.length - 1) * portSize * 1.5 + portSize;
  return (
    <g
      className={cn("Ports", className)}
      transform={`translate(${xPos}, ${(ySize - height) / 2})`}
    >
      {nodes.map((node: IProcessedGraphNode, i: number) =>
        <Port
          key={i}
          node={node}
          size={portSize}
          textOffset={textOffset}
          xPos={0}
          yPos={i * portSize * 1.5}
        />
      )}
    </g>
  );
}

interface IPortProps {
  node: IProcessedGraphNode;
  size: number;
  textOffset: number;
  xPos: number;
  yPos: number;
}

function Port({ node, size, textOffset, xPos, yPos }:IPortProps) {
  return (
    <g className="Port">
      <rect
        className="Port-rect"
        id={`${node.id}`}
        width={size}
        height={size}
        x={xPos}
        y={yPos}
      />
      <text
        className="Port-text"
        x={`${xPos + textOffset}px`}
        y={`${yPos + size / 2}px`}
      >
        {node.label}
      </text>
    </g>
  );
}

function getPosition(props: INodeProps) {
  return props.position || { x: 0, y: 0 };
}

interface INodeChildren {
  inputs: IProcessedGraphNode[];
  outputs: IProcessedGraphNode[];
  other: IProcessedGraphNode[];
}
function getChildren(node: IProcessedGraphNode): INodeChildren {
  const children:INodeChildren = {
    inputs: [],
    outputs: [],
    other: [],
  };

  node.children?.forEach(childNode => {
    if (childNode.role === 'input') {
      children.inputs.push(childNode);
    } else if (childNode.role === 'output') {
      children.outputs.push(childNode);
    } else {
      children.other.push(childNode);
    }
  });

  return children;
}
