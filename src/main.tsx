/**
 * Application Entry Point
 *
 * This file serves as the main entry point for the React application.
 * It sets up the root React component and necessary providers:
 * - React Query for data fetching and caching
 * - React Router for navigation
 * - Error Boundary for error handling
 * - Toast notifications for user feedback
 *
 * The application uses:
 * - Bootstrap for base styling
 * - Custom SCSS for component-specific styles
 * - CSS variables for theming
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

// Fonts
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';
import '@/index.css';

// Components
import { App } from '@/app';
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

// Create root element for React
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render application with providers
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ToastContainer position="bottom-right" />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
