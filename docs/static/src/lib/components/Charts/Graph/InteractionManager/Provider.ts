// dependencies
import { Context, createContext, useContext } from 'react';
// types
import type { GraphNodeId, ICoords } from '@adam-sv/arc';
export interface IGraphControlPlane<NodeIdType extends GraphNodeId> {
  // for controlling nodes
  registerNodeControls: (id: NodeIdType, state: IGraphNodeState) => unknown;
  unregisterNodeControls: (id: NodeIdType) => unknown;
  nodeControlMap: Map<NodeIdType, IGraphNodeState>;
  // for NodeBase to use
  getNodeState: (id: NodeIdType) => { isSelected: boolean };
}

export interface IGraphNodeState {
  offset: ICoords; // offset from the set position (i.e. while being dragged)
  setOffset: React.Dispatch<React.SetStateAction<ICoords>>;
}

export const GraphControlContext =
  createContext<IGraphControlPlane<GraphNodeId> | null>(null);
export const GraphControlProvider = GraphControlContext.Provider;
export const useGraphControlPlane = <NodeIdType extends GraphNodeId>() => {
  const x = useContext(
    GraphControlContext as unknown as Context<IGraphControlPlane<NodeIdType>>
  );
  if (!x) throw new Error('Incorrectly instantiated GraphControlProvider...');
  return x;
};
