import { LeftNavigation } from '@adam-sv/arc';
import { items, bottomItems } from './items';
// style
import './style.scss';

export default (
  <LeftNavigation
    items={items}
    bottomItems={bottomItems}
    topContent={(isOpen: boolean) => `Top${isOpen ? ' Content Is Open' : ''}`}
  />
);
