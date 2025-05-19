import { useMutation, useQueryClient } from '@tanstack/react-query';
import orderService from '@/services/order/order-service';
import { OrderItem } from '@/types/order';
import { Product } from '@/types/product';
import { QUERY_KEYS } from '@/constants/query-keys';
import { showToast } from '@/utils/toast';

interface UseOrderProps {
  /** Callback function to execute after successful order submission */
  onSuccess?: () => void;
}

/**
 * Order Management Hook
 *
 * Handles order submission and related state updates.
 * Features:
 * - Order submission to backend
 * - Automatic product stock updates
 * - Success/error notifications
 * - Cache invalidation
 *
 * The hook manages the entire order lifecycle:
 * 1. Submits order to backend
 * 2. Updates local product cache
 * 3. Shows success/error notifications
 * 4. Triggers success callback
 *
 * Usage:
 * ```tsx
 * const { mutate: submitOrder, isPending } = useOrder({
 *   onSuccess: () => {
 *     // Handle successful order
 *     navigate('/checkout');
 *   }
 * });
 *
 * // Submit order
 * submitOrder([{ name: 'Product', quantity: 2 }]);
 * ```
 *
 * @param props - Hook configuration options
 * @returns Mutation object for order submission
 */
export const useOrder = ({ onSuccess }: UseOrderProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items: OrderItem[]) => orderService.submitOrder(items),
    onSuccess: (_, items) => {
      // Update products cache with new stock levels
      queryClient.setQueryData<Product[]>(QUERY_KEYS.products, (oldProducts) => {
        if (!oldProducts) return [];

        return oldProducts.map((product) => {
          const ordered = items.find((item) => item.name === product.name);
          if (!ordered) return product;

          return {
            ...product,
            stock: Math.max(0, product.stock - ordered.quantity),
          };
        });
      });

      onSuccess?.();
    },
    onError: (error: Error) => {
      showToast.error('Failed to place order. Please try again.');
      console.error('Failed to place order. Please try again.', error);
    },
  });
};
