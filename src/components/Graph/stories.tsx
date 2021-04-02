// dependencies
import { Graph, LogicalArcGraph } from '@adam-sv/arc';
import { storiesOf } from '@storybook/react';
import React, { CSSProperties, useState } from 'react';
import { useStateIterator } from 'src/hooks/useStateIterator';
import { IBoxSize } from 'src/types';
import { StoryContainer as Story } from '../../utils/StoryContainer';
// story style
import './story_assets/storyStyle.css';

const graphStoryStyle: CSSProperties = {
  width: '1000px',
  maxWidth: 'calc(100vw - 20px)',
  minHeight: '400px',
  background: 'var(--surface)',
  display: 'flex',
  flexDirection: 'column',
};

const graph = new LogicalArcGraph(
  [
    { id: 0, label: 'Zero', parentId: null, position: { x: 0, y: 0 } },
    { id: 1, label: 'One', parentId: null, position: { x: 250, y: 100 } },
    { id: 2, label: 'Two', parentId: null, position: { x: 500, y: 0 } },
    { id: 3, label: 'Three', parentId: null, position: { x: 750, y: 100 } },
    { id: 5, label: 'Five', parentId: null, position: { x: 750, y: 220 } },
    { id: 6, label: 'Six', parentId: null, position: { x: 250, y: 320 } },
  ],
  [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 5 },
    { from: 5, to: 6 },
  ],
);

const nestedGraph = new LogicalArcGraph(
  [
    {
      "id": "SourceNode",
      "label": "SourceNode",
      "parentId": null,
      "size": {
        "width": 180,
        "height": 80
      },
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "SourceNode::Dossier",
      "label": "Dossier",
      "parentId": "SourceNode",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object1",
      "label": "Object1",
      "parentId": null,
      "size": {
        "width": 220,
        "height": 100
      },
      "position": {
        "x": 1100,
        "y": 0
      }
    },
    {
      "id": "Object1::property1",
      "label": "property1",
      "parentId": "Object1",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object1::Dossier",
      "label": "Dossier",
      "parentId": "Object1",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object1::property2",
      "label": "property2",
      "parentId": "Object1",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object1::excel",
      "label": "excel",
      "parentId": "Object1",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object1::csv",
      "label": "csv",
      "parentId": "Object1",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object2",
      "label": "Object2",
      "parentId": null,
      "size": {
        "width": 220,
        "height": 120
      },
      "position": {
        "x": 520,
        "y": 60
      }
    },
    {
      "id": "Object2::Remap",
      "label": "Remap",
      "parentId": "Object2",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object2::Calculate",
      "label": "Calculate",
      "parentId": "Object2",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object2::CalculateParallel",
      "label": "CalculateParallel",
      "parentId": "Object2",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object2::Dossier",
      "label": "Dossier",
      "parentId": "Object2",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object2::Summaries",
      "label": "Summaries",
      "parentId": "Object2",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object2::property3",
      "label": "property3",
      "parentId": "Object2",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object2::property4",
      "label": "property4",
      "parentId": "Object2",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object2::property5",
      "label": "property5",
      "parentId": "Object2",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object2::files",
      "label": "files",
      "parentId": "Object2",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object3",
      "label": "Object3",
      "parentId": null,
      "size": {
        "width": 180,
        "height": 80
      },
      "position": {
        "x": 260,
        "y": 80
      }
    },
    {
      "id": "Object3::path",
      "label": "path",
      "parentId": "Object3",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object3::Dossier",
      "label": "Dossier",
      "parentId": "Object3",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object4",
      "label": "Object4",
      "parentId": null,
      "size": {
        "width": 200,
        "height": 80
      },
      "position": {
        "x": 820,
        "y": 80
      }
    },
    {
      "id": "Object4::Dossier",
      "label": "Dossier",
      "parentId": "Object4",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object4::files",
      "label": "files",
      "parentId": "Object4",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object4::property5",
      "label": "property5",
      "parentId": "Object4",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object4::property1",
      "label": "property1",
      "parentId": "Object4",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object6",
      "label": "Object6",
      "parentId": null,
      "size": {
        "width": 180,
        "height": 80
      },
      "position": {
        "x": 1100,
        "y": 160
      }
    },
    {
      "id": "Object6::property5",
      "label": "property5",
      "parentId": "Object6",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object6::Dossier",
      "label": "Dossier",
      "parentId": "Object6",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Object6::property6",
      "label": "property6",
      "parentId": "Object6",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Toggles",
      "label": "Toggles",
      "parentId": null,
      "size": {
        "width": 180,
        "height": 100
      },
      "position": {
        "x": 0,
        "y": 140
      }
    },
    {
      "id": "Toggles::Calculate",
      "label": "Calculate",
      "parentId": "Toggles",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Toggles::CalculateParallel",
      "label": "CalculateParallel",
      "parentId": "Toggles",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "Toggles::Remap",
      "label": "Remap",
      "parentId": "Toggles",
      "role": "output",
      "size": {
        "width": 180,
        "height": 80
      }
    },
    {
      "id": "output",
      "label": "Outputs",
      "parentId": null,
      "size": {
        "width": 180,
        "height": 80
      },
      "position": {
        "x": 1400,
        "y": 80
      }
    },
    {
      "id": "output::results",
      "label": "csv",
      "parentId": "output",
      "role": "input",
      "size": {
        "width": 180,
        "height": 80
      }
    }
  ],
  [
    {
      "from": "Object4::property1",
      "to": "Object1::property1"
    },
    {
      "from": "Object3::Dossier",
      "to": "Object1::Dossier"
    },
    {
      "from": "Toggles::Remap",
      "to": "Object2::Remap"
    },
    {
      "from": "Toggles::Calculate",
      "to": "Object2::Calculate"
    },
    {
      "from": "Toggles::CalculateParallel",
      "to": "Object2::CalculateParallel"
    },
    {
      "from": "Object3::Dossier",
      "to": "Object2::Dossier"
    },
    {
      "from": "SourceNode::Dossier",
      "to": "Object3::path"
    },
    {
      "from": "Object3::Dossier",
      "to": "Object4::Dossier"
    },
    {
      "from": "Object2::files",
      "to": "Object4::files"
    },
    {
      "from": "Object4::property5",
      "to": "Object6::property5"
    },
    {
      "from": "Object3::Dossier",
      "to": "Object6::Dossier"
    },
    {
      "from": "Object1::csv",
      "to": "output::results"
    }
  ],
);

const nodeActions = {
  onClick: (e, node) => console.log('onClick', node),
  onDoubleClick: (e, node) => console.log('onDoubleClick', node),
  onContextMenu: (e, node) => console.log('onContextMenu', node),
  onMove: (e, node, delta) => console.log('onMove', node, delta),
};

storiesOf('Visualization/Graph/Routing', module)
  .add('Straight Router', () => (
    <Story style={graphStoryStyle}>
      <Graph
        nodeActions={nodeActions}
        graph={graph}
        edgeMode="straight"
      />
    </Story>
  ))
  .add('Smart Router', () => (
    <Story style={graphStoryStyle}>
      <Graph
        nodeActions={nodeActions}
        graph={graph}
        edgeMode="smart"
        gridFillsAvailableSpace
        gridSize={5}
      />
    </Story>
  ));

storiesOf('Visualization/Graph/Nesting', module)
  .add('Nested Graph', () => (
    <Story style={graphStoryStyle}>
      <Graph
        nodeActions={nodeActions}
        graph={nestedGraph}
        edgeMode="straight"
      />
    </Story>
  ))
  .add('Nested Graph - Smart', () => (
    <Story style={graphStoryStyle}>
      <Graph
        nodeActions={nodeActions}
        graph={nestedGraph}
        edgeMode="smart"
      />
    </Story>
  ));

const size = { width: 120, height: 50 };
const workflowGraph = new LogicalArcGraph(
  [
    {
      id: 1,
      label: 'Step One',
      parentId: null,
      position: {
        x: 0,
        y: 0,
      },
      size
    },
    {
      id: 2,
      label: 'Step Two',
      parentId: null,
      position: {
        x: 200,
        y: 100,
      },
      size
    },
    {
      id: 3,
      label: 'Step Three',
      parentId: null,
      position: {
        x: 400,
        y: 200,
      },
      size
    },
  ],
  [
    {
      from: 1,
      to: 2,
    },
    {
      from: 2,
      to: 3,
    },
  ],
);
interface IFakeGraphStatus {
  inProgress: number;
  pctComplete: number;
}
let fakeStepsCompleted = 0;
function updateGraphStatusEventually(
  status: IFakeGraphStatus,
  setStatus: (status: IFakeGraphStatus) => void,
) {
  setTimeout(() => {
    let { inProgress, pctComplete } = status;
    if (inProgress > workflowGraph.nodes.length) {
      return;
    }
    
    console.log(inProgress, pctComplete);
    if (pctComplete >= 1) {
      fakeStepsCompleted = inProgress + 1;
      inProgress = fakeStepsCompleted;
      pctComplete = 0;
    } else {
      pctComplete += 0.2;
    }

    setStatus({ inProgress, pctComplete });
  }, 1000);
}
storiesOf('Visualization/Graph/Decorations', module)
    .add('Animated Progress Bars', () => {
      const [status, setStatus] = useState({
        inProgress: 1,
        pctComplete: 0,
      });      
      // uh, this thing is a hack, we do this to reset it if hot reloader fires (i.e. you save and storybook refreshes with changes)
      if (status.inProgress === 1 && status.pctComplete === 0) {
        fakeStepsCompleted = 0;
      }
      updateGraphStatusEventually(status, setStatus);
      
      function getNodeStatus(i: string | number) {
        if (typeof i === 'string')
          i = Number(i);

        if (i < status.inProgress) {
          return 'FINISHED';
        } else if (i > status.inProgress) {
          return 'PENDING';
        }
        return 'STARTED';
      }

      workflowGraph.nodes.forEach(node => {
        const nodeStatus = getNodeStatus(node.id);
        node.className = nodeStatus;
        node.hooks = {
          decoration: (size: IBoxSize, animState: string) => {
            if (nodeStatus === 'PENDING') {
              return null;
            }
            console.log('decoration rendering', status.pctComplete);

            const populatedDashOffset = status.pctComplete * size.width;
            const hiddenDashOffset = size.width - populatedDashOffset;
            const positions = {
              x1: 1,
              x2: size.width - 1,
              y1: 3.5,
              y2: 3.5,
            };

            if (nodeStatus === 'FINISHED') {
              return <>
                <line
                  className="loading-line-bg finished"
                  {...positions}
                />
                <line
                  className="loading-line finished"
                  {...positions}
                />
              </>;
            }

            return <>
              <line
                className={`loading-line-bg ${animState}`}
                {...positions}
              />
              <line
                className={`loading-line ${animState}`} 
                {...positions}
                strokeDasharray={`${populatedDashOffset}px ${hiddenDashOffset * 2}px ${populatedDashOffset}px`}
              />
            </>;
          },
        };
      });

      return (
        <Story style={graphStoryStyle}>
          <Graph
            graph={workflowGraph}
            gridFillsAvailableSpace
            gridSize={10}
            edgeMode="smart"
            padding={{ top: 100, right: 100, bottom: 100, left: 300 }}
          />
        </Story>
      );
    });
