import React from 'react';
import { CardProps } from '@/types/components/card.types';
import './card.scss';

/**
 * Card Component
 *
 * A flexible container component that provides consistent styling and structure.
 * Features:
 * - Customizable container element (div, section, article, etc.)
 * - Consistent padding and border styling
 * - Custom class support for additional styling
 *
 * @example
 * ```tsx
 * <Card as="section" className="custom-card">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({ children, className = '', as: Component = 'div' }) => {
  const cardClasses = ['custom-card', 'h-100', 'overflow-hidden', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={cardClasses} role="region">
      {children}
    </Component>
  );
};
