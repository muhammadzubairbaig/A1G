/**
 * Application Provider Component
 *
 * This component wraps the application with necessary context providers:
 * 1. React Query Provider
 *    - Manages server state
 *    - Handles data caching
 *    - Optimizes data fetching
 *
 * 2. Cart Context
 *    - Manages shopping cart state
 *    - Provides cart operations
 *    - Handles cart persistence
 *
 * 3. Error Boundary
 *    - Catches and handles errors
 *    - Provides fallback UI
 *    - Prevents app crashes
 *
 * 4. Toast Container
 *    - Manages notifications
 *    - Provides user feedback
 *    - Handles success/error states
 *
 * Props:
 * @param {ReactNode} children - Child components to be wrapped with providers
 *
 */

import { type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/features/checkout/context/cart-context';
import { MainErrorFallback } from '@/components/errors/main-error';

// Configure React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false,
    },
  },
});

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ErrorBoundary FallbackComponent={MainErrorFallback}>{children}</ErrorBoundary>
        <ToastContainer position="bottom-right" limit={1} />
      </CartProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
