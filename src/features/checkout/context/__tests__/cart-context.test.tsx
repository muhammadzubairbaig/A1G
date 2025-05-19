import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCartContext, CartProvider } from '@/features/checkout/context/cart-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a wrapper component that provides necessary context
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
  TestWrapper.displayName = 'TestWrapper';
  return TestWrapper;
};

describe('useCartContext', () => {
  it('should initialize with empty order state', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: createWrapper(),
    });

    expect(result.current.order).toEqual({});
  });

  it('should update product quantity', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.updateQuantity('Croissant', 2);
    });

    expect(result.current.order).toEqual({ Croissant: 2 });
  });

  it('should handle multiple product updates', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.updateQuantity('Croissant', 2);
      result.current.updateQuantity('Pretzel', 3);
    });

    expect(result.current.order).toEqual({
      Croissant: 2,
      Pretzel: 3,
    });
  });

  it('should clear order state', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.updateQuantity('Croissant', 2);
      result.current.updateQuantity('Pretzel', 3);
      result.current.clearOrder();
    });

    expect(result.current.order).toEqual({});
  });

  it('should set order state directly', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: createWrapper(),
    });

    const newOrder = {
      Croissant: 2,
      Pretzel: 1,
    };

    act(() => {
      result.current.setOrder(newOrder);
    });

    expect(result.current.order).toEqual(newOrder);
  });

  it('should throw error when used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useCartContext());
    }).toThrow('useCartContext must be used within a CartProvider');

    consoleError.mockRestore();
  });

  it('should update existing product quantity', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.updateQuantity('Croissant', 2);
      result.current.updateQuantity('Croissant', 3);
    });

    expect(result.current.order).toEqual({ Croissant: 3 });
  });

  it('should handle zero quantity updates', () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.updateQuantity('Croissant', 2);
      result.current.updateQuantity('Croissant', 0);
    });

    expect(result.current.order).toEqual({ Croissant: 0 });
  });
});
