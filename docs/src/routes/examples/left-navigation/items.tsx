import { MonoIcon } from '@adam-sv/arc';
export const items = [
  { Icon: MonoIcon.Edit, label: 'item 1', url: '/a' },
  { Icon: MonoIcon.Send, label: 'item 2', url: '/b' },
  { Icon: MonoIcon.Message, label: 'item 3', url: '/c' },
];

export const bottomItems = [
  { Icon: MonoIcon.Settings, label: 'item 4', url: '/d' },
];

export const style = {
  height: '600px',
  display: 'grid',
  justifyContent: 'stretch',
  alignItems: 'stretch',
  padding: '2em',
};
