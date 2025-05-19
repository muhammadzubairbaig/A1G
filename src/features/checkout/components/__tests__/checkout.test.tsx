import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import Checkout from '../checkout';

// Mock dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockNavigate = vi.fn();

test('should render order confirmation message', () => {
  render(<Checkout />);

  expect(screen.getByText('Order received')).toBeInTheDocument();
  expect(screen.getByText('Thank you!')).toBeInTheDocument();
  expect(screen.getByText('We have successfully received your order.')).toBeInTheDocument();
});

test('should render confirmation image with proper attributes', () => {
  render(<Checkout />);

  const image = screen.getByAltText('Order confirmation fireworks');
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('width', '200');
  expect(image).toHaveAttribute('height', '200');
});

test('should render submit another order button with proper attributes', () => {
  render(<Checkout />);

  const button = screen.getByRole('button', { name: 'Place New Order' });
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('aria-label', 'Place New Order');
  expect(screen.getByText('Submit another order')).toBeInTheDocument();
});

test('should navigate to home page when clicking submit another order', () => {
  render(<Checkout />);

  const button = screen.getByRole('button', { name: 'Place New Order' });
  fireEvent.click(button);

  expect(mockNavigate).toHaveBeenCalledWith('/');
});

test('should have proper layout structure', () => {
  render(<Checkout />);

  const confirmationSection = screen.getByText('Order received').closest('.confirmation-section');
  expect(confirmationSection).toHaveClass('card-content');

  const layout = screen.getByText('Thank you!').closest('.success-layout');
  expect(layout).toBeInTheDocument();
});
