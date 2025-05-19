import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartSummary } from '../index';

describe('CartSummary Component', () => {
  const defaultProps = {
    buttonText: 'Checkout',
    onClick: vi.fn(),
  };

  it('renders button with correct text', () => {
    render(<CartSummary {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent('Checkout');
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = vi.fn();
    render(<CartSummary {...defaultProps} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('shows total amount when showTotal is true', () => {
    render(<CartSummary {...defaultProps} showTotal={true} totalAmount="99.99" />);

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('hides total amount when showTotal is false', () => {
    render(<CartSummary {...defaultProps} showTotal={false} totalAmount="99.99" />);

    expect(screen.queryByText('Total')).not.toBeInTheDocument();
    expect(screen.queryByText('$99.99')).not.toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    render(<CartSummary {...defaultProps} isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('disables button when isDisabled is true', () => {
    render(<CartSummary {...defaultProps} isDisabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    const customClass = 'custom-summary';
    render(<CartSummary {...defaultProps} className={customClass} />);
    expect(screen.getByRole('button')).toHaveClass(customClass);
  });

  it('applies correct aria-label to button', () => {
    const ariaLabel = 'Complete checkout';
    render(<CartSummary {...defaultProps} buttonAriaLabel={ariaLabel} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
  });
});
