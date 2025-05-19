import React from 'react';
import { Product } from '@/types/product';
import { Spinner } from '@/components/common/spinner/spinner';

interface ProductStatusProps {
  /** Whether products are currently being loaded */
  isLoading: boolean;
  /** Array of products, undefined when loading or error */
  products: Product[] | undefined;
}

/**
 * Product Status Component
 *
 * Handles different states of the product list view:
 * - Loading state with spinner
 * - Empty state message
 * - Error state handling
 *
 * This component ensures a good user experience by:
 * - Showing appropriate feedback during data fetching
 * - Handling edge cases (empty results, errors)
 * - Maintaining consistent layout during state changes
 *
 * Usage:
 * ```tsx
 * <ProductStatus
 *   isLoading={isLoading}
 *   products={products}
 * />
 * ```
 */
export const ProductStatus: React.FC<ProductStatusProps> = ({ isLoading, products }) => {
  if (isLoading) {
    return <Spinner size="lg" />;
  }

  if (!products || products.length === 0) {
    return <div>No products available at the moment.</div>;
  }

  return null;
};
