/**
 * Root Application Component
 *
 * This is the main application component that sets up:
 * 1. Application providers (AppProvider)
 *    - Cart context
 *    - Other global contexts
 *
 * 2. Routing (AppRouter)
 *    - Route configuration
 *    - Navigation handling
 *
 * The component follows a modular architecture where providers
 * and routing are separated into their own components for
 * better maintainability and testing.
 */

import AppProvider from '@/app/provider';
import AppRouter from '@/app/router';

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
