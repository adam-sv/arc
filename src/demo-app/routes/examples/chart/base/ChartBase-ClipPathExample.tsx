import {
  ChartBase,
  ChartComponents,
  Panel,
  Title,
  Toggle,
  useChartState,
} from '@adam-sv/arc';
import type { ClipPlace, ClipType, ClipTypes } from '@adam-sv/arc';
import './style.scss';
import { Dispatch, SetStateAction, useState, type JSX } from 'react';

const { Bottom, Content, Left, Right, Top } = ChartComponents;

const clipOptions: ClipType[] = ['diag', 'long', 'short'];

const SideChoices = ({
  side,
  clipTypes,
  setClipTypes,
}: {
  side: ClipPlace;
  clipTypes: Record<ClipPlace, ClipTypes>;
  setClipTypes: Dispatch<SetStateAction<Record<ClipPlace, ClipTypes>>>;
}) => {
  const choices: ClipPlace[] =
    side === 'left' || side === 'right' ? ['top', 'bottom'] : ['left', 'right'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>{side}</h3>
      {choices.map((c) => (
        <label key={c}>
          {c}:
          <select
            value={clipTypes[side][c] ?? 'diag'}
            onChange={(e) => {
              setClipTypes((prev) => ({
                ...prev,
                [side]: { ...prev[side], [c]: e.target.value },
              }));
            }}
          >
            {clipOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
};
const initialTypes: Record<ClipPlace, ClipTypes> = {
  top: { left: 'short', right: 'diag' },
  left: { top: 'short', bottom: 'long' },
  bottom: { left: 'short', right: 'long' },
  right: { top: 'diag', bottom: 'long' },
};
export function ChartBaseClipPathExample(): JSX.Element {
  const [clipTypes, setClipTypes] =
    useState<Record<ClipPlace, ClipTypes>>(initialTypes);
  const [borderShown, setBorderShown] = useState(false);
  const chartState = useChartState({
    axisSettings: {
      sizes: {
        left: 80,
        top: 80,
        right: 40,
        bottom: 40,
      },
      minimumSizes: {
        top: 20,
        bottom: 20,
      },
      maximumSizes: {
        top: 100,
        bottom: 100,
      },
    },
    contentSizing: {
      mode: 'fits-width',
      controlledDimensionSize: 4000,
      minContentHeight: 120,
    },
    zoomSettings: {
      value: 2,
      min: 1,
      max: 10,
      axes: 'x',
    },
  });

  return (
    <>
      <Panel className='choices' style={{ padding: 0 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '3rem',
            padding: '1rem',
          }}
        >
          {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
            <SideChoices
              side={side}
              key={side}
              clipTypes={clipTypes}
              setClipTypes={setClipTypes}
            />
          ))}
          <button
            onClick={() => {
              setClipTypes({
                top: {},
                left: {},
                bottom: {},
                right: {},
              });
            }}
          >
            Reset to Diag
          </button>
          <button
            onClick={() => {
              setClipTypes({
                top: { left: 'short', right: 'short' },
                left: { top: 'short', bottom: 'short' },
                bottom: { left: 'short', right: 'short' },
                right: { top: 'short', bottom: 'short' },
              });
            }}
          >
            All Short
          </button>
          <button
            onClick={() => {
              setClipTypes(initialTypes);
            }}
          >
            Reset Original
          </button>
          <Toggle
            label='Show Mask Border'
            value={borderShown}
            onChange={(show) => {
              setBorderShown(show);
            }}
            labelPosition='vertical'
          />
        </div>
      </Panel>
      <Panel className='ChartBaseExample' style={{ padding: 0 }}>
        <ChartBase chartState={chartState}>
          <Left
            label={<Title style={{ margin: 0 }}>Left Axis</Title>}
            showScrollBars
            className='ClipLeft'
            clipTypes={clipTypes.left}
            showCornerMaskBorder={borderShown}
          ></Left>
          <Top
            label='Top Axis'
            className='ClipTop'
            clipTypes={clipTypes.top}
            showCornerMaskBorder={borderShown}
          />
          <Content showScrollBars={false} />
          <Bottom
            label='Bottom Axis'
            showScrollBars
            className='ClipBottom'
            clipTypes={clipTypes.bottom}
            showCornerMaskBorder={borderShown}
          />
          <Right
            label='Right Axis'
            className='ClipRight'
            clipTypes={clipTypes.right}
            showCornerMaskBorder={borderShown}
          />
        </ChartBase>
      </Panel>
    </>
  );
}
