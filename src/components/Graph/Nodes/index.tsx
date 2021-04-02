// dependencies
import React from 'react';

// internals
import { composeFunctions } from '@adam-sv/arc';
import { Node } from './Node';
import { LogicalArcGraph } from '@adam-sv/arc';

// types
import type { ICoords } from '@adam-sv/arc';
import type { IGraphStores, IGraphConnectionActions, IGraphNodeActions } from '../types';

export interface INodesProps {
  connectionActions: IGraphConnectionActions;
  nodeActions: IGraphNodeActions;
  graph: LogicalArcGraph;
  shift: ICoords;
  stores: IGraphStores;
  clearSelection?: () => void;
}

export function Nodes(props: INodesProps) {
  const { _getInputs, _getOutputs, _getPosition, _getSize, nodes, portSize } = props.stores.nodes;
  const { connectionActions, graph, nodeActions, shift } = props;
  const clearSelection = props.clearSelection ? props.clearSelection : () => null;

  return (
    <g
      className="ArcGraph-Nodes"
      transform={`translate(${shift.x}, ${shift.y})`}
    >
      {nodes.map((node: any) =>
        <Node
          key={node.id}
          // logic
          node={node}
          className={node.className}
          graph={graph}
          position={_getPosition(node)}
          shift={shift}
          size={_getSize(node)}
          portSize={portSize}
          inputs={_getInputs(node)}
          outputs={_getOutputs(node)}
          // actions
          nodeActions={{
            onClick: nodeActions.onClick && composeFunctions(clearSelection, nodeActions.onClick),
            onDoubleClick: nodeActions.onDoubleClick && composeFunctions(clearSelection, nodeActions.onDoubleClick),
            onMove: nodeActions.onMove && composeFunctions(clearSelection, nodeActions.onMove),
            onContextMenu: nodeActions.onContextMenu && composeFunctions(clearSelection, nodeActions.onContextMenu),
          }}
          connectionActions={connectionActions}
        />
      )}
    </g>
  );
}
