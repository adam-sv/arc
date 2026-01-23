import { IGraphEdgeContext } from '.';
import { getParameterizedWebcolaDefinition } from '../../../graphs';
import type { GraphNodeId } from '@adam-sv/arc';

// DEBUG = "absolute" position, not rendered in hierarchy
// getDebugOrder puts children after parents, so the latest <rect>s are "on top" visually
export function Debug<NodeType, EdgeType, NodeIdType extends GraphNodeId>({
  computeContext,
}: {
  computeContext: IGraphEdgeContext<NodeType, EdgeType, NodeIdType>;
}) {
  return (
    <g className='ArcGraph-DebugNodes DEBUG'>
      {getDebugOrderWebcolaStyle(computeContext).map((wcRect, i) => (
        <rect
          key={`${i}-${wcRect.x}-${wcRect.X}-${wcRect.y}-${wcRect.Y}`}
          className='DEBUG_NODE'
          x={wcRect.x}
          y={wcRect.y}
          width={wcRect.X - wcRect.x}
          height={wcRect.Y - wcRect.y}
        />
      ))}
    </g>
  );
}

function getDebugOrderWebcolaStyle<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(context: IGraphEdgeContext<NodeType, EdgeType, NodeIdType>) {
  const { graph, getPosition, getContentPosition } = context;
  const { nodes } = getParameterizedWebcolaDefinition(
    graph,
    getPosition,
    getContentPosition
  );

  return nodes.map((node) => node.rectangle);
}
