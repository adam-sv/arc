import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxGroup } from '.';

const CheckBoxTest = ({ multiselect }: { multiselect: boolean }) => {
  return (
    <CheckboxGroup
      items={[
        { key: '0', value: multiselect },
        { key: '1', value: false },
      ]}
      isExclusive={multiselect}
    />
  );
};

describe('CheckboxGroup test', () => {
  it('Multiselect allows for multiple checkboxes to be selected', async () => {
    const user = userEvent.setup();
    render(<CheckBoxTest multiselect={false} />);
    const box0 = screen.getByTestId('checkbox-item-0');
    const box1 = screen.getByTestId('checkbox-item-1');

    await user.click(box0.children[0]);
    await waitFor(() => {
      expect(box0).toHaveClass('ArcCheckboxGroup-item-checked');
    });

    await user.click(box1.children[0]);
    await waitFor(() => {
      expect(box1).toHaveClass('ArcCheckboxGroup-item-checked');
    });

    expect(box0).toHaveClass('ArcCheckboxGroup-item-checked');
  });

  it('does not allow for multiple checkboxes to be selected if multiselect if false', async () => {
    const user = userEvent.setup();
    render(<CheckBoxTest multiselect={true} />);
    const box0 = screen.getByTestId('checkbox-item-0');
    const box1 = screen.getByTestId('checkbox-item-1');
    expect(box0).toHaveClass('ArcCheckboxGroup-item-checked');
    await user.click(box1.children[0]);
    await waitFor(() => {
      expect(box1).toHaveClass('ArcCheckboxGroup-item-checked');
    });
    expect(box0).not.toHaveClass('ArcCheckboxGroup-item-checked');
  });
});
