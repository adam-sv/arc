"use strict";
import { GridRouter, Rectangle } from 'webcola';

Rectangle.prototype.toDOMRect = function() {
    return new DOMRect(
        this.x,
        this.y,
        this.X - this.x,
        this.Y - this.y,
    );
}

GridRouter.prototype.avg = function (a) { return a.reduce(function (x, y) { return x + y; }, 0) / a.length; };
GridRouter.prototype.clamp = function (val, min, max) {
    if (val < min) {
        return min;
    } else if (val > max) {
        return max;
    }
    return val;
};
GridRouter.prototype.getGridLines = function (axis) {
    var columns = [];
    var ls = this.leaves.slice(0, this.leaves.length);
    while (ls.length > 0) {
        var overlapping = ls.filter(function (v) { return v.rect['overlap' + axis.toUpperCase()](ls[0].rect); });
        var col = {
            nodes: overlapping,
            pos: this.clamp(
                this.avg(overlapping.map(function (v) { return v.rect['c' + axis](); })),
                ls[0].rect[axis],
                ls[0].rect[axis.toUpperCase()],
            ),
        };
        columns.push(col);
        col.nodes.forEach(function (v) { return ls.splice(ls.indexOf(v), 1); });
    }
    columns.sort(function (a, b) { return a.pos - b.pos; });
    return columns;
};
GridRouter.prototype.getDepth = function (v) {
    var depth = 0;
    while (v.parent !== this.root) {
        depth++;
        v = v.parent;

        if (depth > this.nodes.length) {
            throw new Error(`GridRouter.getDepth looked at more nodes than there are in the graph to determine depth of ${v.id}. @adam-sv/arc dev guesses: your graph is malformed. Node: ${JSON.stringify(v)}, depth searched: ${depth}`);
        }
    }
    return depth;
};

export { GridRouter, Rectangle };
