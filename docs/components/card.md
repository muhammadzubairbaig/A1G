# Card Component

A flexible container component that provides consistent styling and structure.

## Features

- Customizable container element (div, section, article, etc.)
- Consistent padding and border styling
- Flexible height adaptation
- Custom class support for additional styling
- Accessibility support with proper ARIA roles

## Usage

```tsx
import Card from '@/components/common/Card';

// Basic usage
<Card>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>

// As a different HTML element
<Card as="section" className="custom-card">
  <h2>Section Card</h2>
  <p>This card is rendered as a section element</p>
</Card>

// With custom styling
<Card className="product-card">
  <img src="product.jpg" alt="Product" />
  <h3>Product Name</h3>
  <p>Product description</p>
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Content to be rendered inside the card |
| className | string | '' | Additional CSS classes to apply |
| as | ElementType | 'div' | HTML element type to render the card as |

## Accessibility

- Uses `role="region"` for better screen reader support
- Maintains proper heading hierarchy within cards
- Supports semantic HTML through the `as` prop

## Styling

The component uses several utility classes:
- `custom-card`: Base card styles
- `h-100`: Full height utilization
- `overflow-hidden`: Prevents content overflow
- Custom classes can be added through the `className` prop 