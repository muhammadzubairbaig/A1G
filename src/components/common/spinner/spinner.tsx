import React from 'react';
import './spinner.scss';
import { SpinnerProps } from '@/types/components/spinner.types';

/**
 * Spinner Component
 *
 * A loading indicator component that supports different sizes and custom styling.
 * Features:
 * - Multiple size variants (sm, lg)
 * - Custom styling support
 * - Accessibility support
 * - Animated loading indicator
 *
 * @example
 * ```tsx
 * // Default large spinner
 * <Spinner />
 *
 * // Small spinner
 * <Spinner size="sm" />
 *
 * // Custom styled spinner
 * <Spinner className="custom-spinner" />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({ size = 'lg', className = '' }) => {
  const spinnerClasses = ['spinner', `spinner-${size}`, className].filter(Boolean).join(' ');

  return (
    <div className={spinnerClasses} role="status" aria-label="Loading">
      <div className="spinner-circle" />
    </div>
  );
};
