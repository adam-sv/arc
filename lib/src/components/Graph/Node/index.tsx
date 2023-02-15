// dependencies
import React, { RefObject } from 'react';
// internals
import { cn, IGraphNode, StringUtils } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { IARCProps, IBoxSize, ICoords } from '@adam-sv/arc';
import type {
  GraphNodeContentRenderer,
  IGraphConnectionActions,
  IGraphNodeActions,
  INodeChildren,
} from '../types';
import type { IProcessedGraphNode, LogicalArcGraph } from '@adam-sv/arc';

export interface INodeProps<NodeType = any, EdgeType = any> extends IARCProps {
  id?: string;
  node: IProcessedGraphNode<NodeType>;
  graph: LogicalArcGraph<NodeType, EdgeType>;
  // actions
  nodeActions?: IGraphNodeActions;
  connectionActions?: IGraphConnectionActions;
  selectionAction?: (e: React.MouseEvent, node: IGraphNode) => void;
  // display
  position: ICoords;
  size: IBoxSize;
  portSize: number;
  domRef?: RefObject<SVGGElement>;
  name?: string;
  // faceplates
  customSVGNodeContent?: GraphNodeContentRenderer<NodeType, EdgeType>;
  customHTMLNodeContent?: GraphNodeContentRenderer<NodeType, EdgeType>;
}

export function Node(props: INodeProps): JSX.Element {
  const { graph, node, name, portSize, position, size } = props;
  const { x, y } = position;

  // IF USER IS NOT PROVIDING `custom(SVG|HTML)NodeContent`, we render the label
  // we assume 5.5px wide characters and 10px padding is the desired aesthetic
  // css style changes endanger this assumption
  const trueSize = size;
  const { inputs, outputs } = getNodeChildren(node);
  const acceptableNameLength = Math.max(Math.round((size.width - 20) / 5.5), 4);

  // safe accesses
  const nodeActions = props.nodeActions || {};

  return (
    <g
      className={cn(
        !props.overrideDefaultClassName && 'ArcNode',
        props.className,
        props.node.className
      )}
      id={props.node ? `${props.node.id}` : props?.id}
      transform={`translate(${x}, ${y})`}
      onMouseDown={(e) => {
        if (nodeActions.onMouseDown) {
          nodeActions.onMouseDown(e, node);
        }
      }}
      onClick={(e) => {
        if (nodeActions.onClick) {
          nodeActions.onClick(e, node);
        }
        if (props.selectionAction) {
          props.selectionAction(e, node);
        }
      }}
      onDoubleClick={(e) => {
        nodeActions.onDoubleClick
          ? nodeActions.onDoubleClick(e, node)
          : undefined;
        if (props.selectionAction) {
          props.selectionAction(e, node);
        }
      }}
      onContextMenu={(e) =>
        nodeActions.onContextMenu
          ? nodeActions.onContextMenu(e, node)
          : undefined
      }
      ref={props.domRef}
    >
      <rect
        className='bounding-box'
        width={`${trueSize.width}px`}
        height={`${trueSize.height}px`}
      />
      {(() => {
        if (props.customHTMLNodeContent) {
          return (
            <foreignObject
              width={trueSize.width}
              height={trueSize.height}
              style={{ overflow: 'auto' }}
            >
              {props.customHTMLNodeContent(node, trueSize, graph)}
            </foreignObject>
          );
        } else if (props.customSVGNodeContent) {
          return <>{props.customSVGNodeContent(node, trueSize, graph)}</>;
        } else {
          return (
            <text x={`${trueSize.width / 2}px`} y={`${trueSize.height - 9}px`}>
              <title>{name}</title>
              {StringUtils.shorten(node.label, acceptableNameLength)}
            </text>
          );
        }
      })()}
      <g className='ports-group'>
        {inputPorts(inputs, portSize, trueSize)}
        {outputPorts(outputs, portSize, trueSize)}
      </g>
    </g>
  );
}

function inputPorts(
  nodes: IProcessedGraphNode[],
  portSize: number,
  trueSize: IBoxSize
) {
  return (
    <Ports
      className='Ports-inputPorts'
      nodes={nodes}
      portSize={portSize}
      textOffset={5 + portSize}
      xPos={portSize * 0.5}
      ySize={trueSize.height - 20}
    />
  );
}

function outputPorts(
  nodes: IProcessedGraphNode[],
  portSize: number,
  trueSize: IBoxSize
) {
  return (
    <Ports
      className='Ports-outputPorts'
      nodes={nodes}
      portSize={portSize}
      textOffset={-5}
      xPos={trueSize.width - portSize * 1.5}
      ySize={trueSize.height - 20}
    />
  );
}

interface IPortsProps extends IARCProps {
  nodes: IProcessedGraphNode[];
  portSize: number;
  textOffset: number;
  xPos: number;
  ySize: number;
}

function Ports({
  className,
  nodes,
  portSize,
  textOffset,
  xPos,
  ySize,
}: IPortsProps) {
  const height = (nodes.length - 1) * portSize * 1.5 + portSize;
  return (
    <g
      className={cn('Ports', className)}
      transform={`translate(${xPos}, ${(ySize - height) / 2})`}
    >
      {nodes.map((node: IProcessedGraphNode, i: number) => (
        <Port
          key={i}
          node={node}
          size={portSize}
          textOffset={textOffset}
          xPos={0}
          yPos={i * portSize * 1.5}
        />
      ))}
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

function Port({ node, size, textOffset, xPos, yPos }: IPortProps) {
  return (
    <g className='Port'>
      <rect
        className='Port-rect'
        id={`${node.id}`}
        width={size}
        height={size}
        x={xPos}
        y={yPos}
      />
      <text
        className='Port-text'
        x={`${xPos + textOffset}px`}
        y={`${yPos + size / 2}px`}
      >
        {node.label}
      </text>
    </g>
  );
}

export function getNodeChildren(node: IProcessedGraphNode): INodeChildren {
  const children: INodeChildren = {
    inputs: [],
    outputs: [],
    other: [],
  };

  node.children?.forEach((childNode) => {
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
