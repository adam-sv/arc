// dependencies
import React, { useRef, useState } from 'react';
// internals
import { cn, geometry, EdgeRouter, SVGContainer, useMemoizedState } from '@adam-sv/arc';
// stores
import { Nodes } from './Nodes';
import { NodesStore } from './Nodes/Nodes.store';
import { VisualStore } from './Visual.store';
// styles
import './style.css';
// types
import type { ISVGContentProps } from '@adam-sv/arc';
import type { IDescribedBox, IGraphProps, IGraphConnectionActions, IGraphNodeActions, IGraphSelectionActions, IGraphStores } from './types';
export type { IDescribedBox, IGraphProps, IGraphConnectionActions, IGraphNodeActions, IGraphSelectionActions, IGraphStores };

export function Graph(props: IGraphProps) {
  // we want to track some data across renders
  const { gridFillsAvailableSpace } = props;
  const storesRef = useRef<IGraphStores>(null);
  if (storesRef.current === null) {
    storesRef.current = {
      visual: new VisualStore(),
      nodes: new NodesStore(),
    };
  }
  forEachStore(storesRef.current, store => store.initialize(props, storesRef.current));

  // track zoom & container size for knowing how big to render
  const [forceCounter, setForceCounter] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [graphRect, setGraphRect] = useMemoizedState<DOMRect>(new DOMRect(), {
    equalityTest: geometry.rectsAreEqual,
  });

  const rerenderHook = () => setForceCounter(forceCounter + 1);
  const stores = storesRef.current;

  // update our stores
  forEachStore(stores, store => store.update(props, rerenderHook));

  return (
    <div
      className={cn(
        !props.overrideDefaultClassName && 'ArcGraph',
        props.className,
      )}
    >
      <SVGContainer
        margin={props.margin}
        padding={props.padding}
        coordinateSpace={props.graph.boundingRect}
        positionerFillsSpace={gridFillsAvailableSpace}
      >
        {({ containerRect, contentRect, paddedContentRect, padding, shift, zoom }:ISVGContentProps) =>
          <g>
            <Grid
              height={gridFillsAvailableSpace
                ? Math.max(containerRect.height, contentRect.height, paddedContentRect.height)
                : paddedContentRect.height}
              width={gridFillsAvailableSpace
                ? Math.max(containerRect.width, contentRect.width, paddedContentRect.width)
                : paddedContentRect.width}
              padding={padding}
              gridSize={stores.visual.gridSize}
            />
            <Nodes
              connectionActions={props.connectionActions || {}}
              nodeActions={props.nodeActions || {}}
              graph={props.graph}
              shift={shift}
              stores={stores}
            />
            <EdgeRouter
              connectionActions={props.connectionActions || {}}
              edgeMode={props.edgeMode}
              edgeSpacing={props.edgeSpacing}
              graph={props.graph}
              noSVGContainer
              shift={shift}
            />
          </g>
        }
      </SVGContainer>
    </div>
  );
}

function Grid(props:{
  height: number;
  width: number;
  gridSize: number;
  padding: { left: number; top: number };
}) {
  const { height, width, gridSize, padding } = props;

  let leftPaddingOffset = padding.left - gridSize;
  while (leftPaddingOffset > 0) { leftPaddingOffset -= gridSize; }

  let topPaddingOffset = padding.top - gridSize;
  while (topPaddingOffset > 0) { topPaddingOffset -= gridSize; }

  const lines = [];
  try { // horizontal
    for (let i = 0; i < Math.ceil((height - leftPaddingOffset) / gridSize); i++) {
      lines.push(
        <line
          key={`y${i}`}
          className="grid"
          x1={0} x2={width - leftPaddingOffset}
          y1={i * gridSize} y2={i * gridSize}
        />
      );
    }
  } catch (e) {/*NOOP*/}
  try { // vertical
    for (let i = 0; i < Math.ceil((width - topPaddingOffset) / gridSize); i++) {
      lines.push(
        <line
          key={`x${i}`}
          className="grid"
          x1={i * gridSize} x2={i * gridSize}
          y1={0} y2={height - topPaddingOffset}
        />
      );
    }
  } catch (e) {/*NOOP*/}

  return (
    <g
      className="grid-group"
      transform={`translate(${leftPaddingOffset}, ${topPaddingOffset})`}
    >
      {lines}
    </g>
  );
}

function forEachStore(stores: IGraphStores, callback: (store: any) => void) {
  Object.keys(stores).forEach(key => callback(stores[key]));
}
