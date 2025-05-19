# Testing Guide

## Overview
This guide outlines the testing strategy and practices used in the A1G Frontend Challenge project.

## Testing Stack
- Vitest for test runner
- React Testing Library for component testing
- Jest DOM for DOM assertions
- MSW for API mocking

## Test Types

### Unit Tests
Tests for individual components and utilities.

```tsx
// Example Component Test
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Integration Tests
Tests for feature components and their interactions.

```tsx
// Example Feature Test
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductList } from './ProductList';

describe('ProductList', () => {
  it('loads and displays products', async () => {
    render(<ProductList />);
    await waitFor(() => {
      expect(screen.getByText('Product Name')).toBeInTheDocument();
    });
  });

  it('handles add to cart', async () => {
    render(<ProductList />);
    const addButton = await screen.findByRole('button', { name: /add/i });
    await userEvent.click(addButton);
    expect(screen.getByText('Added to cart')).toBeInTheDocument();
  });
});
```

### API Mocking
Using MSW to mock API responses.

```tsx
// API Mocks
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  rest.get('/api/storage', (req, res, ctx) => {
    return res(
      ctx.json({
        products: [
          { id: '1', name: 'Product 1', price: 10 },
          { id: '2', name: 'Product 2', price: 20 },
        ],
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Test Organization

### File Structure
```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.scss
│       └── __tests__/
│           └── Button.test.tsx
└── features/
    └── products/
        └── components/
            └── ProductList/
                ├── ProductList.tsx
                └── __tests__/
                    └── ProductList.test.tsx
```

### Naming Conventions
- Test files: `*.test.tsx`
- Test utilities: `*.test.utils.ts`
- Mock data: `*.mock.ts`

## Best Practices

### Component Testing
1. Test behavior, not implementation
2. Use semantic queries
3. Test accessibility
4. Mock external dependencies

```tsx
// Good Practice
test('submits form with user data', async () => {
  render(<Form />);
  
  await userEvent.type(
    screen.getByLabelText('Username'),
    'testuser'
  );
  
  await userEvent.click(
    screen.getByRole('button', { name: /submit/i })
  );
  
  expect(screen.getByText('Form submitted')).toBeInTheDocument();
});
```

### Query Priority
1. getByRole
2. getByLabelText
3. getByText
4. getByTestId

```tsx
// Preferred Queries
const submitButton = screen.getByRole('button', { name: /submit/i });
const usernameInput = screen.getByLabelText('Username');
const errorMessage = screen.getByText('Invalid input');
const customElement = screen.getByTestId('custom-element');
```

### Async Testing
Use proper async utilities:
- waitFor
- findBy queries
- act

```tsx
test('loads data asynchronously', async () => {
  render(<DataComponent />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

## Testing Hooks

### Custom Hook Tests
```tsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

## Context Testing

### Provider Wrapper
```tsx
const wrapper = ({ children }) => (
  <CartProvider>
    <ProductProvider>
      {children}
    </ProductProvider>
  </CartProvider>
);

test('uses context value', () => {
  render(<Component />, { wrapper });
  // Test implementation
});
```

## Error Testing

### Error Boundaries
```tsx
test('handles errors gracefully', () => {
  const spy = vi.spyOn(console, 'error');
  spy.mockImplementation(() => {});
  
  render(
    <ErrorBoundary fallback={<ErrorMessage />}>
      <ComponentThatThrows />
    </ErrorBoundary>
  );
  
  expect(screen.getByText('Error occurred')).toBeInTheDocument();
  spy.mockRestore();
});
```

## Coverage Requirements

### Minimum Coverage
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

### Running Coverage
```bash
npm run test:coverage
```

## CI/CD Integration

### GitHub Actions
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test
``` 