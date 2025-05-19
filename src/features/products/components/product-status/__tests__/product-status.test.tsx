import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { ProductStatus } from '../../../index';
import type { Product } from '@/types/product';

const mockProducts: Product[] = [
  {
    name: 'Croissant',
    price: 2.99,
    stock: 10,
    description: 'A delicious French pastry',
  },
  {
    name: 'Pretzel',
    price: 3.99,
    stock: 5,
    description: 'A traditional German bread',
  },
];

test('should show loading spinner when loading', () => {
  render(<ProductStatus isLoading={true} products={undefined} />);

  expect(screen.getByRole('status')).toBeInTheDocument();
});

test('should show no products message when products array is empty', () => {
  render(<ProductStatus isLoading={false} products={[]} />);

  expect(screen.getByText('No products available at the moment.')).toBeInTheDocument();
});

test('should show no products message when products is undefined', () => {
  render(<ProductStatus isLoading={false} products={undefined} />);

  expect(screen.getByText('No products available at the moment.')).toBeInTheDocument();
});

test('should render nothing when products are available and not loading', () => {
  const { container } = render(<ProductStatus isLoading={false} products={mockProducts} />);

  expect(container.firstChild).toBeNull();
});
