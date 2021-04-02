import type { IARCProps, IBoxDimensions, ICoords, RenderableContent } from '@adam-sv/arc';

export interface ISVGContainerProps extends IARCProps {
  margin?: IBoxDimensions;
  padding?: IBoxDimensions;
  positionerFillsSpace?: boolean;
  coordinateSpace: DOMRect;
  children: (contentProps: ISVGContentProps) => RenderableContent;
}

export interface ISVGContentProps {
  containerRect: DOMRect;
  contentRect: DOMRect;
  paddedContentRect: DOMRect;
  margin: IBoxDimensions;
  padding: IBoxDimensions;
  shift?: ICoords;
  zoom: number;
}
