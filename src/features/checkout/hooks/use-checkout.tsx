import { placeOrder } from '@/services/api/bakery-api';
import { useMutation } from '@tanstack/react-query';
import { ErrorResponseData } from '@/services/notifications/error-handler';
import { AxiosError } from 'axios';
import { showToast } from '@/utils/toast';

export interface OrderItem {
  /** Name of the product being ordered */
  name: string;
  /** Quantity of the product */
  quantity: number;
}

interface UseCheckoutProps {
  /** Callback after successful order placement */
  onSuccess: (data: unknown, items: OrderItem[]) => void;
  /** Callback after failed order placement */
  onError?: (error: AxiosError<ErrorResponseData>) => void;
  /** Callback before order placement starts */
  onMutate?: (items: OrderItem[]) => void;
}

/**
 * Checkout Management Hook
 *
 * Handles the checkout process for orders.
 * Features:
 * - Order placement with backend
 * - Success/error handling
 * - Automatic notifications
 * - Retry on failure
 *
 * The hook manages the complete checkout flow:
 * 1. Pre-checkout preparation (onMutate)
 * 2. Order submission to backend
 * 3. Success/error handling
 * 4. User notifications
 *
 * Usage:
 * ```tsx
 * const { mutate: checkout, isPending } = useCheckout({
 *   onSuccess: (data, items) => {
 *     // Handle successful checkout
 *     clearCart();
 *     navigate('/checkout');
 *   },
 *   onError: (error) => {
 *     // Handle checkout failure
 *     alert('Checkout failed:', error);
 *   }
 * });
 *
 * // Initiate checkout
 * checkout([{ name: 'Product', quantity: 2 }]);
 * ```
 *
 * @param props - Hook configuration options
 * @returns Mutation object for checkout process
 */
export const useCheckout = ({ onSuccess, onError, onMutate }: UseCheckoutProps) => {
  return useMutation({
    mutationFn: async (items: OrderItem[]) => {
      const response = await placeOrder(items);
      return response;
    },
    onSuccess: (data, items) => {
      onSuccess(data, items);
    },
    onError: (error: AxiosError<ErrorResponseData>) => {
      showToast.error('Checkout failed. Please try again.');
      onError?.(error);
    },
    onMutate,
    retry: 1,
  });
};
