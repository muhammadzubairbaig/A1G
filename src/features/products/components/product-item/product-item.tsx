import React from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/common/button/button';
import './product-item.scss';
import { icons } from '@/features/products/config/order-icons';
import { ProductIcon } from '@/features/products/components/product-icon/product-icon';

interface ProductItemProps {
  /** Product data to display */
  item: Product;
  /** Current quantity in cart */
  quantity: number;
  /** Callback when quantity is changed */
  onQuantityChange: (name: string, quantity: number) => void;
}

/**
 * Product Item Component
 *
 * Displays an individual product with its details and quantity controls.
 * Features:
 * - Product icon and basic information display
 * - Quantity controls with increment/decrement buttons
 * - Out of stock handling
 * - Accessibility support
 * - Responsive layout
 *
 * Usage:
 * ```tsx
 * <ProductItem
 *   item={product}
 *   quantity={2}
 *   onQuantityChange={(name, qty) => handleQuantityChange(name, qty)}
 * />
 * ```
 */
const ProductItem: React.FC<ProductItemProps> = ({ item, quantity, onQuantityChange }) => {
  const isOutOfStock = !item.stock;

  const handleIncrement = React.useCallback(() => {
    if (quantity < item.stock) {
      onQuantityChange(item.name, quantity + 1);
    }
  }, [item.name, item.stock, quantity, onQuantityChange]);

  const handleDecrement = React.useCallback(() => {
    if (quantity > 0) {
      onQuantityChange(item.name, quantity - 1);
    }
  }, [item.name, quantity, onQuantityChange]);

  return (
    <div className="product-item" role="listitem">
      <div className="d-flex align-items-center">
        <div className={isOutOfStock ? 'out-of-stock' : ''}>
          <ProductIcon type={item.name as keyof typeof icons} />
        </div>

        <div className={`product-details ${isOutOfStock ? 'out-of-stock' : ''}`}>
          <h3 className="product-name">{item.name}</h3>
          <p className="product-price" aria-label={`Price: ${item.price} dollars`}>
            ${item.price.toFixed(2)}
          </p>
        </div>

        <div className="quantity-controls">
          <span className="quantity-value" aria-label={`Current quantity: ${quantity}`}>
            {quantity}
          </span>

          <Button
            onClick={handleDecrement}
            disabled={quantity === 0}
            aria-label={`Decrease quantity of ${item.name}`}
            className="quantity-button mx-1"
          >
            -
          </Button>

          <Button
            onClick={handleIncrement}
            disabled={quantity >= item.stock}
            aria-label={`Increase quantity of ${item.name}`}
            className="quantity-button mx-1"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductItem, (prevProps, nextProps) => {
  return (
    prevProps.quantity === nextProps.quantity &&
    prevProps.item.stock === nextProps.item.stock &&
    prevProps.item.price === nextProps.item.price
  );
});
