/**
 * Product Icon Component
 *
 * Props:
 * @param {ItemType} type - Product type that maps to an icon
 *
 * Features:
 * - Automatic icon selection based on product type
 * - Fallback to default icon if type not found
 * - Lazy loading for better performance
 * - Proper alt text for accessibility
 *
 * Usage:
 * ```tsx
 * // Basic usage
 * <ProductIcon type="Bread" />
 *
 * // With custom styling
 * <ProductIcon type="Cake" className="large-icon" />
 *
 * // In a product list
 * products.map(product => (
 *   <ProductIcon key={product.id} type={product.type} />
 * ))
 * ```
 */

import React from 'react';
import { icons, type ItemType } from '@/features/products/config/order-icons';

interface ProductIconProps {
  /** Product type that maps to an icon in the icons configuration */
  type: ItemType;
}

/**
 * Renders an icon for an order item based on its type
 * @param {Object} props
 * @param {string} props.type - Item type (e.g., Bread, Cake)
 */
export const ProductIcon: React.FC<ProductIconProps> = ({ type }) => {
  // Get icon source with fallback to NoImage
  const iconSrc = icons[type] || icons.NoImage;

  return <img src={iconSrc} alt={`${String(type)} icon`} className="product-icon" loading="lazy" />;
};
