import { MonoIcon, TaskIcon } from '@adam-sv/arc';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LeftNavigation } from '.';
import { StoryContainer as Story } from '../../utils/StoryContainer';
import './stories.css';

const items = [
  { Icon: MonoIcon.Edit, label: 'item 1', url: '/a' },
  { Icon: MonoIcon.Send, label: 'item 2', url: '/b' },
  { Icon: MonoIcon.Message, label: 'item 3', url: '/c' },
];

const bottomItems = [{ Icon: MonoIcon.Settings, label: 'item 4', url: '/d' }];

const style = {
  height: '600px',
  display: 'grid',
  justifyContent: 'stretch',
  alignItems: 'stretch',
  padding: '2em',
};

storiesOf('Layout/LeftNavigation', module)
  .add('Closed', () => (
    <Story style={style}>
      <Router>
        <LeftNavigation items={items} bottomItems={bottomItems} />
      </Router>
    </Story>
  ))
  .add('Open', () => (
    <Story style={style}>
      <Router>
        <LeftNavigation
          items={items}
          isOpenByDefault={true}
          bottomItems={bottomItems}
        />
      </Router>
    </Story>
  ))
  .add('Purple Theme', () => (
    <Story style={style}>
      <Router>
        <LeftNavigation
          className="purple-example"
          isOpenByDefault={true}
          items={items}
          bottomItems={bottomItems}
        />
      </Router>
    </Story>
  ))
  .add('With Top Content', () => (
    <Story style={style}>
      <Router>
        <LeftNavigation
          isOpenByDefault={true}
          items={items}
          topContent={(isOpen: boolean, { setIsOpen }) => (
            <div className="MyTopContent">
              Test! {isOpen && "Is Open"}
            </div>
          )}
        />
      </Router>
    </Story>
  ));
