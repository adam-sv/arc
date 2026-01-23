import { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Dropdown } from '.';
import userEvent from '@testing-library/user-event';

const dropDownItems = [
  { value: '0', label: '0', disabled: true },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
];
const DropdownTest = () => {
  const [value, setValue] = useState(dropDownItems[0].value);

  return (
    <Dropdown
      items={dropDownItems}
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
    />
  );
};

describe('dropdown tests', () => {
  it('changes its value when a user selects an item', async () => {
    render(<DropdownTest />);
    const value = document.getElementsByClassName('ArcDropdown-value-row')[0];
    const select = screen.getByRole('combobox');
    expect(value).toContainHTML('1');
    await userEvent.selectOptions(select, '2');
    await waitFor(() => {
      expect(value).toContainHTML('2');
    });
  });

  it('displays the correct initial value', () => {
    render(<DropdownTest />);
    const value = document.getElementsByClassName('ArcDropdown-value-row')[0];
    expect(value).toContainHTML('1');
  });

  it('renders all dropdown items', () => {
    render(<DropdownTest />);
    const select = screen.getByRole('combobox');

    dropDownItems.forEach((item) => {
      const option = screen.getByRole('option', { name: item.label });
      expect(option).toBeInTheDocument();
    });
    expect(select).toBeInTheDocument();
  });

  it('calls onChange when an item is selected', async () => {
    const handleChange = jest.fn();
    render(
      <Dropdown
        items={dropDownItems}
        value={dropDownItems[1].value}
        onChange={handleChange}
      />
    );
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '2');
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(dropDownItems[2]);
    });
  });

  it('shows placeholder when value is undefined', () => {
    render(
      <Dropdown
        items={dropDownItems}
        value={undefined}
        placeholder='Select an option'
      />
    );
    const select = screen.getByRole('combobox');
    const placeholderOption = select.querySelector('option[disabled][hidden]');
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveTextContent('Select an option');
  });

  it('defaults to first item not disabled when value and placeholder are undefined', () => {
    render(
      <Dropdown
        items={dropDownItems}
        value={undefined}
        placeholder={undefined}
      />
    );
    const valueRow = document.getElementsByClassName(
      'ArcDropdown-value-row'
    )[0];
    expect(valueRow).toContainHTML('1');
  });

  it('prevents selecting disabled items', async () => {
    const handleChange = jest.fn();
    render(
      <Dropdown
        items={dropDownItems}
        value={dropDownItems[1].value}
        onChange={handleChange}
      />
    );
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '0');
    await waitFor(() => {
      expect(handleChange).not.toHaveBeenCalled();
    });
    const valueRow = document.getElementsByClassName(
      'ArcDropdown-value-row'
    )[0];
    expect(valueRow).toContainHTML('1');
  });
});
