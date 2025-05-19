import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../index';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <div data-testid="test-content">Test Content</div>
      </Card>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
  });

  it('applies default classes', () => {
    render(
      <Card>
        <div>Content</div>
      </Card>
    );

    const card = screen.getByRole('region');
    expect(card).toHaveClass('custom-card', 'h-100', 'overflow-hidden');
  });

  it('applies custom className', () => {
    const customClass = 'test-card';
    render(
      <Card className={customClass}>
        <div>Content</div>
      </Card>
    );

    const card = screen.getByRole('region');
    expect(card).toHaveClass(customClass);
  });

  it('renders as different HTML element', () => {
    render(
      <Card as="section">
        <div>Content</div>
      </Card>
    );

    const card = screen.getByRole('region');
    expect(card.tagName.toLowerCase()).toBe('section');
  });

  it('combines custom and default classes', () => {
    render(
      <Card className="test-card">
        <div>Content</div>
      </Card>
    );

    const card = screen.getByRole('region');
    expect(card).toHaveClass('custom-card', 'h-100', 'overflow-hidden', 'test-card');
  });
});
