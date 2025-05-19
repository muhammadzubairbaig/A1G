# Spinner Component

A loading indicator component that supports different sizes and custom styling.

## Features

- Multiple size variants (sm, lg)
- Custom styling support
- Accessibility support
- Animated loading indicator
- Consistent styling across the application

## Usage

```tsx
import Spinner from '@/components/common/Spinner';

// Default large spinner
<Spinner />

// Small spinner (useful in buttons or inline)
<Spinner size="sm" />

// Custom styled spinner
<Spinner className="custom-spinner" />

// Usage in loading states
{isLoading ? (
  <Spinner />
) : (
  <Content />
)}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | 'sm' \| 'lg' | 'lg' | Size variant of the spinner |
| className | string | '' | Additional CSS classes to apply |

## Accessibility

- Uses `role="status"` for screen reader support
- Includes `aria-label="Loading"` for clear indication of purpose
- Maintains visibility for all users

## Styling

The component includes several size-specific classes:
- `spinner`: Base spinner styles
- `spinner-lg`: Large spinner styles (default)
- `spinner-sm`: Small spinner styles
- `spinner-circle`: The animated circle element

CSS animations are used for smooth rotation animation. 