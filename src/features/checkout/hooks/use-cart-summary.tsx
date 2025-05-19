import { useMemo, useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { useCheckout, OrderItem } from '@/features/checkout/hooks/use-checkout';
import { useProducts } from '@/hooks/use-products';
import { useQueryClient } from '@tanstack/react-query';
import { Order } from '@/features/checkout/context/cart-context';
import { showToast } from '@/utils/toast';

/**
 * Props interface for useCartSummary hook
 * @interface UseCartSummaryProps
 * @property {Order} order - Current order state containing items and quantities
 * @property {React.Dispatch<React.SetStateAction<Order>>} setOrder - Function to update order state
 * @property {NavigateFunction} navigate - React Router navigation function
 */
interface UseCartSummaryProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  navigate: NavigateFunction;
}

/**
 * Custom hook to manage cart summary functionality
 * Handles order calculations, checkout process, and cart state management
 */
export const useCartSummary = ({ order, setOrder, navigate }: UseCartSummaryProps) => {
  // Fetch products data using custom hook
  const { data: products } = useProducts();
  // Get query client instance for cache management
  const queryClient = useQueryClient();

  // Setup checkout mutation with success, error, and mutation handlers
  const mutation = useCheckout({
    // Handle successful order placement
    onSuccess: (_data: unknown, orderedItems: OrderItem[]) => {
      if (!orderedItems) {
        return;
      }

      // Invalidate storage queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['storage'] });

      // Reset order and navigate to checkout page
      setOrder({});
      navigate('/checkout');
    },
    // Handle checkout errors
    onError: (err: Error) => {
      console.error('Failed to place order: ' + err.message);
    },
    // Placeholder for optimistic updates
    onMutate: (_items: OrderItem[]) => {
      /**
       * Handles order calculations, checkout process, and cart state management
             This function could be used to implement optimistic updates
             An optimistic update would update the UI immediately before server confirmation
             Example: Update local cart state before server response
             If server fails, we could rollback to previous state
       */
    },
  });

  // Calculate total amount for all items in cart
  const totalAmount = useMemo(() => {
    if (!products) {
      return '0.00';
    }
    // Sum up prices for all items in order
    const total = Object.entries(order)
      .reduce((total, [name, qty]) => {
        const product = products.find((p) => p.name.toLowerCase() === name.toLowerCase());
        const amount = product ? product.price * qty : 0;
        return total + amount;
      }, 0)
      .toFixed(2);
    return total;
  }, [order, products]); // Recalculate when order or products change

  // Check if order is empty (no items or all quantities are 0)
  const isOrderEmpty = useMemo(() => {
    const empty = Object.values(order).every((qty) => !qty);
    return empty;
  }, [order]);

  // Handle order submission
  const handleOrderClick = useCallback(async () => {
    // Transform order object into array of items with quantities > 0
    const items = Object.entries(order)
      .filter(([_, qty]) => qty > 0)
      .map(([name, qty]) => ({ name, quantity: qty }));

    // Show warning if trying to submit empty order
    if (!items.length) {
      showToast.warning('Please select an item to place an order');
      return;
    }

    // Submit order through mutation
    await mutation.mutateAsync(items);
  }, [order, mutation]);

  // Return cart summary state and handlers
  return {
    buttonText: 'Order',
    onClick: handleOrderClick,
    buttonAriaLabel: 'Submit order',
    totalAmount,
    showTotal: true,
    isLoading: mutation.isPending,
    isOrderEmpty,
    isClicked: false,
  };
};
