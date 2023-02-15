import { MenuList, MonoIcon } from '@adam-sv/arc';

export default (
  <MenuList
    items={[
      {
        label: 'item1',
        icon: <MonoIcon.Add />,
        onClick: () => {
          console.info('This was clicked!');
        },
        section: 'section1',
      },
      {
        label: 'item2',
        icon: <MonoIcon.Archive />,
        onClick: () => {
          console.info('This was clicked!');
        },
        section: 'section2',
      },
    ]}
  />
);
