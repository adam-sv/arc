import React, { useState } from 'react';
import { FloatingPanel, Panel, Toggle } from '@adam-sv/arc';
import { useWindowDimensions } from '@adam-sv/arc';

const MARGIN_PX = 20;

export const DefaultFloatingPanelStory = (): JSX.Element => {
  const [panel1Open, setPanel1Open] = useState(false);
  const [panel2Open, setPanel2Open] = useState(false);
  const [panel3Open, setPanel3Open] = useState(false);
  const [panel4Open, setPanel4Open] = useState(false);
  const [panel5Open, setPanel5Open] = useState(false);
  const [panel6Open, setPanel6Open] = useState(false);
  const [panel7Open, setPanel7Open] = useState(false);
  const [panel8Open, setPanel8Open] = useState(false);
  const [panel9Open, setPanel9Open] = useState(false);
  const windowDimensions = useWindowDimensions();

  return (
    <Panel>
      <Toggle
        labelPosition='horizontal'
        value={panel1Open}
        onChange={setPanel1Open}
        label='Top Left Floating Panel'
      />
      <Toggle
        labelPosition='horizontal'
        value={panel2Open}
        onChange={setPanel2Open}
        label='Top Right Floating Panel'
      />
      <Toggle
        labelPosition='horizontal'
        value={panel3Open}
        onChange={setPanel3Open}
        label='Bottom Left Floating Panel'
      />
      <Toggle
        labelPosition='horizontal'
        value={panel4Open}
        onChange={setPanel4Open}
        label='Bottom Right Floating Panel'
      />
      <Toggle
        labelPosition='horizontal'
        value={panel5Open}
        onChange={setPanel5Open}
        label='Top Floating Panel'
      />
      <Toggle
        labelPosition='horizontal'
        value={panel6Open}
        onChange={setPanel6Open}
        label='Right Floating Panel'
      />
      <Toggle
        labelPosition='horizontal'
        value={panel7Open}
        onChange={setPanel7Open}
        label='Bottom Floating Panel'
      />
      <Toggle
        labelPosition='horizontal'
        value={panel8Open}
        onChange={setPanel8Open}
        label='Left Floating Panel'
      />
      <Toggle
        labelPosition='horizontal'
        value={panel9Open}
        onChange={setPanel9Open}
        label='Center Floating Panel'
      />
      <FloatingPanel
        x={MARGIN_PX}
        y={MARGIN_PX}
        isOpen={panel1Open}
        onClick={() => setPanel1Open(false)}
      >
        <h2>Panel 1 - Top Left</h2>
        <p>
          Press the toggle corresponding to this panel to close, or click me to
          dismiss!!
        </p>
      </FloatingPanel>
      <FloatingPanel
        x={windowDimensions.width - MARGIN_PX}
        y={MARGIN_PX}
        style={{ width: 'MARGIN_PX0px' }}
        isOpen={panel2Open}
        anchor='top-right'
        onClick={() => setPanel2Open(false)}
      >
        <h2>Panel 2 - Top Right</h2>
        <p>
          Press the toggle corresponding to this panel to close, or click me to
          dismiss!!
        </p>
      </FloatingPanel>
      <FloatingPanel
        x={MARGIN_PX}
        y={windowDimensions.height - MARGIN_PX}
        isOpen={panel3Open}
        anchor='bottom-left'
        onClick={() => setPanel3Open(false)}
      >
        <h2>Panel 3 - Bottom Left</h2>
        <p>
          Press the toggle corresponding to this panel to close, or click me to
          dismiss!!
        </p>
      </FloatingPanel>
      <FloatingPanel
        y={windowDimensions.height - MARGIN_PX}
        x={windowDimensions.width - MARGIN_PX}
        isOpen={panel4Open}
        anchor='bottom-right'
        onClick={() => setPanel4Open(false)}
      >
        <h2>Panel 4 - Bottom Right</h2>
        <p>
          Press the toggle corresponding to this panel to close, or click me to
          dismiss!!
        </p>
      </FloatingPanel>
      <FloatingPanel
        x={windowDimensions.width / 2}
        y={MARGIN_PX}
        isOpen={panel5Open}
        anchor='top'
        onClick={() => setPanel5Open(false)}
      >
        <h2>Panel 5 - Top</h2>
        <p>
          Press the toggle corresponding to this panel to close, or click me to
          dismiss!!
        </p>
      </FloatingPanel>
      <FloatingPanel
        x={windowDimensions.width - MARGIN_PX}
        y={windowDimensions.height / 2}
        style={{ width: 'MARGIN_PX0px' }}
        isOpen={panel6Open}
        anchor='right'
        onClick={() => setPanel6Open(false)}
      >
        <h2>Panel 6 - Right</h2>
        <p>
          Press the toggle corresponding to this panel to close, or click me to
          dismiss!!
        </p>
      </FloatingPanel>
      <FloatingPanel
        x={windowDimensions.width / 2}
        y={windowDimensions.height - MARGIN_PX}
        isOpen={panel7Open}
        anchor='bottom'
        onClick={() => setPanel7Open(false)}
      >
        <h2>Panel 3 - Bottom</h2>
        <p>
          Press the toggle corresponding to this panel to close, or click me to
          dismiss!!
        </p>
      </FloatingPanel>
      <FloatingPanel
        y={windowDimensions.height / 2}
        x={MARGIN_PX}
        isOpen={panel8Open}
        anchor='left'
        onClick={() => setPanel8Open(false)}
      >
        <h2>Panel 8 - Left</h2>
        <p>
          Press the toggle corresponding to this panel to close, or click me to
          dismiss!!
        </p>
      </FloatingPanel>
      <FloatingPanel
        y={windowDimensions.height / 2}
        x={windowDimensions.width / 2}
        isOpen={panel9Open}
        anchor='center'
        onClick={() => setPanel9Open(false)}
      >
        <h2>Panel 9 - Center</h2>
        <p>
          Press the toggle corresponding to this panel to close, or click me to
          dismiss!!
        </p>
      </FloatingPanel>
    </Panel>
  );
};
