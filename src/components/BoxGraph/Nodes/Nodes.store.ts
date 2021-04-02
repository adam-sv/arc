import { action, computed, observable } from 'mobx';
import { generatePseudoRandomId } from '../../../util';
import { BoxGraphStore } from '../BoxGraph.store';
import { EdgeType } from '../const';
import { IBoxGraphEdge } from '../Edges/Edge/types';
import { IBoxGraphHereditaryGroup } from '../types';
import { IBoxGraphNode } from './Node/types';

const childGroupAllowsParentalGroup = (
  childGroup: IBoxGraphHereditaryGroup,
  parentGroup: IBoxGraphHereditaryGroup,
) => {
  if (!childGroup.canBeChildOf) {
    // if canBeChildOf is not defined, it can be a child of anything
    return true;
  }
  if (!childGroup.canBeChildOf.length) {
    // if canBeChildOf is an empty array, it can't be the child of anything
    return false;
  }
  return !!childGroup.canBeChildOf.find((eligibleParentId: string) => {
    return eligibleParentId === parentGroup.id;
  });
}

const someChildGroupIsAllowedToBeChildOfSomeParentGroup = (childGroups, parentGroups): boolean => {
  return parentGroups.reduce((
    isEligible: boolean,
    parentGroup: IBoxGraphHereditaryGroup,
  ) => {
    if (isEligible) {
      return true; // if any group is eligible, we're good
    }

    // if canBeParentOf is not defined, it can be a parent of anything
    if (!parentGroup.canBeParentOf) {
      // check that our parent group is allowed to be the parent of some child group
      return !!childGroups
        .filter((childGroup) => childGroupAllowsParentalGroup(childGroup, parentGroup))
        .length
    }
    // if canBeParentOf is defined, find if our child node is allowed...
    return !!parentGroup.canBeParentOf.find((eligibleChildGroupId: string) => {
      const matchedChildGroup =
        childGroups.find((g: IBoxGraphHereditaryGroup) => g.id === eligibleChildGroupId);
      if (matchedChildGroup) {
        // if our child group is allowed to be a child of our parent
        // check that our parent is allowed to be the parent of the child
        return childGroupAllowsParentalGroup(matchedChildGroup, parentGroup);
      };
      return false;
    });
  }, false);
}

export interface IBoxGraphNodesStoreProps {
  boxGraphStore: BoxGraphStore;
  nodes: IBoxGraphNode[];
}
export class NodesStore {
  @observable _nodes = new Map<string, IBoxGraphNode>();
  @computed get nodes(): IBoxGraphNode[] { return Array.from(this._nodes.values()) };
  @observable nodesContainerElement: HTMLDivElement | undefined = undefined;
  @observable nodeElementMap: Map<string, HTMLDivElement | undefined> = new Map();
  boxGraphStore: BoxGraphStore;

  constructor({ boxGraphStore, nodes }: IBoxGraphNodesStoreProps) {
    this.boxGraphStore = boxGraphStore; // root boxGraphStore
    nodes.forEach((node: IBoxGraphNode) => {
      if (!node.id) {
        node.id = generatePseudoRandomId();
      }
      if (!node.columnId) {
        node.columnId = 'default';
      }
      node.isExpanded = node.isExpanded ? true : false;
      node.expand = () => this.boxGraphStore.nodesStore.setNodeExpanded(node, true);
      node.collapse = () => this.boxGraphStore.nodesStore.setNodeExpanded(node, false);
      node.select = () => this.boxGraphStore.selectNode(node);
      this.setNode(node.id, node);
    });
  }

  getNode(id: string) {
    return this._nodes.get(id);
  }

  setNode(id: string, node: IBoxGraphNode) {
    this._nodes.set(id, node);
  }

  getNodeColumns(node?: IBoxGraphNode): string[] {
    // if we pass null, get root node columns
    const children = node ? this.getChildNodes(node) : this.rootNodes;
    return children.reduce((acc: string[], curNode: IBoxGraphNode) => {
      const stringifiedColumnId = curNode.columnId ? `${curNode.columnId}` : undefined;
      return (stringifiedColumnId && !acc.includes(stringifiedColumnId))
        ? [...acc, stringifiedColumnId] : acc;
    }, [])
    .sort((colA: string, colB: string) => {
      if (colA === 'default') {
        return -1;
      }
      if (colB === 'default') {
        return 1;
      }
      return colA > colB ? 1 : -1;
    });
  }

  isNodeElibibleChild(childNode: IBoxGraphNode, parentNode: IBoxGraphNode): boolean {
    if (!parentNode.groupIds || !parentNode.groupIds.length) {
      // if not part of a group, allow all children on parent
      return true;
    }

    const parentGroups: IBoxGraphHereditaryGroup[] = this.boxGraphStore.hereditaryGroups
      .filter((g: IBoxGraphHereditaryGroup) => parentNode.groupIds!.includes(g.id));

    const childGroups: IBoxGraphHereditaryGroup[] = this.boxGraphStore.hereditaryGroups
      .filter((g: IBoxGraphHereditaryGroup) => childNode.groupIds!.includes(g.id));

    return someChildGroupIsAllowedToBeChildOfSomeParentGroup(childGroups, parentGroups);
  }

  isNodeCollapsible(nodeModel: IBoxGraphNode): boolean {
    // a node can only be collapsed if it is not a root node
    return !this.rootNodes.find((n: IBoxGraphNode) => n.id === nodeModel.id);
  }

  getChildNodes(nodeModel: IBoxGraphNode): IBoxGraphNode[] {
    return this.boxGraphStore.edgesStore.getEdgesForNode(nodeModel)
      .filter((edge: IBoxGraphEdge) => edge.nodes[0] === nodeModel.id && edge.type === EdgeType.Hereditary)
      .map((edge: IBoxGraphEdge) => this.nodes.find(n => n.id === edge.nodes[1]))
      .filter((node: IBoxGraphNode | undefined) => !!node) // make sure there are no undefined
      .map((node: IBoxGraphNode | undefined) => node!); // tell TS that there are no undefined 🙄
  }

  @action
  setNodeExpanded(nodeModel: IBoxGraphNode, expanded: boolean) {
    [...this.nodes].forEach((node: IBoxGraphNode) => {
      if (node.id === nodeModel.id) {
        const newIsExpanded = (!expanded && this.isNodeCollapsible(nodeModel))
          ? false : true;
        if (newIsExpanded !== node.isExpanded) {
          node.isExpanded = newIsExpanded;
          if (!node.isExpanded && node.didCollapse) {
            node.didCollapse(node);
          } else if (node.isExpanded && node.didExpand) {
            node.didExpand(node);
          }
        }
      }
      this.setNode(node.id!, node);
    });
  }

  @action
  addNode(nodeModel: IBoxGraphNode) {
    nodeModel.id = generatePseudoRandomId();
    this.setNode(nodeModel.id, nodeModel);
  }

  @action
  deleteNode(nodeModel: IBoxGraphNode) {
    // recursively delete children
    this.getChildNodes(nodeModel).forEach((childNode) => this.deleteNode(childNode!));
    this.boxGraphStore.edgesStore.deleteEdgesForNode(nodeModel);
    this._nodes.delete(nodeModel.id!);
  }

  @action.bound
  copyNode(nodeModel: IBoxGraphNode): IBoxGraphNode {
    const copy = { ...nodeModel };
    copy.id = generatePseudoRandomId();
    this.addNode(copy);
    const children = this.getChildNodes(nodeModel);
    // recursively add all children;
    children.forEach((childNode) => {
      const childCopy = this.copyNode(childNode!);
      this.boxGraphStore.edgesStore.createEdge(copy, childCopy, EdgeType.Hereditary);
    });

    return copy;
  }

  @computed get
  rootNodes(): IBoxGraphNode[] {
    return this.nodes.filter((node) => {
      // a node is a root node if it isn't the target of any hereditary relationships
      return !this.boxGraphStore.edgesStore.edges.find((edge) => {
        return (edge.type === EdgeType.Hereditary) && (edge.nodes[1] === node.id);
      })
    });
  }

  @action
  addNodeElementMapping(nodeModel: IBoxGraphNode, element: HTMLDivElement | undefined) {
    const newMap = new Map(this.nodeElementMap);
    newMap.set(nodeModel.id!, element);
    this.nodeElementMap = newMap;
  }

  getClosestVisibleAncestor(nodeModel: IBoxGraphNode): IBoxGraphNode | undefined {
    if (this.rootNodes.find((n: IBoxGraphNode) => n.id === nodeModel.id)) {
      // if it's a root node then this node is definitely visible.
      return nodeModel;
    }

    const parents = this.boxGraphStore.edgesStore.getParentsForNode(nodeModel);
    if (parents.length) {
      const firstParent = parents[0]; // should be the only parent
      if (firstParent.isExpanded
        || this.rootNodes.find((n: IBoxGraphNode) => n.id === firstParent.id)) {
        // if it's parent is expanded, or if it's parent is a root node, it is visible
        return nodeModel
      }
      return this.getClosestVisibleAncestor(firstParent);
    }

    return undefined;
  }

  getClosestExpandedAncestor(nodeModel: IBoxGraphNode): IBoxGraphNode | undefined {
    if (nodeModel.isExpanded || !this.isNodeCollapsible(nodeModel)) {
      // if it's expanded or if it is not collapsible
      return nodeModel;
    }
    const parents = this.boxGraphStore.edgesStore.getParentsForNode(nodeModel);
    if (parents.length) {
      const firstParent = parents[0]; // should be the only parent
      return this.getClosestExpandedAncestor(firstParent);
    }
    return undefined;
  }
}
