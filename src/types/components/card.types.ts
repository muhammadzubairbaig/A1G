import { ReactNode, ElementType } from 'react';

export interface CardProps {
  /** Content to be rendered inside the card */
  children: ReactNode;
  /** Additional CSS classes to apply to the card */
  className?: string;
  /** HTML element type to render the card as (default: div) */
  as?: ElementType;
}
