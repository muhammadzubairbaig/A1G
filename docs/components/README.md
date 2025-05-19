# Component Documentation

## Common Components

### Button
A flexible button component that supports different variants and states.

```tsx
<Button 
  variant="primary"
  onClick={handleClick}
  disabled={isLoading}
>
  Submit
</Button>
```

[Detailed Button Documentation](./button.md)

### Card
A container component for consistent styling and structure.

```tsx
<Card className="custom-card">
  <h2>Card Title</h2>
  <p>Card content</p>
</Card>
```

[Detailed Card Documentation](./card.md)

### Spinner
Loading indicator component with size variants.

```tsx
<Spinner size="lg" />
```

[Detailed Spinner Documentation](./spinner.md)

## Feature Components

### ProductList
Virtualized list of product items with infinite scroll support.

```tsx
<ProductList 
  products={products}
  onProductSelect={handleSelect}
/>
```

### ProductItem
Individual product display with details.

```tsx
<ProductItem
  product={product}
/>
```

### ProductIcon
Product image component with fallback support.

```tsx
<ProductIcon
  src={product.image}
  alt={product.name}
/>
```

## Layout Components

### BakeryLayout
Main application layout with header and content areas.

```tsx
<BakeryLayout>
  <ProductList />
</BakeryLayout>
```

### ContentLayout
Content area layout with proper spacing and scrolling.

```tsx
<ContentLayout>
  {children}
</ContentLayout>
```

## Error Components

### MainError
Error boundary fallback component.

```tsx
<MainError
  error={error}
  resetErrorBoundary={resetError}
/>
```

## Component Best Practices

1. **Props Interface**
   - Define clear prop interfaces
   - Use proper TypeScript types
   - Document required vs optional props

2. **Error Handling**
   - Implement error boundaries
   - Handle loading states
   - Provide fallback UI

3. **Accessibility**
   - Use semantic HTML
   - Include ARIA attributes
   - Support keyboard navigation

4. **Performance**
   - Memoize when needed
   - Lazy load components
   - Optimize re-renders

5. **Testing**
   - Write unit tests
   - Test edge cases
   - Mock complex dependencies

## Styling Guidelines

1. **SCSS Modules**
   - Use BEM naming
   - Keep styles scoped
   - Utilize variables and mixins

2. **Responsive Design**
   - Mobile-first approach
   - Use breakpoints consistently
   - Test across devices

3. **Theme Support**
   - Use CSS variables
   - Support dark mode
   - Maintain consistency

## Component Development Workflow

1. **Planning**
   - Define requirements
   - Design component API
   - Plan test cases

2. **Implementation**
   - Write component code
   - Add documentation
   - Implement tests

3. **Review**
   - Code review
   - Test coverage
   - Documentation check

4. **Maintenance**
   - Monitor performance
   - Update dependencies
   - Address issues

## Component Structure

Each component follows a consistent structure:

```
ComponentName/
├── ComponentName.tsx      # Main component file
├── ComponentName.scss     # Styles
├── index.ts              # Exports
└── __tests__/           # Tests
    └── ComponentName.test.tsx
```

## Types

All component types are centralized in `src/types/components.types.ts` for better maintainability and reusability.

## Documentation

Each component's documentation includes:
- Features overview
- Usage examples
- Props documentation
- Accessibility considerations
- Styling information 