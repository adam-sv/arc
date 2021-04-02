import type { IBoxGraphNode } from './Nodes/Node/types';
import type { IBoxGraphEdge } from './Edges/Edge/types';
export interface IBoxGraphHereditaryGroup {
  id: string;
  canBeChildOf?: string[]; // list of group ids of which this group can be a child
  canBeParentOf?: string[]; // list of group ids of which this group can be a parent
}

export interface IBoxGraphProps {
  nodes?: IBoxGraphNode[];
  edges?: IBoxGraphEdge[];
  initialExpandedChildLayers?: number;
  hereditaryGroups?: IBoxGraphHereditaryGroup[];
  enableRightClick?: boolean;
  enableDrag?: boolean;
}
