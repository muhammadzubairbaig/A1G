import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/features/checkout/context/cart-context';
import { BrowserRouter } from 'react-router-dom';

// Create a custom render function that includes providers
export function renderWithProviders(
  ui: React.ReactElement,
  {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </CartProvider>
      </QueryClientProvider>
    );
  }

  return {
    queryClient,
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}

// Mock data for tests
export const mockProducts = [
  {
    name: 'Croissant',
    price: 2.99,
    stock: 10,
    description: 'Flaky, buttery pastry',
  },
  {
    name: 'Pretzel',
    price: 3.99,
    stock: 15,
    description: 'Soft, salty pretzel',
  },
];

// Mock API responses
export const mockApiResponses = {
  products: { storage: mockProducts },
  order: { message: 'Order placed successfully' },
};
