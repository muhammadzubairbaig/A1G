# Style Guide

## Design System

### Colors
```scss
// Brand Colors
--primary: #0061FF;      // Primary brand color
--secondary: #F5F5F5;    // Secondary color
--default: #6C757D;      // Default state color

// Background Colors
--card-bg: #FFFFFF;      // Card background
--light-bg: #F8F9FA;     // Light background

// Text Colors
--text: #212529;         // Main text color
--white: #FFFFFF;        // White text

// Border Colors
--border: #DEE2E6;       // Border color
```

### Typography

#### Font Sizes
```scss
// Base Typography
$font-size-base: 16px;    // Base text
$font-size-lg: 18px;      // Large text
$font-size-xl: 20px;      // Extra large text

// Font Weights
$font-weight-bold: 700;   // Bold text
```

### Spacing
```scss
// Spacing Scale
$spacing-xs: 0.5rem;      // 8px
$spacing-sm: 0.75rem;     // 12px
$spacing-md: 1rem;        // 16px
$spacing-lg: 1.5rem;      // 24px
```

### Layout

#### Container Sizes
```scss
$container-max-width: 300px;         // Maximum container width
$product-list-max-height: 440px;     // Product list height
```

#### Border Radius
```scss
$card-border-radius: 28px;           // Card corners
```

#### Shadows
```scss
$card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05),
             0 1px 3px rgba(0, 0, 0, 0.1);
```

## Components

### Buttons

#### Primary Button
```jsx
<button className="button button-primary">
  Submit
</button>
```

#### Disabled State
```jsx
<button className="button button-primary" disabled>
  Loading...
</button>
```

### Cards

#### Basic Card
```jsx
<div className="custom-card">
  <h2>Card Title</h2>
  <p>Card content</p>
</div>
```

### Loading States

#### Spinner
```jsx
<div className="spinner spinner-lg">
  <div className="spinner-circle"></div>
</div>
```

## CSS Architecture

### BEM Naming Convention
```scss
.block {
  &__element {
    &--modifier {
      // Styles
    }
  }
}
```

### Common Mixins

#### Flex Center
```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### Hide Scrollbar
```scss
@mixin hide-scrollbar {
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

## Best Practices

### CSS Organization
1. Use SCSS modules for component styles
2. Follow BEM naming convention
3. Utilize variables and mixins
4. Keep styles scoped to components

### Responsive Design
1. Use relative units (rem, em)
2. Implement mobile-first approach
3. Use breakpoints consistently
4. Test across devices

### Performance
1. Minimize CSS specificity
2. Use CSS modules for scoping
3. Implement efficient selectors
4. Avoid deep nesting

### Accessibility
1. Use semantic HTML
2. Maintain color contrast
3. Support keyboard navigation
4. Test with screen readers

## Code Examples

### Component Structure
```tsx
// Component
import styles from './Component.module.scss';

export const Component = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
      <p className={styles.content}>Content</p>
    </div>
  );
};

// SCSS Module
.container {
  @include card-container;
  
  .title {
    @include title-text;
  }
  
  .content {
    font-size: $font-size-base;
    color: $text;
  }
}
```

### Layout Patterns
```scss
// Grid Layout
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $spacing-md;
}

// Flex Layout
.flex-container {
  @include flex-between;
  padding: $spacing-md;
}
```

## Theme Support

### CSS Variables
```css
:root {
  --primary: #0061FF;
  --text-color: #212529;
  --background: #FFFFFF;
}

[data-theme="dark"] {
  --primary: #3B82F6;
  --text-color: #F8F9FA;
  --background: #1F2937;
}
```

### Usage
```scss
.element {
  color: var(--text-color);
  background: var(--background);
}
``` 