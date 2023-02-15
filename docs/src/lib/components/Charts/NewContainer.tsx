function MyChart(props: MyChartProps) {
  const context = useChartContext();

  return (
    <ChartContainer context={context}>
      <Left>
        <YAxisSwimLanes position='left' />
      </Left>
      <ContentColumn>
        <Top>
          <XAxisTicks />
        </Top>
        <Content>
          <g className='MyChart-Data'>
            {data.map((d) => (
              <GanttData datum={d} />
            ))}
          </g>
        </Content>
        <Bottom>
          <XAxisTicks />
        </Bottom>
      </ContentColumn>
    </ChartContainer>
  );
}
