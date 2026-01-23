import { MatIcon, MenuList } from '@adam-sv/arc';

export default (
  <MenuList
    items={[
      {
        label: 'item1',
        icon: <MatIcon.Add />,
        onClick: () => {
          console.info('This was clicked!');
        },
        section: 'section1',
      },
      {
        label: 'item2',
        icon: <MatIcon.Archive />,
        onClick: () => {
          console.info('This was clicked!');
        },
        section: 'section2',
      },
    ]}
  />
);
