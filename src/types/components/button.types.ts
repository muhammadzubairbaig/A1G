import { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'default' | 'primary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content to be rendered inside the button */
  children: ReactNode;
  /** Additional CSS classes to apply to the button */
  className?: string;
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Shows loading spinner and disables button when true */
  isLoading?: boolean;
}
