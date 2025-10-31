# View Transitions API - Product Card to Modal Morph Animation

This document describes the implementation of the View Transitions API for morphing product cards into modals.

## Overview

When a user clicks the "Add to cart" button on a product card, the product image smoothly morphs from the card into the modal, creating a seamless visual transition. When the modal closes, the animation reverses, with the image morphing back to its original position in the product card.

## Implementation

The implementation uses the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) with the following key components:

### 1. View Transition Utility (`src/utils/viewTransition.ts`)

```typescript
export function startViewTransition(callback: () => Promise<void> | void) {
  if (document.startViewTransition) {
    document.startViewTransition(callback)
  } else {
    callback()
  }
}

export function getProductImageTransitionName(productId?: string): string | undefined {
  return productId ? `product-image-${productId}` : undefined
}
```

These utility functions provide:
- Graceful degradation for browsers that don't support the View Transitions API
- Consistent naming for product image transitions across components

### 2. Product Card Image (`src/components/Product/Product.tsx`)

The product card assigns a unique `view-transition-name` to the main product image:

```typescript
import { getProductImageTransitionName } from "@/utils/viewTransition"

const viewTransitionName = getProductImageTransitionName(product.productId)

<ProductImage
  src={product.imageUrl!}
  alt={product.name}
  className={styles.img}
  style={viewTransitionName ? { viewTransitionName } : undefined}
/>
```

### 3. Modal Image (`src/components/QuickAdd/Modal.tsx`)

The modal uses the same utility to generate a matching `view-transition-name`:

```typescript
import { getProductImageTransitionName } from "@/utils/viewTransition"

const viewTransitionName = getProductImageTransitionName(product.productId)

<ProductImage
  src={data.imageUrl!}
  alt={product.name}
  className={styles.image}
  style={viewTransitionName ? { viewTransitionName } : undefined}
/>
```

### 4. State Transitions (`src/components/QuickAdd/QuickAdd.tsx`)

Modal open/close operations are wrapped with `startViewTransition`:

```typescript
const openModal = useCallback((e: Event) => {
  e.preventDefault()
  startViewTransition(() => setShowModal(true))
}, [])

const closeModal = useCallback((e: Event) => {
  e.preventDefault()
  startViewTransition(() => setShowModal(false))
}, [])
```

## Browser Support

The View Transitions API is supported in:
- Chrome 111+
- Edge 111+
- Opera 97+

For browsers that don't support the API, the modal will still open and close normally without the morph animation (graceful degradation).

## Before/After Comparison

| Before | After |
|--------|-------|
| ![Product card with hover](https://github.com/user-attachments/assets/d8d970cf-33df-4ec8-a0a4-b62a8baa94ee) | ![Modal open](https://github.com/user-attachments/assets/97d66216-932c-48b4-941a-87a88f62b255) |
| Product card showing the "Add to cart" button on hover | Modal displayed with smooth morph animation from card |

### Animation Behavior

1. **Opening**: When clicking "Add to cart", the product image appears to grow and move from its position in the card to its final position in the modal
2. **Closing**: When closing the modal (via close button or clicking outside), the animation reverses, with the image shrinking back to the card's position

## Technical Details

- **Unique Names**: Each product gets a unique `view-transition-name` based on its `productId` to prevent conflicts
- **Missing Product ID**: If a product doesn't have a `productId`, no view-transition-name is assigned, and the modal will open/close without the morph animation (falling back to the standard fade animation)
- **CSS Property**: The `viewTransitionName` is applied as an inline style to ensure it takes precedence
- **Synchronization**: Both the source (card) and destination (modal) elements must have the same `view-transition-name` for the browser to animate between them
- **Timing**: The browser automatically handles the timing and easing of the animation
