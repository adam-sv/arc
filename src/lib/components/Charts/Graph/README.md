# Graph

## Hacky points:

- scaledPadding
  - Rendering nested "node" contexts makes it difficult to use `xScale` and `yScale`, since the built-in padding projects us past 0 usually
  - Accordingly we render a `<g>` that transforms us back by the scaledPadding
-
