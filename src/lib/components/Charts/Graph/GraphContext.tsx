import { createContext, PropsWithChildren, useContext } from 'react';
import { GraphNodeId, LogicalArcGraph } from '@adam-sv/arc'; // prefer this method, but currently webpack breaks
import { defaultLayoutOptions } from './logic';
import type { IGraphRenderContext } from '.';

const graph = new LogicalArcGraph([], []);

const defaultGraphContext: IGraphRenderContext = {
  graph: graph,
  getNodeConnectionLayout: () => undefined,
  getNodeContentLayout: () => undefined,
  getPosition: () => undefined,
  getSize: () => ({ width: 0, height: 0 }),
  layoutOptions: defaultLayoutOptions,
  scaledPadding: { topLevel: { x: 0, y: 0 }, child: { x: 0, y: 0 } },
  zoom: 0,
};

const GraphContext = createContext<IGraphRenderContext>(defaultGraphContext);

export const GraphContextProvider = <
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>({
  graphContext,
  children,
}: PropsWithChildren<{
  graphContext: IGraphRenderContext<NodeType, EdgeType, NodeIdType>;
}>) => {
  return (
    // eslint-disable-next-line
    // @ts-ignore - The default value doesn't agree on startup, but we don't worry about that
    <GraphContext.Provider value={graphContext}>
      {children}
    </GraphContext.Provider>
  );
};

export const useGraphContext = <
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>() => {
  return useContext(
    GraphContext as unknown as React.Context<
      IGraphRenderContext<NodeType, EdgeType, NodeIdType>
    >
  );
};
