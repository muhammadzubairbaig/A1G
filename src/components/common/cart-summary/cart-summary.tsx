import React from 'react';
import { Button } from '@/components/common/button/button';
import './cart-summary.scss';

interface CartSummaryProps {
  /** Total amount to display (formatted as string) */
  totalAmount?: string;
  /** Text to display on the action button */
  buttonText: string;
  /** Handler function for button click */
  onClick: () => void;
  /** Shows loading spinner on button when true */
  isLoading?: boolean;
  /** Disables the button when true */
  isDisabled?: boolean;
  /** Accessibility label for the button */
  buttonAriaLabel?: string;
  /** Controls visibility of total amount section */
  showTotal?: boolean;
  /** Additional CSS classes for styling */
  className?: string;
}

/**
 * Cart Summary Component
 *
 * A versatile summary component typically used in shopping carts and checkout flows.
 * Features:
 * - Optional total amount display
 * - Configurable action button
 * - Loading and disabled states
 * - Accessibility support
 * - Responsive layout
 *
 * Usage:
 * ```tsx
 * <CartSummary
 *   totalAmount="99.99"
 *   buttonText="Checkout"
 *   onClick={handleCheckout}
 *   showTotal={true}
 *   isLoading={processing}
 * />
 * ```
 */
export const CartSummary: React.FC<CartSummaryProps> = ({
  totalAmount,
  buttonText,
  onClick,
  isLoading = false,
  isDisabled = false,
  buttonAriaLabel,
  showTotal = false,
  className = '',
}) => {
  return (
    <div className={`cart-summary bg-white ${className}`}>
      {showTotal && totalAmount && (
        <div
          className="product-total d-flex justify-content-between align-items-center"
          role="region"
          aria-label="Order total"
        >
          <h3 className="total-label mb-0">Total</h3>
          <span className="total-amount">${totalAmount}</span>
        </div>
      )}
      <Button
        variant="primary"
        onClick={onClick}
        isLoading={isLoading}
        disabled={isDisabled}
        aria-label={buttonAriaLabel}
        className={className}
      >
        {buttonText}
      </Button>
    </div>
  );
};
