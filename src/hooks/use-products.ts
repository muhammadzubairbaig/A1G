import { useQuery } from '@tanstack/react-query';
import productService from '@/services/product/product-service';
import { QUERY_KEYS } from '@/constants/query-keys';

/**
 * Products Data Hook
 *
 * Manages product data fetching and caching.
 * Features:
 * - Automatic data fetching
 * - Caching with configurable stale time
 * - Background updates
 * - Error handling
 *
 * The hook provides:
 * - Product data
 * - Loading states
 * - Error states
 * - Refetch functionality
 *
 * Usage:
 * ```tsx
 * const { data: products, isLoading, error } = useProducts();
 *
 * if (isLoading) return <Loading />;
 * if (error) return <Error />;
 *
 * return (
 *   <div>
 *     {products.map(product => (
 *       <ProductItem key={product.name} product={product} />
 *     ))}
 *   </div>
 * );
 * ```
 *
 * @returns Query result containing products data and state
 */
export const useProducts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: () => productService.getProducts(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};
