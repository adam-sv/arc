import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('TextInput', () => {
  it('renders with value when value is provided', () => {
    render(<TextInput value='Default Value' />);
    expect(screen.getByDisplayValue('Default Value')).toBeInTheDocument();
  });

  it('renders with a default placeholder if none is provided', () => {
    const type = 'integer';
    render(<TextInput type={type} />);
    expect(screen.getByPlaceholderText(`Your ${type}...`)).toBeInTheDocument();
  });

  it('calls onChange when value changes', async () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('does not allow editing when readOnly or disabled is passed in', async () => {
    render(<TextInput value='readOnly value' readOnly />);
    const input = screen.getByDisplayValue('readOnly value');
    expect(input).toHaveAttribute('readOnly');

    await userEvent.type(input, 'new');
    expect(input).toHaveValue('readOnly value');
  });

  it('shows error message if provided', () => {
    render(<TextInput error='Required' />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('renders a button when buttonProps are provided', () => {
    const buttonProps = { children: 'Click Me', onClick: jest.fn() };
    render(<TextInput buttonProps={buttonProps} />);

    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
  });

  it('calls buttonProps.onClick when the button is clicked', async () => {
    const onClick = jest.fn();
    render(<TextInput buttonProps={{ children: 'Click Me', onClick }} />);
    const button = screen.getByRole('button', { name: 'Click Me' });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
