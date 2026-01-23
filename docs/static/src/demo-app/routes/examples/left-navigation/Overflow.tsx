import { LeftNavigation } from '@adam-sv/arc';
import { items, bottomItems } from './items';

export default (
  <LeftNavigation
    items={[...items, ...items, ...items, ...items]}
    bottomItems={bottomItems}
  />
);
