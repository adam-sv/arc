import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Button,
  ContextMenu,
  Draggable,
  Dropdown,
  Graph,
  LogicalArcGraph,
  MatIcon,
  NumberSlider,
  Panel,
  Title,
  ICoords,
  IProcessedGraphNode,
  IGraphConnectionActions,
  IGraphSelectionActions,
} from '@adam-sv/arc';
import type {
  IGraphNode,
  IGraphEdge,
  IDropdownItem,
  IEdgeRouterMode,
  IGraphDragMode,
} from '@adam-sv/arc';
import { getAppRootElement } from 'arc-demo-app';
import { v4 as uuidv4 } from 'uuid';

// style
import './GraphStyleOverrides.scss';

// We're using this example to figure out a Graph "scale" properties
export function ZoomChart() {
  const graphPadding = 10;
  const [edgeMode] = useState<IEdgeRouterMode>('smart');

  const [nodes, setNodes] = useState<IGraphNode<never, number>[]>([
    // We intentionally set a bad parentId here; you'll notice it is simply ignored
    { id: 0, label: 'Zero', position: { x: 1000, y: 0 }, parentId: -1 },
    {
      id: 1,
      label: 'One (not an edge source)',
      position: { x: 1250, y: 100 },
    },
    {
      id: 2,
      label: 'Two (not an edge target)',
      position: { x: 1500, y: -100 },
    },
    {
      id: 3,
      label: 'Three (custom connection button)',
      position: { x: 1750, y: 100 },
    },
    { id: 5, label: 'Five', position: { x: 1750, y: 220 } },
    { id: 6, label: 'Six', position: { x: 1250, y: 420 } },
  ]);
  const [edges, setEdges] = useState<IGraphEdge<never, number>[]>([
    { from: 0, to: 1, className: 'danger' },
    { from: 0, to: 5 },
    { from: 0, to: 6 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 5 },
    { from: 5, to: 6 },
  ]);

  // selection of nodes & edges
  const [selectedNodeIds, setSelectedNodeIds] = useState<Set<number>>(
    new Set()
  );
  const [selectedEdges, setSelectedEdges] = useState<
    Set<IGraphEdge<never, number>>
  >(new Set());

  // graph config
  const [latestId, setLatestId] = useState(7);
  const [debug, setDebug] = useState(false);
  const [dotGrid, setDotGrid] = useState(false);
  const [dragMode, setDragMode] = useState<IGraphDragMode>('move');
  const [gridSize, setGridSize] = useState(10);
  const [zoom, setZoom] = useState(1);

  // context menu
  const [contextNode, setContextNode] =
    useState<IProcessedGraphNode<never, number>>();
  const [position, setPosition] = useState<ICoords>();
  const [contextMenuIsOpen, setContextMenuIsOpen] = useState<
    false | 'node' | 'background'
  >(false);

  const graph = useMemo(
    () => new LogicalArcGraph<never, never, number>(nodes, edges),
    [nodes, edges]
  );

  const addEdge = useCallback((from: number, to: number) => {
    setEdges((curr) => [...curr, { from, to }]);
  }, []);
  const addNode = useCallback((newNode: IGraphNode<never, number>) => {
    setNodes((curr) => [...curr, newNode]);
    setLatestId(iterateId);
  }, []);

  const moveNodeIntoNewGroup = useCallback(
    ({ id }: IGraphNode<never, number>) => {
      setNodes((lastNodes) => {
        const originalNode = lastNodes.find((node) => node.id === id);
        if (!originalNode) return lastNodes;

        const group: IGraphNode<never, number> = {
          id: latestId,
          label: `Group From ${originalNode.label ?? '-'}`,
          parentId: originalNode.parentId ?? undefined,
          position: originalNode.position
            ? { ...originalNode.position }
            : undefined,
        };
        const node = { ...originalNode };
        node.parentId = group.id;

        lastNodes = lastNodes.filter(({ id }) => id !== node.id);
        return [...lastNodes, group, node];
      });
      setLatestId(iterateId);
    },
    [latestId]
  );

  const moveNodeIntoExistingGroup = useCallback(
    (node: IGraphNode<never, number>) => {
      const firstGroup = nodes.find((node) => node.label.includes('Group'));
      if (firstGroup)
        setNodes([
          ...nodes.filter((n) => n.id !== node.id),
          {
            ...node,
            position: {
              x: (firstGroup.position?.x ?? 0) + 100,
              y: firstGroup.position?.y ?? 0,
            },
            parentId: firstGroup.id,
          },
        ]);
    },
    [nodes]
  );

  return (
    <Panel className='ChartBaseExample Zoom' style={{ padding: 0 }}>
      <div
        style={{
          display: 'flex',
          minHeight: 120,
        }}
      >
        <div
          style={{
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: 8,
          }}
        >
          <Dropdown
            label='Background Click & Drag'
            items={[
              { label: 'Drag to Multi-Select', value: 'multi-select' },
              { label: 'Drag to Move', value: 'move' },
            ]}
            onChange={useCallback((item: IDropdownItem<IGraphDragMode>) => {
              setDragMode(item.value);
            }, [])}
            style={{ flex: '0 0 fit-content', alignSelf: 'center' }}
            value={dragMode}
          />
          <Dropdown
            label='Background Style'
            items={[
              { label: 'Dot Grid', value: true },
              { label: 'Classic Grid', value: false },
            ]}
            onChange={useCallback((item: IDropdownItem<boolean>) => {
              setDotGrid(item.value);
            }, [])}
            style={{ flex: '0 0 fit-content', alignSelf: 'center' }}
            value={dotGrid}
          />
          <NumberSlider
            title='Grid Size'
            min={5}
            max={50}
            interval={5}
            valueUnitLabel='pixels'
            valueUnitLabelSingular='pixel'
            value={gridSize}
            onChange={setGridSize}
            style={{
              margin: '0 auto',
              alignSelf: 'center',
              minWidth: 137,
            }}
          />
          <Dropdown
            label='Debug Mode'
            items={[
              { label: 'On', value: true },
              { label: 'Off', value: false },
            ]}
            onChange={useCallback((item: IDropdownItem<boolean>) => {
              setDebug(item.value);
            }, [])}
            style={{ flex: '0 0 fit-content', alignSelf: 'center' }}
            value={debug}
          />
          <Button
            onClick={() => {
              setNodes([]);
              setEdges([]);
            }}
          >
            Reset Graph
          </Button>
          <div
            className='ZoomControls'
            style={{
              display: 'flex',
              flex: '1 1 auto',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              onClick={() => {
                setZoom(Math.max(zoom - 0.2, 0.3));
              }}
            >
              <MatIcon.ChevronDown />
            </div>
            <div>Current Zoom: {zoom.toFixed(2)}</div>
            <div
              onClick={() => {
                setZoom(Math.min(zoom + 0.2, 3));
              }}
            >
              <MatIcon.ChevronUp />
            </div>
          </div>
        </div>
        <div
          className='DraggableExampleColumn'
          style={{
            flex: '0 1 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '0 8px',
            gap: 8,
            background: 'var(--background)',
            borderLeft: '1px solid var(--border)',
          }}
        >
          <Title style={{ margin: 0, textAlign: 'center', display: 'block' }}>
            Drag & Drop Demo
          </Title>
          <Draggable
            data={JSON.stringify({
              id: uuidv4(),

              label: 'Drag Me!',
            })}
            style={{
              width: 180,
              height: 80,
              border: '1px solid var(--border-shade)',
              background: 'var(--surface)',
              textAlign: 'center',
              padding: '30px 0',
            }}
          >
            Drag ME!
          </Draggable>
        </div>
      </div>

      <Graph<never, never, number>
        graph={graph}
        backgroundDragMode={dragMode}
        invertDragControls
        edgeCreation={{
          onEdgeCreated: (firstId, secondId) => {
            addEdge(firstId, secondId);
          },
          getConnectionStartPosition: (node) => ({
            position: 'right',
            className: node.id === 3 ? 'three' : '',
          }),
          canSpawnConnections: (node) => node.id !== 1,
          getValidConnectionTargets: () =>
            new Set(graph.nodes.filter((n) => n.id !== 2).map(({ id }) => id)),
        }}
        edgeMode={edgeMode}
        debug={debug}
        gridSize={gridSize}
        gridStyle={dotGrid ? 'dot-grid' : 'grid'}
        minHeight={400}
        layoutOptions={
          useRef({
            childPadding: 10,
            contentHeight: 50,
            padding: graphPadding,
          }).current
        }
        htmlNodeContentRenderer={useCallback(
          ({ node }: { node: { label: string } }) => (
            <div>{node.label}</div>
          ),
          []
        )}
        selectedNodeIds={selectedNodeIds}
        selectedEdges={selectedEdges}
        zoomControls={{ value: zoom, onZoomUpdate: setZoom }}
        mode='hierarchical'
        connectionActions={
          useRef<IGraphConnectionActions<never, number>>({
            onClick(e, edge) {
              console.info('onClick - edge', { e, edge });
            },
            onContextMenu(e, edge) {
              console.info('onContextMenu - edge', { e, edge });
            },
          }).current
        }
        nodeActions={{
          onClick(e, node) {
            console.info('onClick - node', { e, node });
          },
          onDoubleClick(e, node) {
            console.info('onDoubleClick', { e, node });
          },
          onMove({ id }, delta) {
            if (Math.abs(delta.x) < 5 && Math.abs(delta.y) < 5) return;

            setNodes((lastNodes) => {
              const node = lastNodes.find((n) => n.id === id);
              if (!node) return lastNodes;

              let index = -1;
              for (let i = 0; i < lastNodes.length; i++)
                if (lastNodes[i].id === node.id) index = i;

              if (index >= 0) {
                return [
                  ...lastNodes.slice(0, index),
                  {
                    ...node,
                    position: {
                      x: (node.position?.x ?? 0) + delta.x,
                      y: (node.position?.y ?? 0) + delta.y,
                    },
                  },
                  ...lastNodes.slice(index + 1),
                ];
              }
              return lastNodes;
            });
          },
          onContextMenu(e, node) {
            console.info('onContextMenu - node', { e, node });
            e.preventDefault();
            e.stopPropagation();
            setPosition({ x: e.pageX, y: e.pageY });
            setContextNode(node);
            setContextMenuIsOpen('node');
          },
        }}
        selectionActions={
          useRef<IGraphSelectionActions<never, number>>({
            onSelectionUpdated({ nodeIds, edges }) {
              console.info('onSelectionUpdated', { nodeIds, edges });
              setSelectedNodeIds(nodeIds);
              setSelectedEdges(edges);
            },
            onContextMenu(e, selection) {
              console.info('onContextMenu - selection', { e, selection });
            },
          }).current
        }
        onContextMenu={(e, position) => {
          console.info('onContextMenu - background', { e, position });
          e.preventDefault();
          e.stopPropagation();
          setPosition({ x: e.pageX, y: e.pageY });
          setContextMenuIsOpen('background');
        }}
        onDrop={(ev, position, data) => {
          const { id, parentId, label } = JSON.parse(
            data
          ) as unknown as IGraphNode<never, number>;
          addNode({ id, parentId, label, position });
        }}
      />
      {position && (
        <ContextMenu
          isOpen={Boolean(contextMenuIsOpen)}
          // Sorry
          setIsOpen={(isOpen: boolean) => {
            setContextMenuIsOpen(isOpen ? false : false);
          }}
          position={position}
          items={
            contextMenuIsOpen === 'node'
              ? [
                  {
                    label: 'Convert to group',
                    onClick: () => {
                      if (contextNode) moveNodeIntoNewGroup(contextNode);
                    },
                  },
                  {
                    label: 'Move into group',
                    onClick: () => {
                      if (contextNode) moveNodeIntoExistingGroup(contextNode);
                    },
                  },
                  {
                    label: 'Copy Node',
                    onClick: () => {
                      console.error('IMPLEMENT: Copy me');
                    },
                  },
                  {
                    label: 'Delete Node',
                    onClick: () => {
                      console.error('IMPLEMENT: Delete me');
                    },
                  },
                ]
              : [{ label: 'No actions available' }]
          }
          portalTargetElement={getAppRootElement()}
        />
      )}
    </Panel>
  );
}

function iterateId(lastId: number) {
  return lastId + 1;
}
