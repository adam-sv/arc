import { CSSProperties, ReactNode } from "react";
import {
  ChartBase,
  ChartComponents,
  cn,
  Grid,
  ICoords,
  MouseOver,
  TickAxis,
} from "@adam-sv/arc";
import { useScatterPlotLogic } from "./logic";
import "./style.scss";

const { Left, Bottom, Content } = ChartComponents;

export interface IScatterPlotDatum<T> {
  x: number;
  y: number;
  z?: number;
  className?: string;
  data: T;
  style?: CSSProperties;
  handlers?: Partial<React.SVGProps<SVGRectElement>>;
}

export interface IScatterPlotProps<T> {
  data: Array<IScatterPlotDatum<T>>;
  // Mouseover
  getMouseOverContent?: (d: IScatterPlotDatum<T>) => ReactNode;
  // Configurations
  className?: string;
  domainPadding?: ICoords;
  minHeight?: number;
}

export function ScatterPlot<T>(props: IScatterPlotProps<T>) {
  const { className, getMouseOverContent } = props;
  const {
    chartState,
    data,
    xScale,
    yScale,
    colorScale,
    mouseInfo,
    x,
    y,
    getMouseoverHandlers,
  } = useScatterPlotLogic(props);

  return (
    <>
      <ChartBase
        chartState={chartState}
        className={cn("ScatterPlot", className)}
      >
        <Left label={"Cycle Time (IM)"}>
          <TickAxis scale={yScale} numberTicks={y.ticks.length} />
        </Left>
        <Bottom label={"Number of Workers"}>
          <TickAxis scale={xScale} numberTicks={x.ticks.length} />
        </Bottom>
        <Content>
          <Grid xTicks={x.ticks} yTicks={y.ticks} />
          {data.map((d, i) => {
            const xPos = xScale(d.x);
            const yPos = yScale(d.y);
            const color = d.z ? colorScale(d.z) : undefined;
            const dataSize = 10;
            const dataOffset = dataSize / 2;

            return (
              <rect
                key={i}
                {...d.handlers}
                {...getMouseoverHandlers(d)}
                style={d.style}
                className={cn("ScatterPlot-datum", d.className)}
                x={xPos - dataOffset}
                y={yPos - dataOffset}
                fill={color}
                width={dataSize}
                height={dataSize}
              />
            );
          })}
        </Content>
      </ChartBase>
      {mouseInfo && getMouseOverContent && (
        <MouseOver
          location={{
            top: mouseInfo.top,
            left: mouseInfo.left,
          }}
          horizontalSpaceAwayFromTrigger={5}
          verticalSpaceAwayFromTrigger={5}
          positionRelativeToTrigger={"Above"}
          shouldRender={Boolean(mouseInfo)}
          triggerPosition={{
            top: mouseInfo.top,
            left: mouseInfo.left,
          }}
          portalTargetElement={document.getElementById("root")}
        >
          <div>{getMouseOverContent(mouseInfo.bar)}</div>
        </MouseOver>
      )}
    </>
  );
}
