# ChartContainer

Last updated: @adam-sv/arc@1.0.0-rc.31

ARC's ChartContainer is meant to provide:
* an SVG context with large amounts of math done for you
* zoom & pan
* virtualized synchronized scroll between content and axes

To that end, it provides sizing primitives:
* Listens to CSS-provided height for responsive behavior
* minHeight / maxHeight for the whole chart can be controlled
* axis control
   * left / top / right / bottom axes
   * each can be resized with optional `resizeLeftRightAxis` or `resizeTopBottomAxis` props, resize bar size can be controlled too
   * renderers for each axis + correctly zoomed SVG space to make text behave more like HTML
* automatic coordinate space computation for content & axes so you can forget about pixel space manipulation
* automatic offset / centering when zoom results in 1 visual dimension not being as big as the pixel space
* automatically listens on window resize events to update

## Usage Directions

You can provide a minimum coordinate space you want in the X or Y dimension or both.

For example, when drawing a vertical bar chart (i.e. the bar's height represents some value) (see `Bar` implementation)
* you can be responsive to the height of the pixel space as your coordinate range assuming it's at least some mim height
* in the width dimension, you can be responsive, but you may want to ensure your bars are at least 10px wide. You can provide the coordinate range based on `size of your data set * (10px + any padding you want)`, and use the `stretchToFillWidth` prop to decide if you will draw at exactly `10px` wide bars (not stretched) OR at the wider of `10px` and `pixelSpace.width / dataset.length` (stretched)
* Use the `fits-height` for this case - you will fit to the height, but will control the width
* Set min-zoom and max-zoom to 1 - there isn't a great meaning of zoom here

For example, when drawing a gantt chart (or a fixed-height-row horizontal bar chart) (see `Gantt` implementation)
* you can be responsive to the width of the pixel space as your default coordinate range (width is automatically 100% of the available space, so you are responsible for drawing this in a sufficiently wide parent component)
* you want to render each bar / row at a fixed height, so you have a min and max height to draw
   * `minTotalHeight` and `maxTotalHeight` props should be used
   * `minTotalHeight` should be set to the `# of rows at min to display * row height + height of top + bottom axis`
   * `maxTotalHeight` should be set to the `# of rows in dataset * row height + height of top + bottom axis`
* Use the `fits-width` for this case - you will fit to the width, but will control the height
* Use the `onlyZoomX` prop to prevent zooming the height but allow more granular look at how dates align

For example, when drawing a graph (i.e. you have positioned objects in some bounding box) (see `Graph` implementation)
* you have a fixed coordinate space you will provide
* you may want to match the pixel space to treat your coordinate space as pixels, or be as wide as the coordinate space, or be as tall as the coordinate space
* you want zoom & pan to be centered properly when you zoom out too far

More use-cases can be added over time. `Responsive` mode will also work for any 2D birds-eye-view style visualization.
