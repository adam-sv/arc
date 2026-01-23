import { LeftNavigation } from '@adam-sv/arc';

import { items, bottomItems } from './items';

export default (
  <LeftNavigation
    items={items}
    bottomItems={bottomItems}
    topIconProps={{
      onClick: () => {
        alert('ADAM is the best!');
      },
      style: { cursor: 'pointer' },
    }}
  />
);
