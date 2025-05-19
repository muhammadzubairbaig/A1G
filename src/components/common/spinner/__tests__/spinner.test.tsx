import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from '../index';

describe('Spinner Component', () => {
  it('renders with default size (lg)', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('spinner', 'spinner-lg');
  });

  it('renders with sm size', () => {
    render(<Spinner size="sm" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('spinner', 'spinner-sm');
  });

  it('applies custom className', () => {
    const customClass = 'custom-spinner';
    render(<Spinner className={customClass} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(customClass);
  });

  it('has correct accessibility attributes', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders spinner circle element', () => {
    render(<Spinner />);
    const spinnerCircle = screen.getByRole('status').querySelector('.spinner-circle');
    expect(spinnerCircle).toBeInTheDocument();
  });

  it('combines all classes correctly', () => {
    const customClass = 'test-spinner';
    render(<Spinner size="sm" className={customClass} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('spinner', 'spinner-sm', customClass);
  });
});
