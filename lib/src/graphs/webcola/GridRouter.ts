import {
  Calculator,
  // computeGroupBounds,
  Constraint,
  // Leaf,
  LongestCommonSubsequence,
  NodeWrapper,
  Point,
  Rectangle,
  // ProjectionGroup,
  // RBTree,
  Solver,
  Variable,
  Vert,
} from 'webcola';

/* A couple categories of comment are left around
 * // RectangleCast => we cast our local WCRectangle to Webcola's Rectangle because their types ignore null, logic is identical
 * // WCNodeWrapperCast => Webcola recklessly uses a special object "this.root" in place of WCNodeWrappers, but the logic is built to work on both
 * // Wart => Webcola's types are pretty bad. Sometimes we gotta do something ugly.
 */

export interface NodeAccessor<Node> {
  getChildren(v: Node): number[];
  getBounds(v: Node): WCRectangle;
}

// a horizontal or vertical line of nodes
export interface GridLine {
  nodes: WCNodeWrapper[];
  pos: number;
}

export class WCRectangle {
  constructor(
    public x: number,
    public X: number,
    public y: number,
    public Y: number
  ) {}

  static empty(): WCRectangle {
    return new WCRectangle(
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY
    );
  }

  cx(): number {
    return (this.x + this.X) / 2;
  }

  cy(): number {
    return (this.y + this.Y) / 2;
  }

  overlapX(r: WCRectangle): number {
    const ux = this.cx();
    const vx = r.cx();
    if (ux <= vx && r.x < this.X) return this.X - r.x;
    if (vx <= ux && this.x < r.X) return r.X - this.x;
    return 0;
  }

  overlapY(r: WCRectangle): number {
    const uy = this.cy(),
      vy = r.cy();
    if (uy <= vy && r.y < this.Y) return this.Y - r.y;
    if (vy <= uy && this.y < r.Y) return r.Y - this.y;
    return 0;
  }

  setXCentre(cx: number): void {
    const dx = cx - this.cx();
    this.x += dx;
    this.X += dx;
  }

  setYCentre(cy: number): void {
    const dy = cy - this.cy();
    this.y += dy;
    this.Y += dy;
  }

  width(): number {
    return this.X - this.x;
  }

  height(): number {
    return this.Y - this.y;
  }

  union(r: WCRectangle): WCRectangle {
    return new WCRectangle(
      Math.min(this.x, r.x),
      Math.max(this.X, r.X),
      Math.min(this.y, r.y),
      Math.max(this.Y, r.Y)
    );
  }

  /**
   * return any intersection points between the given line and the sides of this rectangle
   * @method lineIntersection
   * @param x1 number first x coord of line
   * @param y1 number first y coord of line
   * @param x2 number second x coord of line
   * @param y2 number second y coord of line
   * @return any intersection points found
   */
  lineIntersections(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): Array<Point> {
    const sides = [
      [this.x, this.y, this.X, this.y],
      [this.X, this.y, this.X, this.Y],
      [this.X, this.Y, this.x, this.Y],
      [this.x, this.Y, this.x, this.y],
    ];
    const intersections = [];
    for (let i = 0; i < 4; ++i) {
      const r = WCRectangle.lineIntersection(
        x1,
        y1,
        x2,
        y2,
        sides[i][0],
        sides[i][1],
        sides[i][2],
        sides[i][3]
      );
      if (r !== null) intersections.push({ x: r.x, y: r.y });
    }
    return intersections;
  }

  /**
   * return any intersection points between a line extending from the centre of this rectangle to the given point,
   *  and the sides of this rectangle
   * @method lineIntersection
   * @param x2 number second x coord of line
   * @param y2 number second y coord of line
   * @return any intersection points found
   */
  rayIntersection(x2: number, y2: number): Point | null {
    const ints = this.lineIntersections(this.cx(), this.cy(), x2, y2);
    return ints.length > 0 ? ints[0] : null;
  }

  vertices(): Point[] {
    return [
      { x: this.x, y: this.y },
      { x: this.X, y: this.y },
      { x: this.X, y: this.Y },
      { x: this.x, y: this.Y },
    ];
  }

  static lineIntersection(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ): Point | null {
    const dx12 = x2 - x1,
      dx34 = x4 - x3,
      dy12 = y2 - y1,
      dy34 = y4 - y3,
      denominator = dy34 * dx12 - dx34 * dy12;
    if (denominator == 0) return null;
    const dx31 = x1 - x3,
      dy31 = y1 - y3,
      numa = dx34 * dy31 - dy34 * dx31,
      a = numa / denominator,
      numb = dx12 * dy31 - dy12 * dx31,
      b = numb / denominator;
    if (a >= 0 && a <= 1 && b >= 0 && b <= 1) {
      return {
        x: x1 + a * dx12,
        y: y1 + a * dy12,
      };
    }
    return null;
  }

  inflate(pad: number): WCRectangle {
    return new WCRectangle(
      this.x - pad,
      this.X + pad,
      this.y - pad,
      this.Y + pad
    );
  }
}

export type WCNodeID = number;

export interface WCGridRouterRoot {
  id: 'root';
  children: WCNodeID[];
}

export class WCNodeWrapperPartial {
  leaf: boolean;
  ports: Vert[];

  constructor(
    public id: number,
    public rect: Rectangle,
    public children: number[]
  ) {
    this.leaf = this.children.length === 0;
    this.ports = [];
  }
}

export class WCNodeWrapper {
  id: number;
  rect: Rectangle;
  children: number[];
  leaf: boolean;
  ports: Vert[];
  parent: WCNodeWrapper | WCGridRouterRoot;

  constructor(
    partial: WCNodeWrapperPartial,
    parent: WCNodeWrapper | WCGridRouterRoot
  ) {
    this.id = partial.id;
    this.rect = partial.rect;
    this.children = partial.children;
    this.leaf = partial.leaf;
    this.ports = partial.ports;
    this.parent = parent;
  }
}

export interface WCEdge {
  source: WCNodeID;
  target: WCNodeID;
  length: number;
}

export class WCGridRouter<Node = any> {
  leaves: WCNodeWrapper[];
  groups: WCNodeWrapper[];
  nodes: WCNodeWrapper[];
  cols: GridLine[];
  rows: GridLine[];
  root: WCGridRouterRoot;
  verts: Vert[];
  edges: WCEdge[];
  backToFront;
  obstacles?: any[]; // TODO: fix. How? What does it mean
  passableEdges?: WCEdge[]; // TODO: fix. How? What does it mean

  assembleNodes(
    originalnodes: Node[],
    accessor: NodeAccessor<Node>
  ): { nodes: WCNodeWrapper[]; root: WCGridRouterRoot } {
    // root is the parent of any nodes without a parent
    const root: WCGridRouterRoot = { id: 'root', children: [] };

    // now the IDs like in children refer to the node by its index in this array
    const partialNodes = originalnodes.map(
      (v, i) =>
        new WCNodeWrapperPartial(
          i,
          accessor.getBounds(v) as Rectangle, // RectangleCast
          accessor.getChildren(v)
        )
    );

    // Somehow, here, we want to assert parent is well-formed
    // Should we make two layers - WCNodeWrapperPartial and WCNodeWrapper ?
    // I don't see another approach

    // here, we validate each node has one parent
    // it's a little slow, oh well
    const nodeToParentMap = new Map<WCNodeID, WCNodeID | 'root'>();
    partialNodes.forEach((v) => {
      const possibleParents = partialNodes.filter(
        (node) => node.children.indexOf(v.id) >= 0
      );

      if (possibleParents.length > 1) {
        throw new Error(
          'Invalid GridRouter node tree passed - node ' +
            v.id +
            ' had multiple possible parents: ' +
            possibleParents.map((x) => x.id).join(', ') +
            '!'
        );
      } else if (possibleParents.length === 1) {
        nodeToParentMap.set(v.id, possibleParents[0].id);
      } else {
        nodeToParentMap.set(v.id, 'root');
        root.children.push(v.id);
      }
    });

    // in order to meaningfully connect nodes, we need to do all the ones with Root as the parent, and then recurse down those
    // some kinda BFS essentially
    const queue: WCNodeID[] = root.children;
    const idToNodeMap = new Map<WCNodeID, WCNodeWrapper>();
    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      const partialNode = partialNodes[nodeId];
      const parentId = nodeToParentMap.get(nodeId)!;
      const parent = parentId === 'root' ? root : idToNodeMap.get(parentId)!;

      const fullNode = new WCNodeWrapper(partialNode, parent);
      idToNodeMap.set(nodeId, fullNode);

      // we already verified earlier that all nodes belong to 0 or 1 parents!
      queue.push(...fullNode.children);
    }

    const nodes = partialNodes
      .map((pn) => idToNodeMap.get(pn.id)!)
      .filter(Boolean);
    if (nodes.length !== partialNodes.length) {
      throw new Error(
        'GridRouter.assembleNodes failed to construct a valid graph - could not create parent <-> child relationships for every node!'
      );
    }

    return {
      nodes,
      root,
    };
  }

  constructor(
    public originalnodes: Node[],
    accessor: NodeAccessor<Node>,
    public groupPadding: number = 12
  ) {
    const { nodes, root } = this.assembleNodes(originalnodes, accessor);
    this.root = root;
    this.nodes = nodes;
    this.leaves = this.nodes.filter((v) => v.leaf);
    this.groups = this.nodes.filter((g) => !g.leaf);
    this.cols = this.getGridLines('x');
    this.rows = this.getGridLines('y');

    // create parents for each node or group that is a member of another's children
    this.groups.forEach((v) =>
      v.children.forEach((c) => (this.nodes[c].parent = v))
    );

    // nodes ordered by their position in the group hierarchy
    this.backToFront = this.nodes.slice(0);
    this.backToFront.sort((x, y) => this.getDepth(x) - this.getDepth(y));

    // compute boundary rectangles for each group
    // has to be done from front to back, i.e. inside groups to outside groups
    // such that each can be made large enough to enclose its interior
    const frontToBackGroups = this.backToFront
      .slice(0)
      .reverse()
      .filter((g) => !g.leaf);
    frontToBackGroups.forEach((v) => {
      let r = WCRectangle.empty();
      v.children.forEach((c) => (r = r.union(this.nodes[c].rect)));
      v.rect = r.inflate(this.groupPadding) as Rectangle; // RectangleCast
    });

    const colMids = this.midPoints(this.cols.map((r) => r.pos));
    const rowMids = this.midPoints(this.rows.map((r) => r.pos));

    // setup extents of lines
    const rowx = colMids[0],
      rowX = colMids[colMids.length - 1];
    const coly = rowMids[0],
      colY = rowMids[rowMids.length - 1];

    interface ILine {
      x1: number;
      x2: number;
      y1: number;
      y2: number;
      verts: Vert[];
    }

    // horizontal lines
    const hlines: ILine[] = this.rows
      .map((r) => ({ x1: rowx, x2: rowX, y1: r.pos, y2: r.pos, verts: [] }))
      .concat(
        rowMids.map((m) => ({ x1: rowx, x2: rowX, y1: m, y2: m, verts: [] }))
      );

    // vertical lines
    const vlines: ILine[] = this.cols
      .map((c) => ({ x1: c.pos, x2: c.pos, y1: coly, y2: colY, verts: [] }))
      .concat(
        colMids.map((m) => ({ x1: m, x2: m, y1: coly, y2: colY, verts: [] }))
      );

    const lines = hlines.concat(vlines);

    // the routing graph
    this.verts = [];
    this.edges = [];

    // create vertices at the crossings of horizontal and vertical grid-lines
    hlines.forEach((h) =>
      vlines.forEach((v) => {
        const p = new Vert(this.verts.length, v.x1, h.y1);
        h.verts.push(p);
        v.verts.push(p);
        this.verts.push(p);

        // assign vertices to the nodes immediately under them
        let i = this.backToFront.length;
        while (i-- > 0) {
          const node = this.backToFront[i],
            r = node.rect;
          const dx = Math.abs(p.x - r.cx()),
            dy = Math.abs(p.y - r.cy());
          if (dx < r.width() / 2 && dy < r.height() / 2) {
            (<any>p).node = node;
            break;
          }
        }
      })
    );

    lines.forEach((l, li) => {
      // create vertices at the intersections of nodes and lines
      this.nodes.forEach((v, i) => {
        v.rect
          .lineIntersections(l.x1, l.y1, l.x2, l.y2)
          .forEach((intersect, j) => {
            //console.log(li+','+i+','+j+':'+intersect.x + ',' + intersect.y);
            const p = new Vert(
              this.verts.length,
              intersect.x,
              intersect.y,
              v as NodeWrapper, // NodeWrapperCast
              l
            );
            this.verts.push(p);
            l.verts.push(p);
            v.ports.push(p);
          });
      });

      // split lines into edges joining vertices
      const isHoriz = Math.abs(l.y1 - l.y2) < 0.1;
      const delta = (a: Vert, b: Vert) => (isHoriz ? b.x - a.x : b.y - a.y);
      l.verts.sort(delta);
      for (let i = 1; i < l.verts.length; i++) {
        const u = l.verts[i - 1];
        const v = l.verts[i];
        if (u.node && u.node === v.node && u.node.leaf) continue;
        this.edges.push({
          source: u.id,
          target: v.id,
          length: Math.abs(delta(u, v)),
        });
      }
    });
  }

  // repaired by ADAM
  avg(a: number[]) {
    return (
      a.reduce(function (x, y) {
        return x + y;
      }, 0) / a.length
    );
  }

  // repaired by ADAM
  clamp(val: number, min: number, max: number) {
    if (val < min) {
      return min;
    } else if (val > max) {
      return max;
    }
    return val;
  }

  // repaired by ADAM
  getGridLines(axis: 'x' | 'y') {
    const columns = [];
    const ls = this.leaves.slice(0, this.leaves.length);
    while (ls.length > 0) {
      const overlapping = ls.filter(function (v) {
        return v.rect[
          ('overlap' + axis.toUpperCase()) as 'overlapX' | 'overlapY'
        ](ls[0].rect);
      });
      const col = {
        nodes: overlapping,
        pos: this.clamp(
          this.avg(
            overlapping.map(function (v) {
              return v.rect[('c' + axis) as 'cx' | 'cy']();
            })
          ),
          ls[0].rect[axis],
          ls[0].rect[axis.toUpperCase() as 'X' | 'Y']
        ),
      };
      columns.push(col);
      col.nodes.forEach(function (v) {
        return ls.splice(ls.indexOf(v), 1);
      });
    }
    columns.sort(function (a, b) {
      return a.pos - b.pos;
    });
    return columns;
  }

  // repaired by ADAM
  // when v.parent is this.root, we're done - meaning v itself can't ever be a WCGridRouterRoot
  getDepth(node: WCNodeWrapper) {
    let v: WCNodeWrapper | WCGridRouterRoot = node;
    let depth = 0;
    while ((v as WCNodeWrapper).parent !== this.root) {
      depth++;
      v = (v as WCNodeWrapper).parent;

      if (depth > this.nodes.length) {
        throw new Error(
          `WCGridRouter.getDepth looked at more nodes than there are in the graph to determine depth of ${
            node.id
          }. @adam-sv/arc dev guesses: your graph is malformed. Node: ${JSON.stringify(
            node
          )}, depth searched: ${depth}`
        );
      }
    }
    return depth;
  }

  // medial axes between node centres and also boundary lines for the grid
  private midPoints(a: number[]): number[] {
    if (a.length === 1) {
      return [a[0]];
    }

    const gap = a[1] - a[0];
    const mids = [a[0] - gap / 2];
    for (let i = 1; i < a.length; i++) {
      mids.push((a[i] + a[i - 1]) / 2);
    }
    mids.push(a[a.length - 1] + gap / 2);
    return mids;
  }

  // find path from v to root including both v and root
  private findLineage(node: WCNodeWrapper) {
    let v: WCNodeWrapper | WCGridRouterRoot = node;
    const lineage: (WCNodeWrapper | WCGridRouterRoot)[] = [v];
    do {
      v = (v as WCNodeWrapper).parent;
      lineage.push(v);
    } while (v !== this.root);
    return lineage.reverse();
  }

  // find path connecting a and b through their lowest common ancestor
  private findAncestorPathBetween(a: WCNodeWrapper, b: WCNodeWrapper) {
    let aa = this.findLineage(a),
      ba = this.findLineage(b),
      i = 0;
    while (aa[i] === ba[i]) i++;
    // i-1 to include common ancestor only once (as first element)
    return {
      commonAncestor: aa[i - 1],
      lineages: aa.slice(i).concat(ba.slice(i)),
    };
  }

  // when finding a path between two nodes a and b, siblings of a and b on the
  // paths from a and b to their least common ancestor are obstacles
  siblingObstacles(a: WCNodeWrapper, b: WCNodeWrapper) {
    const path = this.findAncestorPathBetween(a, b);
    const lineageLookup: Partial<Record<WCNodeID | 'root', any>> = {};
    path.lineages.forEach((v) => (lineageLookup[v.id] = {}));
    let obstacles = path.commonAncestor.children.filter(
      (v) => !(v in lineageLookup)
    );

    const nodesWithObstacles: WCNodeWrapper[] = path.lineages.filter(
      (v): v is WCNodeWrapper => {
        if (v.id === 'root') {
          return false;
        }

        return (v ).parent !== path.commonAncestor;
      }
    );

    nodesWithObstacles.forEach(
      (v: WCNodeWrapper) =>
        (obstacles = obstacles.concat(
          v.parent.children.filter((c) => c !== v.id)
        ))
    );

    return obstacles.map((v) => this.nodes[v]);
  }

  // for the given routes, extract all the segments orthogonal to the axis x
  // and return all them grouped by x position
  // ADAM todo: type "segmentsets"
  // ADAM todo: what are x and y here?
  static getSegmentSets(routes: Point[][][], x: keyof Point, y: string) {
    // vsegments is a list of vertical segments sorted by x position
    const vsegments = [];
    for (let ei = 0; ei < routes.length; ei++) {
      const route = routes[ei];
      for (let si = 0; si < route.length; si++) {
        const s: Point[] & { edgeid: number; i: number } = Object.assign(
          {},
          route[si],
          {
            edgeid: ei,
            i: si,
          }
        );

        const sdx = s[1][x] - s[0][x];
        if (Math.abs(sdx) < 0.1) {
          vsegments.push(s);
        }
      }
    }
    vsegments.sort((a, b) => a[0][x] - b[0][x]);

    // vsegmentsets is a set of sets of segments grouped by x position
    const vsegmentsets = [];
    let segmentset: { pos: number; segments: any[] } | null = null;
    for (let i = 0; i < vsegments.length; i++) {
      const s = vsegments[i];
      if (!segmentset || Math.abs(s[0][x] - segmentset.pos) > 0.1) {
        segmentset = { pos: s[0][x], segments: [] };
        vsegmentsets.push(segmentset);
      }
      segmentset.segments.push(s);
    }
    return vsegmentsets;
  }

  // for all segments in this bundle create a vpsc problem such that
  // each segment's x position is a variable and separation constraints
  // are given by the partial order over the edges to which the segments belong
  // for each pair s1,s2 of segments in the open set:
  //   e1 = edge of s1, e2 = edge of s2
  //   if leftOf(e1,e2) create constraint s1.x + gap <= s2.x
  //   else if leftOf(e2,e1) create cons. s2.x + gap <= s1.x
  static nudgeSegs(
    x: keyof Point,
    y: string,
    routes: Point[][][],
    segments: any[],
    leftOf: (e1: number, e2: number) => boolean,
    gap: number
  ) {
    const n = segments.length;
    if (n <= 1) return;
    const vs = segments.map((s) => new Variable(s[0][x]));
    const cs = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        let s1 = segments[i],
          s2 = segments[j],
          e1 = s1.edgeid,
          e2 = s2.edgeid,
          lind = -1,
          rind = -1;
        // in page coordinates (not cartesian) the notion of 'leftof' is flipped in the horizontal axis from the vertical axis
        // that is, when nudging vertical segments, if they increase in the y(conj) direction the segment belonging to the
        // 'left' edge actually needs to be nudged to the right
        // when nudging horizontal segments, if the segments increase in the x direction
        // then the 'left' segment needs to go higher, i.e. to have y pos less than that of the right
        if (x == 'x') {
          if (leftOf(e1, e2)) {
            //console.log('s1: ' + s1[0][x] + ',' + s1[0][y] + '-' + s1[1][x] + ',' + s1[1][y]);
            if (s1[0][y] < s1[1][y]) {
              (lind = j), (rind = i);
            } else {
              (lind = i), (rind = j);
            }
          }
        } else {
          if (leftOf(e1, e2)) {
            if (s1[0][y] < s1[1][y]) {
              (lind = i), (rind = j);
            } else {
              (lind = j), (rind = i);
            }
          }
        }
        if (lind >= 0) {
          //console.log(x+' constraint: ' + lind + '<' + rind);
          cs.push(new Constraint(vs[lind], vs[rind], gap));
        }
      }
    }
    const solver = new Solver(vs, cs);
    solver.solve();
    vs.forEach((v, i) => {
      const s = segments[i];
      const pos = v.position();
      s[0][x] = s[1][x] = pos;
      const route = routes[s.edgeid];
      if (s.i > 0) route[s.i - 1][1][x] = pos;
      if (s.i < route.length - 1) route[s.i + 1][0][x] = pos;
    });
  }

  static nudgeSegments(
    routes: Point[][][],
    x: keyof Point,
    y: string,
    leftOf: (e1: number, e2: number) => boolean,
    gap: number
  ) {
    const vsegmentsets = WCGridRouter.getSegmentSets(routes, x, y);
    // scan the grouped (by x) segment sets to find co-linear bundles
    for (let i = 0; i < vsegmentsets.length; i++) {
      const ss = vsegmentsets[i];
      const events = [];
      for (let j = 0; j < ss.segments.length; j++) {
        const s = ss.segments[j];
        events.push({ type: 0, s: s, pos: Math.min(s[0][y], s[1][y]) });
        events.push({ type: 1, s: s, pos: Math.max(s[0][y], s[1][y]) });
      }
      events.sort((a, b) => a.pos - b.pos + a.type - b.type);
      // ADAMTodo
      let open: any[] = [];
      let openCount = 0;
      events.forEach((e) => {
        if (e.type === 0) {
          open.push(e.s);
          openCount++;
        } else {
          openCount--;
        }
        if (openCount == 0) {
          WCGridRouter.nudgeSegs(x, y, routes, open, leftOf, gap);
          open = [];
        }
      });
    }
  }

  // obtain routes for the specified edges, nicely nudged apart
  // warning: edge paths may be reversed such that common paths are ordered consistently within bundles!
  // @param edges list of edges
  // @param nudgeGap how much to space parallel edge segements
  // @param source function to retrieve the index of the source node for a given edge
  // @param target function to retrieve the index of the target node for a given edge
  // @returns an array giving, for each edge, an array of segments, each segment a pair of points in an array
  routeEdges<Edge>(
    edges: Edge[],
    nudgeGap: number,
    source: (e: Edge) => number,
    target: (e: Edge) => number
  ): Point[][][] {
    const routePaths = edges.map((e) => this.route(source(e), target(e)));
    const order = WCGridRouter.orderEdges(routePaths);
    const routes = routePaths.map(function (e) {
      return WCGridRouter.makeSegments(e);
    });
    WCGridRouter.nudgeSegments(routes, 'x', 'y', order, nudgeGap);
    WCGridRouter.nudgeSegments(routes, 'y', 'x', order, nudgeGap);
    WCGridRouter.unreverseEdges(routes, routePaths);
    return routes;
  }

  // path may have been reversed by the subsequence processing in orderEdges
  // so now we need to restore the original order
  static unreverseEdges(routes: Point[][][], routePaths: Point[][]) {
    routes.forEach((segments, i) => {
      const path = routePaths[i];
      if ((<any>path).reversed) {
        segments.reverse(); // reverse order of segments
        segments.forEach(function (segment) {
          segment.reverse(); // reverse each segment
        });
      }
    });
  }

  static angleBetween2Lines(line1: Point[], line2: Point[]): number {
    const angle1 = Math.atan2(line1[0].y - line1[1].y, line1[0].x - line1[1].x);
    const angle2 = Math.atan2(line2[0].y - line2[1].y, line2[0].x - line2[1].x);
    let diff = angle1 - angle2;
    if (diff > Math.PI || diff < -Math.PI) {
      diff = angle2 - angle1;
    }
    return diff;
  }

  // does the path a-b-c describe a left turn?
  private static isLeft(a: Point, b: Point, c: Point) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) <= 0;
  }

  // for the given list of ordered pairs, returns a function that (efficiently) looks-up a specific pair to
  // see if it exists in the list
  private static getOrder(
    pairs: { l: number; r: number }[]
  ): (l: number, r: number) => boolean {
    const outgoing: Record<number, any> = {};
    for (let i = 0; i < pairs.length; i++) {
      const p = pairs[i];
      if (typeof outgoing[p.l] === 'undefined') {
        outgoing[p.l] = {};
      }
      outgoing[p.l][p.r] = true;
    }
    return (l, r) => typeof outgoing[l] !== 'undefined' && outgoing[l][r];
  }

  // returns an ordering (a lookup function) that determines the correct order to nudge the
  // edge paths apart to minimize crossings
  static orderEdges(edges: Point[][]) {
    const edgeOrder = [];
    for (let i = 0; i < edges.length - 1; i++) {
      for (let j = i + 1; j < edges.length; j++) {
        const e = edges[i];
        const f: Point[] & { reversed?: boolean } = edges[j];
        let lcs = new LongestCommonSubsequence(e, f);
        let u: Point;
        let vi: Point;
        let vj: Point;
        if (lcs.length === 0) continue; // no common subpath
        if (lcs.reversed) {
          // if we found a common subpath but one of the edges runs the wrong way,
          // then reverse f.
          f.reverse();
          f.reversed = true;
          lcs = new LongestCommonSubsequence(e, f);
        }
        if (
          (lcs.si <= 0 || lcs.ti <= 0) &&
          (lcs.si + lcs.length >= e.length || lcs.ti + lcs.length >= f.length)
        ) {
          // the paths do not diverge, so make an arbitrary ordering decision
          edgeOrder.push({ l: i, r: j });
          continue;
        }
        if (
          lcs.si + lcs.length >= e.length ||
          lcs.ti + lcs.length >= f.length
        ) {
          // if the common subsequence of the
          // two edges being considered goes all the way to the
          // end of one (or both) of the lines then we have to
          // base our ordering decision on the other end of the
          // common subsequence
          u = e[lcs.si + 1];
          vj = e[lcs.si - 1];
          vi = f[lcs.ti - 1];
        } else {
          u = e[lcs.si + lcs.length - 2];
          vi = e[lcs.si + lcs.length];
          vj = f[lcs.ti + lcs.length];
        }
        if (WCGridRouter.isLeft(u, vi, vj)) {
          edgeOrder.push({ l: j, r: i });
        } else {
          edgeOrder.push({ l: i, r: j });
        }
      }
    }
    //edgeOrder.forEach(function (e) { console.log('l:' + e.l + ',r:' + e.r) });
    return WCGridRouter.getOrder(edgeOrder);
  }

  // for an orthogonal path described by a sequence of points, create a list of segments
  // if consecutive segments would make a straight line they are merged into a single segment
  // segments are over cloned points, not the original vertices
  static makeSegments(path: Point[]): Point[][] {
    function copyPoint(p: Point) {
      return <Point>{ x: p.x, y: p.y };
    }
    const isStraight = (a: Point, b: Point, c: Point) =>
      Math.abs((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) < 0.001;
    const segments = [];
    let a = copyPoint(path[0]);
    for (let i = 1; i < path.length; i++) {
      const b = copyPoint(path[i]),
        c = i < path.length - 1 ? path[i + 1] : null;
      if (!c || !isStraight(a, b, c)) {
        segments.push([a, b]);
        a = b;
      }
    }
    return segments;
  }

  // find a route between node s and node t
  // returns an array of indices to verts
  route(s: number, t: number): Point[] {
    const source = this.nodes[s],
      target = this.nodes[t];
    this.obstacles = this.siblingObstacles(source, target);

    const obstacleLookup: Record<number | string, any> = {};
    this.obstacles.forEach((o) => (obstacleLookup[o.id] = o));
    this.passableEdges = this.edges.filter((e) => {
      const u = this.verts[e.source],
        v = this.verts[e.target];
      return !(
        (u.node && u.node.id in obstacleLookup) ||
        (v.node && v.node.id in obstacleLookup)
      );
    });

    // ADAMTodo: how do they guarantee each node will have one or more ports? It does not follow for me. It errors sometimes too.

    // add dummy segments linking ports inside source and target
    for (var i = 1; i < source.ports.length; i++) {
      var u = source.ports[0].id;
      var v = source.ports[i].id;
      this.passableEdges.push({
        source: u,
        target: v,
        length: 0,
      });
    }
    for (var i = 1; i < target.ports.length; i++) {
      var u = target.ports[0].id;
      var v = target.ports[i].id;
      this.passableEdges.push({
        source: u,
        target: v,
        length: 0,
      });
    }

    const getSource = (e: WCEdge) => e.source;
    const getTarget = (e: WCEdge) => e.target;
    const getLength = (e: WCEdge) => e.length;

    const shortestPathCalculator = new Calculator(
      this.verts.length,
      this.passableEdges,
      getSource,
      getTarget,
      getLength
    );

    const bendPenalty = (u: number, v: number, w: number) => {
      const a = this.verts[u],
        b = this.verts[v],
        c = this.verts[w];
      const dx = Math.abs(c.x - a.x),
        dy = Math.abs(c.y - a.y);
      // don't count bends from internal node edges
      if (
        (a.node === source && a.node === b.node) ||
        (b.node === target && b.node === c.node)
      )
        return 0;
      return dx > 1 && dy > 1 ? 1000 : 0;
    };

    // ADAMTodo: how do they guarantee each node will have one or more ports? It does not follow for me. It errors sometimes too.
    // let's be safe here
    // get shortest path
    if (source.ports.length < 1 || target.ports.length < 1) {
      console.warn(
        'ADAMWarning: a Webcola.GridRouter error is about to occur when reading "source" and "target" nodes. The ports were not constructed properly. What does it mean?',
        { source, target }
      );
    }
    const shortestPath = shortestPathCalculator.PathFromNodeToNodeWithPrevCost(
      source.ports[0].id,
      target.ports[0].id,
      bendPenalty
    );

    // shortest path is reversed and does not include the target port
    const pathPoints = shortestPath.reverse().map((vi) => this.verts[vi]);
    pathPoints.push(this.nodes[target.id].ports[0]);

    // filter out any extra end points that are inside the source or target (i.e. the dummy segments above)
    return pathPoints.filter(
      (v, i) =>
        !(
          (i < pathPoints.length - 1 &&
            pathPoints[i + 1].node === source &&
            v.node === source) ||
          (i > 0 && v.node === target && pathPoints[i - 1].node === target)
        )
    );
  }

  static getRoutePath(
    route: Point[][],
    cornerradius: number,
    arrowwidth: number,
    arrowheight: number
  ): { routepath: string; arrowpath: string } {
    const result = {
      routepath: 'M ' + route[0][0].x + ' ' + route[0][0].y + ' ',
      arrowpath: '',
    };
    if (route.length > 1) {
      for (let i = 0; i < route.length; i++) {
        var li = route[i];
        var x = li[1].x,
          y = li[1].y;
        var dx = x - li[0].x;
        var dy = y - li[0].y;
        if (i < route.length - 1) {
          if (Math.abs(dx) > 0) {
            x -= (dx / Math.abs(dx)) * cornerradius;
          } else {
            y -= (dy / Math.abs(dy)) * cornerradius;
          }
          result.routepath += 'L ' + x + ' ' + y + ' ';
          const l = route[i + 1];
          const x0 = l[0].x,
            y0 = l[0].y;
          const x1 = l[1].x;
          const y1 = l[1].y;
          dx = x1 - x0;
          dy = y1 - y0;
          const angle = WCGridRouter.angleBetween2Lines(li, l) < 0 ? 1 : 0;
          //console.log(cola.WCGridRouter.angleBetween2Lines(li, l))
          var x2, y2;
          if (Math.abs(dx) > 0) {
            x2 = x0 + (dx / Math.abs(dx)) * cornerradius;
            y2 = y0;
          } else {
            x2 = x0;
            y2 = y0 + (dy / Math.abs(dy)) * cornerradius;
          }
          const cx = Math.abs(x2 - x);
          const cy = Math.abs(y2 - y);
          result.routepath +=
            'A ' + cx + ' ' + cy + ' 0 0 ' + angle + ' ' + x2 + ' ' + y2 + ' ';
        } else {
          var arrowtip = [x, y];
          var arrowcorner1, arrowcorner2;
          if (Math.abs(dx) > 0) {
            x -= (dx / Math.abs(dx)) * arrowheight;
            arrowcorner1 = [x, y + arrowwidth];
            arrowcorner2 = [x, y - arrowwidth];
          } else {
            y -= (dy / Math.abs(dy)) * arrowheight;
            arrowcorner1 = [x + arrowwidth, y];
            arrowcorner2 = [x - arrowwidth, y];
          }
          result.routepath += 'L ' + x + ' ' + y + ' ';
          if (arrowheight > 0) {
            result.arrowpath =
              'M ' +
              arrowtip[0] +
              ' ' +
              arrowtip[1] +
              ' L ' +
              arrowcorner1[0] +
              ' ' +
              arrowcorner1[1] +
              ' L ' +
              arrowcorner2[0] +
              ' ' +
              arrowcorner2[1];
          }
        }
      }
    } else {
      var li = route[0];
      var x = li[1].x,
        y = li[1].y;
      var dx = x - li[0].x;
      var dy = y - li[0].y;
      var arrowtip = [x, y];
      var arrowcorner1, arrowcorner2;
      if (Math.abs(dx) > 0) {
        x -= (dx / Math.abs(dx)) * arrowheight;
        arrowcorner1 = [x, y + arrowwidth];
        arrowcorner2 = [x, y - arrowwidth];
      } else {
        y -= (dy / Math.abs(dy)) * arrowheight;
        arrowcorner1 = [x + arrowwidth, y];
        arrowcorner2 = [x - arrowwidth, y];
      }
      result.routepath += 'L ' + x + ' ' + y + ' ';
      if (arrowheight > 0) {
        result.arrowpath =
          'M ' +
          arrowtip[0] +
          ' ' +
          arrowtip[1] +
          ' L ' +
          arrowcorner1[0] +
          ' ' +
          arrowcorner1[1] +
          ' L ' +
          arrowcorner2[0] +
          ' ' +
          arrowcorner2[1];
      }
    }
    return result;
  }
}
