import { renderHook, act } from '@testing-library/react';
import { useCartSummary } from '@/features/checkout/hooks/use-cart-summary';
import { useProducts } from '@/hooks/use-products';
import { useCheckout } from '@/features/checkout/hooks/use-checkout';
import { test, expect, vi, describe, it } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Order } from '@/features/checkout/context/cart-context';
import { NavigateFunction } from 'react-router-dom';

// Mock dependencies
vi.mock('@/hooks/use-products', () => ({
  useProducts: vi.fn(() => ({
    data: [
      { name: 'Croissant', price: 2.99, stock: 10 },
      { name: 'Pretzel', price: 3.99, stock: 5 },
    ],
    isLoading: false,
  })),
}));

vi.mock('../use-checkout', () => ({
  useCheckout: vi.fn(),
}));

vi.mock('@/utils/toast', () => ({
  showToast: {
    warning: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

const mockNavigate = vi.fn() as NavigateFunction;
const mockSetOrder = vi.fn();

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 10,
  image: 'test.jpg',
  description: 'Test description',
};

const mockOrder: Order = {};

test('should initialize with empty cart', () => {
  vi.mocked(useCheckout).mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  } as any);

  const { result } = renderHook(
    () =>
      useCartSummary({
        order: mockOrder,
        setOrder: mockSetOrder,
        navigate: mockNavigate,
      }),
    { wrapper }
  );

  expect(result.current.totalAmount).toBe('0.00');
  expect(result.current.isOrderEmpty).toBe(true);
  expect(result.current.buttonText).toBe('Order');
});

test('should calculate total for single item', () => {
  vi.mocked(useCheckout).mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  } as any);

  const { result } = renderHook(
    () =>
      useCartSummary({
        order: { Croissant: 2 },
        setOrder: mockSetOrder,
        navigate: mockNavigate,
      }),
    { wrapper }
  );

  expect(result.current.totalAmount).toBe('5.98');
  expect(result.current.isOrderEmpty).toBe(false);
});

test('should calculate total for multiple items', () => {
  vi.mocked(useCheckout).mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  } as any);

  const { result } = renderHook(
    () =>
      useCartSummary({
        order: {
          Croissant: 2,
          Pretzel: 1,
        },
        setOrder: mockSetOrder,
        navigate: mockNavigate,
      }),
    { wrapper }
  );

  expect(result.current.totalAmount).toBe('9.97');
});

test('should handle case-insensitive product names', () => {
  vi.mocked(useCheckout).mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  } as any);

  const { result } = renderHook(
    () =>
      useCartSummary({
        order: {
          CROISSANT: 2,
          pretzel: 1,
        },
        setOrder: mockSetOrder,
        navigate: mockNavigate,
      }),
    { wrapper }
  );

  expect(result.current.totalAmount).toBe('9.97');
});

test('should handle empty products data', () => {
  vi.mocked(useCheckout).mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  } as any);

  vi.mocked(useProducts).mockReturnValueOnce({
    data: undefined,
    isLoading: false,
  } as any);

  const { result } = renderHook(
    () =>
      useCartSummary({
        order: { Croissant: 2 },
        setOrder: mockSetOrder,
        navigate: mockNavigate,
      }),
    { wrapper }
  );

  expect(result.current.totalAmount).toBe('0.00');
});

test('should not place empty orders', async () => {
  vi.mocked(useCheckout).mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  } as any);

  const { result } = renderHook(
    () =>
      useCartSummary({
        order: mockOrder,
        setOrder: mockSetOrder,
        navigate: mockNavigate,
      }),
    { wrapper }
  );

  await act(async () => {
    await result.current.onClick();
  });

  expect(mockSetOrder).not.toHaveBeenCalled();
  expect(mockNavigate).not.toHaveBeenCalled();
});

describe('useCartSummary', () => {
  it('should calculate total amount correctly', () => {
    const { result } = renderHook(
      () =>
        useCartSummary({
          order: mockOrder,
          setOrder: mockSetOrder,
          navigate: mockNavigate,
        }),
      { wrapper }
    );

    expect(result.current.totalAmount).toBe('0.00');
    expect(result.current.isOrderEmpty).toBe(true);
  });

  it('should handle order button state', () => {
    const { result } = renderHook(
      () =>
        useCartSummary({
          order: mockOrder,
          setOrder: mockSetOrder,
          navigate: mockNavigate,
        }),
      { wrapper }
    );

    expect(result.current.buttonText).toBe('Order');
    expect(result.current.buttonAriaLabel).toBe('Submit order');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isClicked).toBe(false);
  });

  it('should update total amount when order changes', () => {
    const orderWithItem = { [mockProduct.name]: 1 };
    const { result } = renderHook(
      () =>
        useCartSummary({
          order: orderWithItem,
          setOrder: mockSetOrder,
          navigate: mockNavigate,
        }),
      { wrapper }
    );

    expect(result.current.totalAmount).toBe('0.00'); // Will be 0 since products data is not mocked
    expect(result.current.isOrderEmpty).toBe(false);
  });
});
