import { EdgeType } from "../../const";

export interface IBoxGraphEdge {
  id?: string;
  nodes: [string, string]; // node IDs
  type?: EdgeType;
  originHidden?: boolean,
  terminusHidden?: boolean,
}
