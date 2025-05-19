/**
 * Product Service
 *
 * Service class for handling product-related API operations.
 *
 * Features:
 * - Product data fetching
 * - Error handling
 * - Type safety
 *
 * API Endpoints:
 * - GET /api/storage - Fetch all products
 *
 * Error Handling:
 * - Throws descriptive errors
 * - Provides fallback empty array
 * - Handles network errors
 *
 * Usage:
 * ```typescript
 * // Get products
 * const products = await productService.getProducts();
 *
 * ```
 */

import { Product } from '@/types/product';
import apiClient from '@/lib/api-client';

/**
 * Service class for handling product-related operations
 */
export class ProductService {
  /** Singleton instance */
  private static instance: ProductService;

  /** Base URL for API endpoints */
  private readonly baseURL = '/api';

  /**
   * Get singleton instance
   * Creates new instance if none exists
   */
  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  /**
   * Fetch all products from the API
   *
   * Retrieves the complete list of available products.
   * Transforms API response to match application data model.
   *
   * @returns Promise<Product[]> List of products with stock information
   * @throws Error if API call fails or response is invalid
   *
   * Response Format:
   * ```json
   * {
   *   "storage": [
   *     {
   *       "name": "string",
   *       "price": "number",
   *       "stock": "number"
   *     }
   *   ]
   * }
   * ```
   */
  public async getProducts(): Promise<Product[]> {
    try {
      const { data } = await apiClient.get<{ storage: Product[] }>(`${this.baseURL}/storage`);
      return data.storage || [];
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }
}

export default ProductService.getInstance();
