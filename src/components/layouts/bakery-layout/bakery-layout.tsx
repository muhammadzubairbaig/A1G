import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card } from '@/components/common/card/card';
import './bakery-layout.scss';

/**
 * Bakery Layout Component
 *
 * Main layout component for the bakery application.
 * Features:
 * - Consistent page structure across routes
 * - Responsive container sizing
 * - Card-based content presentation
 * - Route-based content rendering via Outlet
 *
 * This component serves as the primary layout wrapper,
 * ensuring consistent styling and structure across all pages.
 * It uses the Card component to provide a clean, elevated surface
 * for content display.
 */
export const BakeryLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Card className="card-section" as="main">
        <Outlet />
      </Card>
    </div>
  );
};
