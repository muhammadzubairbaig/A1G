/**
 * Button Component
 *
 * A versatile button component that supports different variants,
 * loading states, and accessibility features.
 *
 * Features:
 * - Multiple variants (default, primary, secondary)
 * - Loading state with spinner
 * - Disabled state handling
 * - Accessibility support
 * - Customizable via className
 *
 * Props:
 * @param {ReactNode} children - Button content
 * @param {string} [className] - Additional CSS classes
 * @param {'default' | 'primary' | 'secondary'} [variant='default'] - Button style variant
 * @param {boolean} [isLoading=false] - Show loading spinner
 * @param {boolean} [disabled=false] - Disable button
 * @param {...ButtonHTMLAttributes<HTMLButtonElement>} props - Additional button props
 *
 * Accessibility:
 * - Uses semantic button element
 * - Supports ARIA attributes
 * - Handles disabled states
 * - Indicates loading state
 *
 * Usage:
 * ```tsx
 * // Default Button
 * <Button onClick={handleClick}>
 *   Click Me
 * </Button>
 *
 * // Primary Button with Loading
 * <Button
 *   variant="primary"
 *   isLoading={true}
 *   onClick={handleSubmit}
 * >
 *   Submit
 * </Button>
 *
 * // Disabled Secondary Button
 * <Button
 *   variant="secondary"
 *   disabled={true}
 *   onClick={handleAction}
 * >
 *   Action
 * </Button>
 * ```
 */

import React from 'react';
import { Spinner } from '@/components/common/spinner/spinner';
import { ButtonProps } from '@/types/components/button.types';
import './button.scss';

/**
 * Button Component
 * @see ../../../docs/components/Button.md
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'default',
  isLoading = false,
  disabled = false,
  ...props
}) => {
  const buttonClasses = [
    'button',
    `button-${variant}`,
    isLoading ? 'loading' : '',
    'd-inline-flex',
    'align-items-center',
    'justify-content-center',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isDisabled = isLoading || disabled;

  return (
    <div className="button-container">
      <button className={buttonClasses} disabled={isDisabled} aria-busy={isLoading} {...props}>
        {isLoading && (
          <span className="loading">
            <Spinner size="sm" />
            <span className="loading-text">Loading...</span>
          </span>
        )}
        {!isLoading && <span className="mx-2">{children}</span>}
      </button>
    </div>
  );
};
