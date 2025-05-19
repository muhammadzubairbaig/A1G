import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import ProductItem from '../product-item';
import type { Product } from '@/types/product';

const mockProduct: Product = {
  name: 'Croissant',
  price: 2.99,
  stock: 5,
  description: 'A delicious French pastry',
};

const mockOnQuantityChange = vi.fn();

test('should render product details correctly', () => {
  render(<ProductItem item={mockProduct} quantity={2} onQuantityChange={mockOnQuantityChange} />);

  expect(screen.getByText('Croissant')).toBeInTheDocument();
  expect(screen.getByText('$2.99')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
});

test('should handle increment button click', () => {
  render(<ProductItem item={mockProduct} quantity={2} onQuantityChange={mockOnQuantityChange} />);

  const incrementButton = screen.getByRole('button', { name: /increase quantity/i });
  fireEvent.click(incrementButton);

  expect(mockOnQuantityChange).toHaveBeenCalledWith('Croissant', 3);
});

test('should handle decrement button click', () => {
  render(<ProductItem item={mockProduct} quantity={2} onQuantityChange={mockOnQuantityChange} />);

  const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });
  fireEvent.click(decrementButton);

  expect(mockOnQuantityChange).toHaveBeenCalledWith('Croissant', 1);
});

test('should disable increment button when quantity equals stock', () => {
  render(<ProductItem item={mockProduct} quantity={5} onQuantityChange={mockOnQuantityChange} />);

  const incrementButton = screen.getByRole('button', { name: /increase quantity/i });
  expect(incrementButton).toBeDisabled();
});

test('should disable decrement button when quantity is zero', () => {
  render(<ProductItem item={mockProduct} quantity={0} onQuantityChange={mockOnQuantityChange} />);

  const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });
  expect(decrementButton).toBeDisabled();
});

test('should handle out of stock product', () => {
  const outOfStockProduct = {
    ...mockProduct,
    stock: 0,
  };

  render(
    <ProductItem item={outOfStockProduct} quantity={0} onQuantityChange={mockOnQuantityChange} />
  );

  const productDetails = screen.getByText(outOfStockProduct.name).closest('.product-details');
  expect(productDetails).toHaveClass('out-of-stock');
});
