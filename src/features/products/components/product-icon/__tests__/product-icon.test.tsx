import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { icons } from '@/features/products/config/order-icons';
import { ProductIcon } from '../../../index';

test('should render product icon with correct src and alt text', () => {
  render(<ProductIcon type="Croissant" />);

  const icon = screen.getByRole('img', { name: 'Croissant icon' });
  expect(icon).toHaveAttribute('src', icons.Croissant);
  expect(icon).toHaveAttribute('alt', 'Croissant icon');
  expect(icon).toHaveClass('product-icon');
});

test('should render fallback icon when type is not found', () => {
  // @ts-expect-error Testing invalid type
  render(<ProductIcon type="InvalidType" />);

  const icon = screen.getByRole('img', { name: 'InvalidType icon' });
  expect(icon).toHaveAttribute('src', icons.NoImage);
});

test('should have lazy loading enabled', () => {
  render(<ProductIcon type="Bread" />);

  const icon = screen.getByRole('img');
  expect(icon).toHaveAttribute('loading', 'lazy');
});
