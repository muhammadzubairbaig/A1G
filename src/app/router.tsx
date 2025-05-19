/**
 * Application Router Component
 *
 * Handles the application's routing configuration using React Router.
 * Implements a code-split routing strategy for better performance.
 *
 * Routes:
 * - / (Home): Product listing page
 * - /checkout: Order checkout page
 * - * (404): Not found page
 *
 * Features:
 * - Lazy loading of route components
 * - Loading states during component loading
 * - Error boundaries for route errors
 * - Nested routes with layout
 * - Centralized route configuration
 *
 * Implementation:
 * - Uses React Router v6
 * - Implements nested routes
 * - Handles route transitions
 */

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from '@/components/common/spinner/spinner';
import { BakeryLayout } from '@/components/layouts/bakery-layout/bakery-layout';
import { ROUTES } from '@/config/routes';

// Lazy-loaded page components
const HomePage = lazy(() => import('@/pages/home'));
const CheckoutPage = lazy(() => import('@/pages/checkout'));
const NoPageFound = lazy(() => import('@/pages/no-page-found/no-page-found'));

const AppRouter = () => {
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <Routes>
        <Route element={<BakeryLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NoPageFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
