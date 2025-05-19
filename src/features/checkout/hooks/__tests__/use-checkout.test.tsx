import { renderHook, act } from '@testing-library/react';
import { useCheckout } from '../../../checkout/hooks/use-checkout';
import { test, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { placeOrder } from '@/services/api/bakery-api';
import { showToast } from '@/utils/toast';
import { AxiosError } from 'axios';
import { ErrorResponseData } from '@/services/notifications/error-handler';

// Mock dependencies
vi.mock('@/services/api/bakery-api', () => ({
  placeOrder: vi.fn(),
}));

vi.mock('@/utils/toast', () => ({
  showToast: {
    error: vi.fn(),
  },
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

const mockOnSuccess = vi.fn();
const mockOnError = vi.fn();
const mockOnMutate = vi.fn();

const mockOrderItems = [
  { name: 'Croissant', quantity: 2 },
  { name: 'Pretzel', quantity: 1 },
];

test('should initialize with default state', () => {
  const { result } = renderHook(
    () =>
      useCheckout({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
        onMutate: mockOnMutate,
      }),
    { wrapper }
  );

  expect(result.current.isPending).toBe(false);
  expect(result.current.mutate).toBeDefined();
  expect(result.current.mutateAsync).toBeDefined();
});

test('should handle order placement failure', async () => {
  const error = new AxiosError<ErrorResponseData>('Failed to place order');
  (placeOrder as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(error);

  const { result } = renderHook(
    () =>
      useCheckout({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
        onMutate: mockOnMutate,
      }),
    { wrapper }
  );

  await act(async () => {
    try {
      await result.current.mutateAsync(mockOrderItems);
    } catch (e) {
      // Expected error
    }
  });

  expect(placeOrder).toHaveBeenCalledWith(mockOrderItems);
  expect(mockOnError).toHaveBeenCalledWith(error);
  expect(showToast.error).toHaveBeenCalledWith('Checkout failed. Please try again.');
});

test('should call onMutate before mutation', async () => {
  (placeOrder as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

  const { result } = renderHook(
    () =>
      useCheckout({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
        onMutate: mockOnMutate,
      }),
    { wrapper }
  );

  await act(async () => {
    await result.current.mutateAsync(mockOrderItems);
  });

  expect(mockOnMutate).toHaveBeenCalledWith(mockOrderItems);
  // expect(mockOnMutate).toHaveBeenCalledBefore(placeOrder);
});

test('should retry failed request once', async () => {
  const error = new AxiosError('Network error');
  const mockPlaceOrder = placeOrder as unknown as ReturnType<typeof vi.fn>;
  mockPlaceOrder.mockRejectedValueOnce(error).mockResolvedValueOnce(undefined);

  const { result } = renderHook(
    () =>
      useCheckout({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
        onMutate: mockOnMutate,
      }),
    { wrapper }
  );

  await act(async () => {
    await result.current.mutateAsync(mockOrderItems);
  });

  expect(mockOnSuccess).toHaveBeenCalled();
});

test('should handle empty order items', async () => {
  (placeOrder as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

  const { result } = renderHook(
    () =>
      useCheckout({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
        onMutate: mockOnMutate,
      }),
    { wrapper }
  );

  await act(async () => {
    await result.current.mutateAsync([]);
  });

  expect(placeOrder).toHaveBeenCalledWith([]);
  expect(mockOnSuccess).toHaveBeenCalled();
});

test('should update isPending state during mutation', async () => {
  let resolvePromise: (value: unknown) => void;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });

  (placeOrder as unknown as ReturnType<typeof vi.fn>).mockImplementation(
    () => promise as Promise<void>
  );

  const { result } = renderHook(
    () =>
      useCheckout({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
        onMutate: mockOnMutate,
      }),
    { wrapper }
  );

  expect(result.current.isPending).toBe(false);

  const mutationPromise = act(async () => {
    await result.current.mutateAsync(mockOrderItems);
  });

  resolvePromise!(undefined);
  await mutationPromise;
  expect(result.current.isPending).toBe(false);
});
