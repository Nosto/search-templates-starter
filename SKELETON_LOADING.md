# Skeleton Loading Pattern

This project includes a skeleton loading pattern for product cards as an alternative to the traditional spinner loader.

## Features

- **Animated shimmer effect** with CSS gradients
- **Configurable dimensions** via width/height props
- **Responsive design** matching product card breakpoints
- **Global configuration** to enable/disable skeleton loading

## Usage

### Enable Skeleton Loading

To enable skeleton loading globally, update the configuration in `src/config.ts`:

```typescript
export const defaultConfig = {
  // ... other config
  useSkeletonLoading: true // Enable skeleton loading
}
```

### Use Skeleton Component Directly

```typescript
import Skeleton from "@/elements/Skeleton/Skeleton"

// Basic usage
<Skeleton />

// With custom dimensions
<Skeleton width={300} height={400} />

// With string dimensions
<Skeleton width="100%" height="250px" />
```

### Structure

The skeleton includes:
- **Image placeholder**: Animated shimmer block
- **Full-width line**: 100% width text placeholder
- **Partial-width line**: 40% width text placeholder

## Implementation Details

When `useSkeletonLoading` is enabled:
- During loading states, skeleton placeholders are shown instead of actual product cards
- 6 skeleton cards are displayed by default during loading
- Once loading completes, actual product content replaces the skeletons
- The skeleton maintains the same responsive grid layout as product cards

## Testing

Run the skeleton tests:
```bash
npm test -- test/elements/Skeleton
```

View in Storybook:
```bash
npm run storybook
# Navigate to Elements/Skeleton
```