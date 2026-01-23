import { render } from '@testing-library/react';
import { IMatIconKey, MatIcon, iconNameMap } from '.';

describe('MatIcon', () => {
  it('renders all icons', () => {
    Object.keys(iconNameMap).forEach((key) => {
      const IconComponent = MatIcon[key as IMatIconKey];
      expect(() => render(<IconComponent />)).not.toThrow();
    });
  });

  it('applies custom className', () => {
    const { container } = render(<MatIcon.Favorite className='custom-class' />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with variants', () => {
    const variants = ['light', 'lighter'] as const;

    variants.forEach((weight) => {
      const { container } = render(<MatIcon.Favorite weight={weight} />);
      expect(container.firstChild).toHaveClass(weight);
    });

    const { container } = render(<MatIcon.Favorite filled />);
    expect(container.firstChild).toHaveClass('filled');
  });
});
