import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AdamIcon } from './AdamIcon';
import { AirbusLogo } from './AirbusLogo';
import { BriefcaseIcon } from './BriefcaseIcon';
import { CalendarIcon } from './CalendarIcon';
import { ChartIcon } from './ChartIcon';
import { CompleteIcon } from './CompleteIcon';
import { LightbulbIcon } from './LightbulbIcon';
import { MenuIcon } from './MenuIcon';
import { NotificationIcon } from './NotificationIcon';
import { PauseIcon } from './PauseIcon';
import { PersonTagIcon } from './PersonTagIcon';
import { SearchIcon } from './SearchIcon';
import { StartIcon } from './StartIcon';
import { StopIcon } from './StopIcon';
import './stories.css';
import { TaskCompleteIcon } from './TaskCompleteIcon';
import { TaskIcon } from './TaskIcon';
import { TaskOverdueIcon } from './TaskOverdueIcon';
import { WalletIcon } from './WalletIcon';
import { WorkerIcon } from './WorkerIcon';

storiesOf('General/Icons', module)
  .add('AdamIcon', () => <AdamIcon className="icon" />)
  .add('AirbusLogo', () => <AirbusLogo className="icon" />)
  .add('BriefcaseIcon', () => <BriefcaseIcon className="icon" />)
  .add('CalendarIcon', () => <CalendarIcon className="icon" />)
  .add('ChartIcon', () => <ChartIcon className="icon" />)
  .add('CompleteIcon', () => <CompleteIcon className="icon" />)
  .add('LightbulbIcon', () => <LightbulbIcon className="icon" />)
  .add('MenuIcon', () => <MenuIcon className="icon" />)
  .add('NotificationIcon', () => <NotificationIcon className="icon" />)
  .add('PauseIcon', () => <PauseIcon className="icon" />)
  .add('PersonTagIcon', () => <PersonTagIcon className="icon" />)
  .add('SearchIcon', () => <SearchIcon className="icon" />)
  .add('StartIcon', () => <StartIcon className="icon" />)
  .add('StopIcon', () => <StopIcon className="icon" />)
  .add('TaskCompleteIcon', () => <TaskCompleteIcon className="icon" />)
  .add('TaskIcon', () => <TaskIcon className="icon" />)
  .add('TaskOverdueIcon', () => <TaskOverdueIcon className="icon" />)
  .add('WalletIcon', () => <WalletIcon className="icon" />)
  .add('WorkerIcon', () => <WorkerIcon className="icon" />);
