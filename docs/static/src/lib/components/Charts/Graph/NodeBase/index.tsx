// internals
import { useEffect, useMemo, useState } from 'react';
import { cn, IProcessedGraphNode } from '@adam-sv/arc';
// self
import { useGraphControlPlane } from '../InteractionManager/Provider';
// types
import type {
  IGraphChildNodeRenderer,
  IGraphNodeContentRenderer,
  IGraphRenderContext,
  IGraphNodeContentRendererProps,
} from '../types';
import type { GraphNodeId, ICoords } from '@adam-sv/arc';
import { useGraphContext } from '../GraphContext';

interface IGraphNodeBaseProps<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
> {
  className?: string;
  childNodeRenderer?: IGraphChildNodeRenderer<NodeType, EdgeType, NodeIdType>;
  contentRenderer: IGraphNodeContentRenderer<NodeType, EdgeType, NodeIdType>;
  node: IProcessedGraphNode<NodeType, NodeIdType>;
}

export function NodeBase<NodeType, EdgeType, NodeIdType extends GraphNodeId>({
  className,
  node,
  childNodeRenderer,
  contentRenderer,
}: IGraphNodeBaseProps<NodeType, EdgeType, NodeIdType>) {
  const graphContext = useGraphContext<NodeType, EdgeType, NodeIdType>();
  const { getNodeContentLayout, getPosition, getSize } = graphContext;
  const position = getPosition(node, true);
  const size = getSize(node);
  const contentLayout = getNodeContentLayout(node);

  // We want to allow some nodes to be repositioned without drawing the whole graph, so we expose this state
  const c = useGraphControlPlane();
  // drag state of object
  const [offset, setOffset] = useState<ICoords>({ x: 0, y: 0 });
  const controls = useMemo(() => ({ offset, setOffset }), [offset]);
  useEffect(() => {
    c.registerNodeControls(node.id, controls);
  }, [node.id, controls]);

  if (!position) return null;
  return (
    <g
      className='ArcGraph-GroupOfNodes'
      transform={`translate(${offset.x}, ${offset.y})`} // multiply by zoom here?
    >
      <g
        id={node.id ? `${node.id}` : undefined}
        className={cn(
          'ArcGraph-Node',
          className,
          node.className,
          c.getNodeState(node.id).isSelected && 'selected'
        )}
        transform={`translate(${position.x}, ${position.y})`}
      >
        <rect
          className='ArcGraph-Node-background-bottom'
          x={0}
          y={0}
          {...size}
        />
        <rect className='ArcGraph-Node-background' x={0} y={0} {...size} />
        {contentRenderer({
          node,
          position: contentLayout?.position ?? origin,
          size: contentLayout?.size ?? size,
          showContentBox: Boolean(contentLayout),
          graphContext: graphContext,
        })}
      </g>
      {childNodeRenderer?.({
        node,
        graphContext,
        contentRenderer,
        childNodeRenderer,
      })}
    </g>
  );
}

// This method is for rendering node content via HTML
export function foreignObjectWrap<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>(
  fn: IGraphNodeContentRenderer<NodeType, EdgeType, NodeIdType>
): IGraphNodeContentRenderer<NodeType, EdgeType, NodeIdType> {
  return function RenderContent(
    props: IGraphNodeContentRendererProps<NodeType, EdgeType, NodeIdType>
  ) {
    const { position, size } = props;
    const { height, width } = size;
    const { x, y } = position;
    return (
      <foreignObject
        className='ArcGraph-Node-foreignObject'
        x={x}
        y={y}
        width={width}
        height={height}
      >
        {fn(props)}
      </foreignObject>
    );
  };
}

// This displays some text at the bottom of the content box
export function defaultNodeContentRenderer<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>({
  node,
  position,
  size,
  showContentBox,
  graphContext,
}: IGraphNodeContentRendererProps<NodeType, EdgeType, NodeIdType>) {
  const { x, y } = position;
  const xOffset =
    node.role === 'input' ? graphContext.layoutOptions.connectionTargetSize : 0;
  const { height, width } = size;
  return (
    <g
      className='ArcGraph-Node-DefaultContentRenderer'
      transform={`translate(${x + xOffset}, ${y})`}
    >
      {/* Only display the ContentBorder when the content is not default position */}
      {showContentBox && (
        <rect
          className='ArcGraph-Node-ContentBorder'
          x={0}
          y={0}
          width={width}
          height={height}
        />
      )}
      <text x={width / 2} y={height / 2 + 1}>
        {node.label}
      </text>
    </g>
  );
}

// This renders the children correctly
// While we want others to parameterize the defaultNodeContentRenderer, parameterizing this sounds a bit risky
// For now, we'll pretend it can be parameterized
export function defaultNodeChildrenRenderer<
  NodeType,
  EdgeType,
  NodeIdType extends GraphNodeId
>({
  node,
  graphContext,
  childNodeRenderer,
  contentRenderer,
}: {
  node: IProcessedGraphNode<NodeType, NodeIdType>;
  graphContext: IGraphRenderContext<NodeType, EdgeType, NodeIdType>;
  childNodeRenderer?: IGraphChildNodeRenderer<NodeType, EdgeType, NodeIdType>;
  contentRenderer?: IGraphNodeContentRenderer<NodeType, EdgeType, NodeIdType>;
}) {
  const { graph } = graphContext;

  const childNodes = graph
    .getChildren(node.id)
    .map((node) => (
      <NodeBase<NodeType, EdgeType, NodeIdType>
        key={node.id}
        node={node}
        childNodeRenderer={childNodeRenderer ?? defaultNodeChildrenRenderer}
        contentRenderer={contentRenderer ?? defaultNodeContentRenderer}
      />
    ));

  return <g className='ArcGraph-ChildNodeGroup'>{childNodes}</g>;
}

const origin = { x: 0, y: 0 };
