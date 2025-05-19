/**
 * Product List Component
 *
 * Main product listing and ordering interface for the bakery application.
 * Implements a virtualized list for efficient rendering of large product catalogs.
 *
 * Features:
 * - Virtualized product list using react-window
 * - Real-time cart management
 * - Dynamic total calculation
 * - Order submission handling
 * - Loading and error states
 * - Responsive layout
 *
 * State Management:
 * - Products: Fetched via useProducts hook
 * - Cart: Managed via useCartContext
 * - Order submission: Handled by useOrder hook
 *
 * Performance Optimizations:
 * - Virtualized list rendering
 * - Memoized calculations
 * - Callback memoization
 * - Component memoization
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import { useProducts } from '@/hooks/use-products';
import { useOrder } from '@/hooks/use-order';
import ProductItem from '@/features/products/components/product-item/product-item';
import { CartSummary } from '@/components/common/cart-summary/cart-summary';
import { ProductStatus } from '@/features/products/components/product-status/product-status';
import { ContentLayout } from '@/components/layouts/content-layout/content-layout';
import { showToast } from '@/utils/toast';
import { useCartContext } from '@/features/checkout/context/cart-context';
import './product-list.scss';

// Constants for virtualized list configuration
const ITEM_HEIGHT = 80; // Height of each product item in pixels
const WINDOW_HEIGHT = 440; // Maximum height of the product list container

const ProductList: React.FC = () => {
  // Hooks for navigation and data management
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts();
  const { order, updateQuantity, clearOrder } = useCartContext();

  // Order submission handler with success callback
  const { mutate: submitOrder, isPending } = useOrder({
    onSuccess: () => {
      clearOrder(); // Reset cart state
      navigate('/checkout'); // Navigate to success page
    },
  });

  /**
   * Calculate total order amount
   *
   * Computes the sum of (quantity × price) for all items in cart
   * Memoized to prevent unnecessary recalculations
   */
  const totalAmount = React.useMemo(() => {
    if (!products) return '0.00';
    return Object.entries(order)
      .reduce((total, [name, qty]) => {
        const product = products.find((p) => p.name === name);
        return total + (product ? product.price * qty : 0);
      }, 0)
      .toFixed(2);
  }, [order, products]);

  /**
   * Check if cart is empty
   *
   * Returns true if no items have quantities > 0
   * Memoized to prevent unnecessary recalculations
   */
  const isCartEmpty = React.useMemo(() => {
    return Object.values(order).every((qty) => !qty);
  }, [order]);

  /**
   * Handle checkout process
   *
   * Validates cart state and submits order
   * Shows error toast if cart is empty
   */
  const handleCheckout = React.useCallback(() => {
    if (isCartEmpty) {
      showToast.error('Please add items to your cart');
      return;
    }

    // Transform cart items for API submission
    const items = Object.entries(order)
      .filter(([_, qty]) => qty > 0)
      .map(([name, qty]) => ({ name, quantity: qty }));

    submitOrder(items);
  }, [isCartEmpty, order, submitOrder]);

  /**
   * Virtualized row renderer
   *
   * Renders individual product items in the virtualized list
   * Memoized to prevent unnecessary re-renders
   */
  const Row = React.useCallback(
    ({ index }: { index: number; style: React.CSSProperties }) => {
      if (!products) return null;
      const product = products[index];
      return (
        <ProductItem
          key={product.name}
          item={product}
          quantity={order[product.name] || 0}
          onQuantityChange={updateQuantity}
        />
      );
    },
    [products, order, updateQuantity]
  );

  // Loading and empty state handling
  if (isLoading || !products?.length) {
    return (
      <ContentLayout className="error-layout">
        <ProductStatus isLoading={isLoading} products={products} />
      </ContentLayout>
    );
  }

  // Main render with product list and cart summary
  return (
    <>
      <div className="card-content">
        <h2 className="product-title">My Order</h2>
        <div className="product-list-container" role="list">
          <List
            height={WINDOW_HEIGHT}
            itemCount={products.length}
            itemSize={ITEM_HEIGHT}
            width="100%"
          >
            {Row}
          </List>
        </div>
      </div>

      <CartSummary
        totalAmount={totalAmount}
        buttonText="Order"
        onClick={handleCheckout}
        isDisabled={isCartEmpty}
        isLoading={isPending}
        buttonAriaLabel="Place Order"
        showTotal={true}
      />
    </>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default React.memo(ProductList);
