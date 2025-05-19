/**
 * Cart Management Module
 *
 * This module provides cart functionality through React Context.
 * It manages the shopping cart state and operations across the application.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * Order Type Definition
 *
 * Represents the structure of an order in the cart:
 * - Keys are product names
 * - Values are quantities ordered
 *
 * Example:
 * {
 *   "Croissant": 2,
 *   "Pretzel": 1
 * }
 */
export interface Order {
  [key: string]: number;
}

/**
 * Cart Context Value Interface
 *
 * Defines the shape of the cart context value:
 * - order: Current state of the shopping cart
 * - setOrder: Direct state setter (use with caution)
 * - updateQuantity: Safe way to update product quantities
 * - clearOrder: Reset cart to empty state
 */
interface CartContextValue {
  /** Current order state mapping product names to quantities */
  order: Order;
  /** Function to directly set the entire order state */
  setOrder: (order: Order) => void;
  /** Updates quantity for a specific product */
  updateQuantity: (productName: string, quantity: number) => void;
  /** Clears the entire order */
  clearOrder: () => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

/**
 * Cart Context
 *
 * React Context instance for cart state management.
 * Initially set to null, will be populated by CartProvider.
 */
const CartContext = createContext<CartContextValue | null>(null);

/**
 * Cart Context Hook
 *
 * Custom hook to access cart functionality throughout the app.
 * Throws an error if used outside CartProvider.
 *
 * Usage:
 * ```tsx
 * const { order, updateQuantity } = useCartContext();
 * updateQuantity('Croissant', 2);
 * ```
 *
 * @throws {Error} When used outside of CartProvider
 * @returns {CartContextValue} Cart context value
 */
export const useCartContext = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

/**
 * Cart Provider Component
 *
 * Provides cart state and operations to the application.
 * Implements cart functionality:
 * - State management with useState
 * - Memoized update operations
 * - Order clearing capability
 *
 * Usage:
 * ```tsx
 * <CartProvider>
 *   <App />
 * </CartProvider>
 * ```
 */
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Initialize empty order state
  const [order, setOrder] = useState<Order>({});

  // Memoized quantity update function
  const updateQuantity = useCallback((productName: string, quantity: number) => {
    setOrder((prev) => ({
      ...prev,
      [productName]: quantity,
    }));
  }, []);

  // Memoized order clear function
  const clearOrder = useCallback(() => {
    setOrder({});
  }, []);

  // Construct context value
  const value: CartContextValue = {
    order,
    setOrder,
    updateQuantity,
    clearOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
