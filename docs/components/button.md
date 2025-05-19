# Button Component

A versatile button component that supports multiple variants, loading states, and custom styling.

## Features

- Multiple visual variants (default, primary)
- Loading state with spinner
- Disabled state
- Custom styling through className
- All standard HTML button attributes
- Accessibility support

## Usage

```tsx
import Button from '@/components/common/Button';

// Basic usage
<Button onClick={handleClick}>
  Click me
</Button>

// Primary variant with loading state
<Button 
  variant="primary"
  isLoading={isSubmitting}
  onClick={handleSubmit}
>
  Submit
</Button>

// Disabled state
<Button disabled>
  Cannot click
</Button>

// Custom styling
<Button className="custom-button">
  Styled button
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Content to be rendered inside the button |
| className | string | '' | Additional CSS classes to apply |
| variant | 'default' \| 'primary' | 'default' | Visual style variant |
| isLoading | boolean | false | Shows loading spinner and disables button |
| disabled | boolean | false | Disables the button |
| ...props | ButtonHTMLAttributes | - | All standard HTML button attributes |

## Accessibility

- Uses proper ARIA attributes for loading state (`aria-busy`)
- Maintains focus states for keyboard navigation
- Provides visual feedback for different states 