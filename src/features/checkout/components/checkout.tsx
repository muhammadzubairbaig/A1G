/**
 * Checkout Success Component
 *
 * Displays the order confirmation page after a successful order submission.
 * Features:
 * - Order confirmation message
 * - Celebratory animation
 * - Option to place new order
 * - Responsive layout
 *
 * Navigation:
 * - Accessed after successful order submission
 * - Provides button to return to product list
 *
 * Visual Elements:
 * - Fireworks celebration icon
 * - Success message
 * - Thank you message
 * - Call to action button
 *
 * Accessibility:
 * - Proper image alt text
 * - Semantic heading structure
 * - ARIA labels for buttons
 *
 * Usage:
 * ```tsx
 * <Route path="/checkout" element={<Checkout />} />
 * ```
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartSummary } from '@/components/common/cart-summary/cart-summary';
import OrderConfirmationIcon from '@/assets/images/fireworks.png';
import { ContentLayout } from '@/components/layouts/content-layout/content-layout';

/**
 * SuccessPage component for displaying order confirmation
 */
const Checkout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="card-content confirmation-section">
        <h2 className="product-title">Order received</h2>
        <ContentLayout className="success-layout">
          <img
            src={OrderConfirmationIcon}
            alt="Order confirmation fireworks"
            width={200}
            height={200}
          />
          <h2 className="heading">Thank you!</h2>
          <p className="subheading">We have successfully received your order.</p>
        </ContentLayout>
      </div>

      <CartSummary
        buttonText="Submit another order"
        onClick={() => navigate('/')}
        buttonAriaLabel="Place New Order"
        className="mt-2"
      />
    </>
  );
};

export default Checkout;
