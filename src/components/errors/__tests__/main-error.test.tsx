import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MainErrorFallback } from '../main-error';

// Mock window.location
const mockAssign = vi.fn();
Object.defineProperty(window, 'location', {
  value: {
    assign: mockAssign,
    origin: 'http://test.com',
  },
});

describe('MainError Component', () => {
  it('renders error message correctly', () => {
    render(<MainErrorFallback />);

    expect(screen.getByText('Ooops, something went wrong :(')).toBeInTheDocument();
  });

  it('renders retry button when onRetry prop is provided', () => {
    render(<MainErrorFallback />);

    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toBeInTheDocument();
  });
});

describe('MainErrorFallback Component', () => {
  it('renders error message correctly', () => {
    render(<MainErrorFallback />);
    expect(screen.getByText('Ooops, something went wrong :(')).toBeInTheDocument();
  });

  it('renders try again button', () => {
    render(<MainErrorFallback />);
    const button = screen.getByRole('button', { name: /try again/i });
    expect(button).toBeInTheDocument();
  });

  it('redirects to origin when try again button is clicked', () => {
    render(<MainErrorFallback />);
    const button = screen.getByRole('button', { name: /try again/i });

    fireEvent.click(button);
    expect(mockAssign).toHaveBeenCalledWith('http://test.com');
  });

  it('uses ContentLayout with error-layout class', () => {
    render(<MainErrorFallback />);
    const layout = screen.getByText('Ooops, something went wrong :(').closest('.error-layout');
    expect(layout).toHaveClass('error-layout');
  });
});
