# Products Feature

This feature handles all product-related functionality in the application.

## Directory Structure

```
products/
├── components/     # Product-specific components
├── hooks/          # Custom hooks for product functionality
├── services/       # API services for products
└── types/          # TypeScript types and interfaces
```

## Components

- `ProductList`: Displays a grid of products
- `ProductCard`: Individual product display
- `ProductFilters`: Product filtering interface

## Hooks

### useProducts

```tsx
import { useProducts } from '@/features/products/hooks';

const ProductsPage = () => {
  const { products, loading, error, filters, updateFilters } = useProducts({
    category: 'electronics',
    sortBy: 'price'
  });

  // Use the products data...
};
```

## Services

### ProductsService

Handles all API calls related to products:
- `getProducts(filters?)`: Fetch products with optional filtering
- `getProduct(id)`: Fetch a single product by ID

## Types

- `Product`: Product data structure
- `ProductsState`: State management type
- `ProductFilters`: Filtering options type

## Usage Example

```tsx
import { useProducts } from './hooks';
import { ProductList } from './components';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return <ProductList products={products} />;
};
``` 