import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LeftNavigation from './index';
import { MemoryRouter } from 'react-router';
import { MatIcon } from '../MatIcon';

const items = [
  { icon: <MatIcon.Edit />, label: 'item 1', url: '/a' },
  { icon: <MatIcon.Send />, label: 'item 2', url: '/b' },
  { icon: <MatIcon.Message />, label: 'item 3', url: '/c' },
];

const bottomItems = [
  { icon: <MatIcon.Settings />, label: 'item 4', url: '/d' },
];

describe('Simple LeftNavigation', () => {
  it('the panel is collapsed by default, can be opened', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter>
        <LeftNavigation items={items} bottomItems={bottomItems} />
      </MemoryRouter>
    );
    const leftNav = container.getElementsByClassName('ArcLeftNavigation')[0];
    const toggle = container.getElementsByClassName(
      'ArcLeftNavigation-toggle'
    )[0];

    expect(leftNav).not.toHaveClass('is-open');
    await user.click(toggle);
    expect(leftNav).toHaveClass('is-open');
    // testing whether hidden elements are hidden via class {display: "none"} ->
    //    expect(screen.getByText("item 1")).not.toBeVisible()
    // requires loading css which is antipattern for @testing-library/react
  });
});
