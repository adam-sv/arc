import { ICoords, RenderableContent } from '@adam-sv/arc';
import { NodeType } from '../../const';

export interface IBoxGraphNode {
  id?: string; // id is enforced in code
  title?: string;
  type?: NodeType;
  className?: string;
  columnId?:  string | number;
  groupIds?: string[]; // use to add node to a hereditary group as defined on graph
  expandedContentGenerator?: (nodeModel: IBoxGraphNode) => RenderableContent;
  collapsedContentGenerator?: (nodeModel: IBoxGraphNode) => RenderableContent;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, nodeModel: IBoxGraphNode) => void,
  // onDoubleClick handler overrides default behaviour (expand/collapse on double-click)
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, nodeModel: IBoxGraphNode) => void,
  expand?: () => void, // get's added automatically so consumer can call it in handlers
  collapse?: () => void, // get's added automatically so consumer can call it in handlers
  select?: () => void, // get's added automatically so consumer can call it in handlers
  didExpand?: (nodeModel: IBoxGraphNode) => void,
  didCollapse?: (nodeModel: IBoxGraphNode) => void,
  dropCoords?: ICoords; // point that a node was dropped ([0,0] is screen's top-left)
  dragCoords?: ICoords; // point you began dragging the node ([0,0] is top-left of the node itself)
  isExpanded?: boolean;
}
