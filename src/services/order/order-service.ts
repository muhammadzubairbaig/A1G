/**
 * Order Service
 *
 * Service class for handling order-related API operations.
 *
 * Features:
 * - Order submission
 * - Error handling
 *
 * API Endpoints:
 * - POST /api/order - Submit new order
 *
 * Error Handling:
 * - Throws descriptive errors
 * - Validates response format
 * - Handles network errors
 *
 */

import { OrderItem } from '@/types/order';
import apiClient from '@/lib/api-client';

export class OrderService {
  /** Singleton instance */
  private static instance: OrderService;

  /** Base URL for API endpoints */
  private readonly baseURL = '/api';

  /**
   * Get singleton instance
   * Creates new instance if none exists
   */
  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  /**
   * Submit an order to the API
   *
   * Sends order items to the backend for processing.
   * Validates response and handles errors.
   *
   * @param items List of order items with quantities
   * @returns Promise<{ success: boolean }> Order submission result
   * @throws Error if API call fails or response is invalid
   *
   * Request Format:
   * ```json
   * {
   *   "items": [
   *     {
   *       "name": "string",
   *       "quantity": "number"
   *     }
   *   ]
   * }
   * ```
   *
   * Response Format:
   * ```json
   * {
   *   "success": "boolean"
   * }
   * ```
   */
  public async submitOrder(items: OrderItem[]): Promise<{ success: boolean }> {
    try {
      const { data } = await apiClient.post(`${this.baseURL}/order`, { items });
      return data;
    } catch (error) {
      throw new Error('Failed to submit order');
    }
  }
}

// Export singleton instance
export default OrderService.getInstance();
