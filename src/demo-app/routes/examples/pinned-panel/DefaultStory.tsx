import { useRef, useState, type JSX } from 'react';
import {
  PinnedPanel,
  Panel,
  Toggle,
  CheckboxGroup,
  FloatingPanelAnchorDirection,
} from '@adam-sv/arc';
import './style.scss';

export const DefaultPinnedPanelStory = (): JSX.Element => {
  const [pinnedPanelOpen, setPinnedPanelOpen] = useState(true);
  const [showArrow, setShowArrow] = useState(true);
  const [anchor, setAnchor] = useState<
    FloatingPanelAnchorDirection | undefined
  >('top');
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div className='DefaultPinnedPanelStory'>
      <Panel domRef={panelRef}>
        <Toggle
          labelPosition='horizontal'
          value={pinnedPanelOpen}
          onChange={(v) => {
            setPinnedPanelOpen(v);
            if (!anchor) setAnchor('top');
          }}
          label='Show or Hide Pinned Panel'
        />
        <Toggle
          labelPosition='horizontal'
          value={showArrow}
          onChange={setShowArrow}
          label='Show or Hide Arrow'
        />
        <CheckboxGroup
          onChange={(items, clickedItem) => {
            setAnchor(clickedItem?.key as FloatingPanelAnchorDirection);
          }}
          items={[
            {
              value: anchor === 'top-left',
              label: 'Top Left',
              key: 'top-left',
            },
            { value: anchor === 'top', label: 'Top', key: 'top' },
            {
              value: anchor === 'top-right',
              label: 'Top Right',
              key: 'top-right',
            },
            { value: anchor === 'right', label: 'Right', key: 'right' },
            {
              value: anchor === 'bottom-right',
              label: 'Bottom Right',
              key: 'bottom-right',
            },
            { value: anchor === 'bottom', label: 'Bottom', key: 'bottom' },
            {
              value: anchor === 'bottom-left',
              label: 'Bottom Left',
              key: 'bottom-left',
            },
            { value: anchor === 'left', label: 'Left', key: 'left' },
          ]}
          isExclusive
        />
        <PinnedPanel
          element={panelRef.current}
          isOpen={pinnedPanelOpen}
          anchor={anchor}
          onClick={() => {
            setPinnedPanelOpen(false);
          }}
          showArrow={showArrow}
          className='DefaultPinnedPanelStory-PinnedPanel'
        >
          <h2>Pinned Panel</h2>
          <p>Anchor has been set to: {anchor}</p>
          <p>Press the toggle to close, or click me to dismiss!</p>
        </PinnedPanel>
      </Panel>
    </div>
  );
};
