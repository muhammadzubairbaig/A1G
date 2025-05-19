import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import ProductList from '../product-list';
import { useProducts } from '@/hooks/use-products';
import { useOrder } from '@/hooks/use-order';
import { useCartContext } from '@/features/checkout/context/cart-context';

// Mock dependencies
vi.mock('@/hooks/use-products');
vi.mock('@/hooks/use-order');
vi.mock('@/features/checkout/context/cart-context');
vi.mock('@/utils/toast');
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockNavigate = vi.fn();
const mockUpdateQuantity = vi.fn();
const mockClearOrder = vi.fn();
const mockSubmitOrder = vi.fn();

const mockProducts = [
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

test('should render loading state', () => {
  vi.mocked(useProducts).mockReturnValue({
    data: undefined,
    isLoading: true,
  } as any);

  vi.mocked(useCartContext).mockReturnValue({
    order: {},
    updateQuantity: mockUpdateQuantity,
    clearOrder: mockClearOrder,
    setOrder: vi.fn(),
  } as any);

  vi.mocked(useOrder).mockReturnValue({
    mutate: mockSubmitOrder,
    isPending: false,
  } as any);

  render(<ProductList />);

  expect(screen.getByRole('status')).toBeInTheDocument();
});

test('should render product list when data is loaded', () => {
  vi.mocked(useProducts).mockReturnValue({
    data: mockProducts,
    isLoading: false,
  } as any);

  vi.mocked(useCartContext).mockReturnValue({
    order: { Croissant: 2 },
    updateQuantity: mockUpdateQuantity,
    clearOrder: mockClearOrder,
    setOrder: vi.fn(),
  } as any);

  vi.mocked(useOrder).mockReturnValue({
    mutate: mockSubmitOrder,
    isPending: false,
  } as any);

  render(<ProductList />);

  expect(screen.getByText('My Order')).toBeInTheDocument();
  expect(screen.getByRole('list')).toBeInTheDocument();
});

test('should handle empty cart state', () => {
  vi.mocked(useProducts).mockReturnValue({
    data: mockProducts,
    isLoading: false,
  } as any);

  vi.mocked(useCartContext).mockReturnValue({
    order: {},
    updateQuantity: mockUpdateQuantity,
    clearOrder: mockClearOrder,
    setOrder: vi.fn(),
  } as any);

  vi.mocked(useOrder).mockReturnValue({
    mutate: mockSubmitOrder,
    isPending: false,
  } as any);

  render(<ProductList />);

  const orderButton = screen.getByRole('button', { name: 'Place Order' });
  fireEvent.click(orderButton);

  expect(mockSubmitOrder).not.toHaveBeenCalled();
});

test('should handle successful order submission', () => {
  vi.mocked(useProducts).mockReturnValue({
    data: mockProducts,
    isLoading: false,
  } as any);

  vi.mocked(useCartContext).mockReturnValue({
    order: { Croissant: 2 },
    updateQuantity: mockUpdateQuantity,
    clearOrder: mockClearOrder,
    setOrder: vi.fn(),
  } as any);

  const mockMutate = vi.fn(() => {
    mockClearOrder();
    mockNavigate('/checkout');
  });

  vi.mocked(useOrder).mockReturnValue({
    mutate: mockMutate,
    isPending: false,
  } as any);

  render(<ProductList />);

  const orderButton = screen.getByRole('button', { name: 'Place Order' });
  fireEvent.click(orderButton);

  expect(mockMutate).toHaveBeenCalledWith([{ name: 'Croissant', quantity: 2 }]);
  expect(mockClearOrder).toHaveBeenCalled();
  expect(mockNavigate).toHaveBeenCalledWith('/checkout');
});

test('should calculate total amount correctly', () => {
  vi.mocked(useProducts).mockReturnValue({
    data: mockProducts,
    isLoading: false,
  } as any);

  vi.mocked(useCartContext).mockReturnValue({
    order: {
      Croissant: 2,
      Pretzel: 1,
    },
    updateQuantity: mockUpdateQuantity,
    clearOrder: mockClearOrder,
    setOrder: vi.fn(),
  } as any);

  vi.mocked(useOrder).mockReturnValue({
    mutate: mockSubmitOrder,
    isPending: false,
  } as any);

  render(<ProductList />);

  // 2 * $2.99 + 1 * $3.99 = $9.97
  expect(screen.getByText('$9.97')).toBeInTheDocument();
});

test('should disable order button when processing', () => {
  vi.mocked(useProducts).mockReturnValue({
    data: mockProducts,
    isLoading: false,
  } as any);

  vi.mocked(useCartContext).mockReturnValue({
    order: { Croissant: 2 },
    updateQuantity: mockUpdateQuantity,
    clearOrder: mockClearOrder,
    setOrder: vi.fn(),
  } as any);

  vi.mocked(useOrder).mockReturnValue({
    mutate: mockSubmitOrder,
    isPending: true,
  } as any);

  render(<ProductList />);

  const orderButton = screen.getByRole('button', { name: 'Place Order' });
  expect(orderButton).toBeDisabled();
});
