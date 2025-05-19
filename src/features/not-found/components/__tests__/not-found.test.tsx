import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import NotFound from '../not-found';

// Mock dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockNavigate = vi.fn();

test('should render 404 message', () => {
  render(<NotFound />);

  expect(screen.getByText(/404/i)).toBeInTheDocument();
  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
});

test('should render go to home button', () => {
  render(<NotFound />);

  const homeButton = screen.getByRole('button', { name: 'Go to home page' });
  expect(homeButton).toBeInTheDocument();
});

test('should navigate to home page when clicking home button', () => {
  render(<NotFound />);

  const homeButton = screen.getByRole('button', { name: 'Go to home page' });
  fireEvent.click(homeButton);

  expect(mockNavigate).toHaveBeenCalledWith('/');
});

test('should have proper accessibility attributes', () => {
  render(<NotFound />);

  const homeButton = screen.getByRole('button', { name: 'Go to home page' });
  expect(homeButton).toHaveAttribute('aria-label', 'Go to home page');
});
