import React, { ReactNode } from 'react';
import './content-layout.scss';

interface ContentLayoutProps {
  /** Content to be rendered inside the layout */
  children: ReactNode;
  /** Additional CSS classes for styling */
  className?: string;
  /** ARIA role for accessibility */
  role?: string;
  /** ID of the element that labels this layout */
  ariaLabelledby?: string;
}

/**
 * Default Layout Component
 *
 * A base layout component that provides consistent spacing and styling.
 * Features:
 * - Flexible content container
 * - Customizable styling through className
 * - Built-in accessibility support
 * - Consistent padding and margins
 *
 * Usage:
 * ```tsx
 * <ContentLayout
 *   className="custom-section"
 *   role="region"
 *   ariaLabelledby="section-title"
 * >
 *   <h2 id="section-title">Section Title</h2>
 *   <p>Content goes here</p>
 * </ContentLayout>
 * ```
 */
export const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  className = '',
  role,
  ariaLabelledby,
}) => {
  const classes = `overflow-hidden p-0 content-layout ${className}`.trim();

  return (
    <div className={classes} role={role} aria-labelledby={ariaLabelledby}>
      {children}
    </div>
  );
};
