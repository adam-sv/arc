// dependencies
import { useContext } from "react";
import { ScaleBand } from "d3";
import { cn } from "@adam-sv/arc";
// internals
import { ChartComponentContext, Grid } from "@adam-sv/arc";
// style
import "./style.scss";
// types

export interface ISwimLaneAxisProps {
  textOffset?: number;
  scale: ScaleBand<string>;
  useAngledApproach?: boolean;
}

export const SwimLanes = ({
  scale,
  textOffset = 12,
  useAngledApproach,
}: ISwimLaneAxisProps) => {
  const chartComponentState = useContext(ChartComponentContext);
  if (!chartComponentState) return null;

  // how are we rendering?
  const { component } = chartComponentState;
  const isVertical = ["left", "right"].includes(component);
  // how much space do we have?
  const heightOrWidth = scale.range()[1];
  const laneSize = scale.bandwidth();
  const halfLaneSize = laneSize / 2;
  // labels / swimlanes we'll render
  const labels = scale.domain();
  const positions = labels.map((label) => scale(label) ?? 0);

  return (
    <g className={cn("SwimLaneAxis", `SwimLaneAxis-${component}`)}>
      {/* Text */}
      {labels.map((label, i) =>
        isVertical ? (
          <text
            key={i}
            x={component === "left" ? textOffset : heightOrWidth - textOffset}
            y={positions[i] + halfLaneSize}
          >
            {label}
          </text>
        ) : (
          <text
            className="AngledText"
            key={i}
            x={positions[i] + halfLaneSize}
            y={component === "bottom" ? textOffset : textOffset}
          >
            {label}
          </text>
        )
      )}
      {/* Grid */}
      {isVertical ? (
        <Grid xTicks={[]} yTicks={positions.concat(heightOrWidth)} />
      ) : (
        labels.map((label, i) => (
          <line
            x1={positions[i] + halfLaneSize}
            x2={positions[i] + halfLaneSize}
            y1={0}
            y2={5}
          />
        ))
      )}
    </g>
  );
};
