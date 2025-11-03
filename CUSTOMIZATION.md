# Customization Guide

This guide provides detailed instructions for common customization patterns in the Search Templates Starter. Use these examples to tailor the search experience to your store's needs.

## Table of Contents

- [Product Image Aspect Ratios](#product-image-aspect-ratios)
- [Dynamic Product Cards](#dynamic-product-cards)
- [Search Page Redirect](#search-page-redirect)
- [Autocomplete Category & Popular Results](#autocomplete-category--popular-results)
- [Custom Product Fields](#custom-product-fields)
- [Troubleshooting](#troubleshooting)

## Product Image Aspect Ratios

Product images in the starter use responsive sizing by default. You can customize aspect ratios and image sizing behavior in multiple components.

### Default Configuration

The default image configuration is defined in [`src/components/Product/imageProps.ts`](src/components/Product/imageProps.ts):

```typescript
// Shared responsive image sizing configuration
export const imageSizes = `(min-width: 1024px) 25vw,
    (min-width: 768px) 33.33vw,
    (min-width: 375px) 50vw,
    100vw`

const windowWidth = window.innerWidth

const breakpoints = [320, 480, 640, 750, 828, 960, 1024, 1280, 1440, 1600, 1920].filter(
  bp => bp >= windowWidth / 4 && bp <= windowWidth
)

export const imageProps = {
  width: 750,
  sizes: imageSizes,
  fetchpriority: "high",
  breakpoints
} as const
```

### Customizing Image Aspect Ratios

To modify aspect ratios for product images:

#### Option 1: Update imageProps.ts

Change the `width` property and adjust the `imageSizes` media queries:

```typescript
// For square images (1:1 aspect ratio)
export const imageProps = {
  width: 800,
  sizes: `(min-width: 1024px) 300px,
          (min-width: 768px) 250px,
          200px`,
  fetchpriority: "high",
  breakpoints: [200, 250, 300, 400, 500, 600, 800]
} as const

// For portrait images (3:4 aspect ratio)
export const imageProps = {
  width: 600,
  sizes: `(min-width: 1024px) 400px,
          (min-width: 768px) 300px,
          200px`,
  fetchpriority: "high",
  breakpoints: [200, 300, 400, 600]
} as const
```

#### Option 2: CSS-Based Aspect Ratio Control

Add aspect ratio styles in [`src/components/Product/Product.module.css`](src/components/Product/Product.module.css):

```css
.image {
  position: relative;
  aspect-ratio: 1 / 1; /* Square images */
  overflow: hidden;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* For portrait orientation */
.image {
  aspect-ratio: 3 / 4;
}

/* For landscape orientation */
.image {
  aspect-ratio: 16 / 9;
}
```

### ProductImage Component

The [`ProductImage`](src/components/Product/ProductImage.tsx) component automatically applies `imageProps` for Shopify CDN images:

```typescript
export default function ProductImage(props: Props) {
  if (props.src.includes("cdn.shopify.com")) {
    return <Image {...props} {...imageProps} />
  }
  return <img {...props} alt={props.alt || ""} />
}
```

To customize for different platforms, modify the conditional logic:

```typescript
export default function ProductImage(props: Props) {
  // Custom logic for different CDNs
  if (props.src.includes("cdn.shopify.com")) {
    return <Image {...props} {...imageProps} />
  }
  if (props.src.includes("your-cdn.com")) {
    return <Image {...props} {...customImageProps} />
  }
  return <img {...props} alt={props.alt || ""} />
}
```

## Dynamic Product Cards

The starter includes support for dynamic product cards using Shopify's liquid templates via the `nosto-dynamic-card` custom element.

### DynamicCard Component

The [`DynamicCard`](src/elements/DynamicCard/DynamicCard.tsx) component is a wrapper for the `@nosto/web-components` custom element:

```typescript
/**
 * A custom element wrapper that renders a product by fetching the markup 
 * from Shopify based on the provided handle and template.
 */
export default function DynamicCard(props: DynamicCardProps) {
  return <nosto-dynamic-card {...props} />
}
```

### Usage with DynamicCardProduct

The [`DynamicCardProduct`](src/components/Product/DynamicCardProduct.tsx) component demonstrates how to use dynamic cards:

```typescript
export default function DynamicCardProduct({ product }: { product: Product }) {
  return (
    <SerpElement
      as={DynamicCard}
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        handle: product.handle!,
        template: "card",
        className: styles.container
      }}
    />
  )
}
```

### Creating Custom Templates

To use custom Shopify liquid templates with dynamic cards:

1. **Create a liquid template** in your Shopify theme (e.g., `snippets/product-card-custom.liquid`)

2. **Update the template prop**:

```typescript
<DynamicCard
  handle={product.handle}
  template="product-card-custom"  // Your custom template name
  className={styles.container}
/>
```

3. **Switch between standard and dynamic rendering**:

```typescript
import Product from "./Product"
import DynamicCardProduct from "./DynamicCardProduct"

// Use standard rendering
<Product product={product} />

// Use dynamic Shopify template rendering
<DynamicCardProduct product={product} />
```

### When to Use Dynamic Cards

**Use DynamicCard when:**
- You want to leverage existing Shopify liquid templates
- You need to maintain consistency with your theme's product card styling
- You want to use Shopify-specific features like quick buy, variant selection

**Use standard Product component when:**
- You need full control over the product card HTML/CSS
- You're not on Shopify or don't have access to liquid templates
- You want faster rendering without additional HTTP requests

## Search Page Redirect

The starter supports automatic redirects for search keywords using the `_redirect` field from the search backend.

### How It Works

When a user clicks on an autocomplete keyword with a redirect URL, they are automatically redirected instead of performing a search. This is implemented in [`src/components/Autocomplete/Item/Keyword.tsx`](src/components/Autocomplete/Item/Keyword.tsx):

```typescript
<AutocompleteElement
  hit={keyword}
  componentProps={{
    onClick: (e: Event) => {
      e.preventDefault()
      if (keyword._redirect) {
        window.location.href = keyword._redirect
      } else {
        onSubmit(keyword.keyword, { isKeyword: true })
      }
    }
  }}
>
  {keyword.keyword}
</AutocompleteElement>
```

### Enabling Search Redirects

To enable redirects, ensure your search backend returns the `_redirect` field in keyword results. This is typically configured in your Nosto account's search settings.

### Customizing Redirect Behavior

You can customize redirect behavior by modifying the `onClick` handler:

```typescript
// Open redirects in new tab
// Note: Consider validating redirect URLs against an allowlist for security
if (keyword._redirect) {
  window.open(keyword._redirect, '_blank')
  return
}

// Add analytics before redirect
if (keyword._redirect) {
  nostojs(api => api.recordSearchRedirect(keyword.keyword, keyword._redirect))
  window.location.href = keyword._redirect
  return
}

// Conditional redirects based on URL pattern
if (keyword._redirect) {
  if (keyword._redirect.includes('/collections/')) {
    // Handle collection redirects differently
    handleCollectionRedirect(keyword._redirect)
  } else {
    window.location.href = keyword._redirect
  }
  return
}
```

### Search Result Page Redirects

To enable redirects on the main search results page (not just autocomplete), you can add similar logic to your search submission handler in [`src/entries/injected.tsx`](src/entries/injected.tsx) or [`src/entries/native.tsx`](src/entries/native.tsx):

```typescript
const onSubmit = useCallback(
  (query: string, options?: SearchAnalyticsOptions) => {
    // Check if this search term has a redirect
    // Note: Implement checkForRedirect based on your backend configuration
    const redirectUrl = checkForRedirect(query)
    if (redirectUrl) {
      window.location.href = redirectUrl
      return
    }
    
    nostojs(api => api.recordSearchSubmit(query))
    newSearch({ query }, options)
  },
  [newSearch]
)
```

## Autocomplete Category & Popular Results

The starter supports category suggestions and popular search results in autocomplete dropdowns. These features are disabled by default but can be easily enabled.

### Configuration Location

Autocomplete configuration is defined in [`src/config.ts`](src/config.ts) within the `autocompleteConfig` object:

```typescript
export const autocompleteConfig = {
  ...baseConfig,
  memoryCache: true,
  historyEnabled: true,
  historySize: 10,
  search: {
    hitDecorators: [
      ...hitDecorators,
      thumbnailDecorator({ size: "8" }) // 400x400
    ]
  },
  queryModifications: withAutocompleteDefaults
} satisfies AutocompleteConfig
```

### Enabling Popular Searches

Uncomment the `popularSearches` configuration in the `withAutocompleteDefaults` function:

```typescript
function withAutocompleteDefaults(query: SearchQuery) {
  return {
    ...query,
    products: {
      ...query.products,
      size: 5
    },
    keywords: {
      fields: ["keyword", "_highlight.keyword"],
      size: 5,
      facets: ["*"]
    },
    // Enable popular searches
    popularSearches: {
      fields: ["query"],
      size: 5
    }
  } satisfies SearchQuery
}
```

#### Customizing Popular Searches

```typescript
popularSearches: {
  fields: ["query", "count"],  // Include search count
  size: 10,                     // Show more results
  // Add filters if needed
  filters: {
    minCount: 100  // Only show searches with 100+ occurrences
  }
}
```

### Enabling Category Suggestions

Uncomment the `categories` configuration:

```typescript
function withAutocompleteDefaults(query: SearchQuery) {
  return {
    ...query,
    products: {
      ...query.products,
      size: 5
    },
    keywords: {
      fields: ["keyword", "_highlight.keyword"],
      size: 5,
      facets: ["*"]
    },
    // Enable category suggestions
    categories: {
      fields: ["name", "url"],
      size: 5
    }
  } satisfies SearchQuery
}
```

#### Customizing Category Display

You can customize which fields are fetched and displayed:

```typescript
categories: {
  fields: [
    "name",           // Category name
    "url",            // Category URL
    "categoryId",     // Category ID
    "imageUrl",       // Category image
    "productCount"    // Number of products
  ],
  size: 8,            // Number of categories to show
  // Add filters to only show certain categories
  filters: {
    level: 1  // Only top-level categories
  }
}
```

### Display Components

The autocomplete results are rendered in [`src/components/Autocomplete/Results/Results.tsx`](src/components/Autocomplete/Results/Results.tsx):

```typescript
export default function Results({ onKeyDown }: ResultsProps) {
  const { categories, keywords, products, popularSearches } = useResponse()
  
  return (
    <div className={style.autocomplete}>
      <div className={style.container}>
        <div className={style.items}>
          <div className={style.section}>
            <History />
            <Keywords keywords={keywords} />
            <Categories categories={categories} />
            <PopularSearches searches={popularSearches} />
          </div>
          <Products products={products} />
        </div>
      </div>
    </div>
  )
}
```

The individual section components handle their own visibility based on data availability.

### Adjusting Result Counts

To change how many results appear in each section:

```typescript
function withAutocompleteDefaults(query: SearchQuery) {
  return {
    ...query,
    products: {
      size: 6        // Show 6 products (default: 5)
    },
    keywords: {
      fields: ["keyword", "_highlight.keyword"],
      size: 8        // Show 8 keyword suggestions (default: 5)
    },
    popularSearches: {
      fields: ["query"],
      size: 3        // Show 3 popular searches (default: 5)
    },
    categories: {
      fields: ["name", "url"],
      size: 4        // Show 4 categories (default: 5)
    }
  } satisfies SearchQuery
}
```

## Custom Product Fields

You can customize which product fields are fetched and displayed for different query types (SERP, category, autocomplete).

### Default Product Fields

Product fields are configured through the `@nosto/search-js` library's query system. The fetched fields are automatically determined by the library based on the decorators and configurations you provide.

### Modifying Fields with Query Modifications

The starter uses `queryModifications` functions to customize queries for different page types.

#### Base Configuration (All Queries)

Located in [`src/config.ts`](src/config.ts):

```typescript
function withBaseConfig(query: SearchQuery) {
  return {
    ...query,
    products: {
      size: defaultConfig.serpSize,
      ...query.products
      // Add currency support
      // currency: tagging.variation() ?? defaultCurrency
      
      // Add price variation support
      // variationId: tagging.variation() ?? defaultCurrency
    }
  } satisfies SearchQuery
}
```

#### Autocomplete-Specific Fields

```typescript
function withAutocompleteDefaults(query: SearchQuery) {
  return {
    ...query,
    products: {
      ...query.products,
      size: 5,
      // Request specific fields for autocomplete
      fields: [
        "productId",
        "name",
        "url",
        "imageUrl",
        "price",
        "brand"
        // Add more fields as needed
      ]
    },
    keywords: {
      fields: ["keyword", "_highlight.keyword"],
      size: 5,
      facets: ["*"]
    }
  } satisfies SearchQuery
}
```

#### Category Page Fields

```typescript
function withCategoryMetadata(query: SearchQuery) {
  const augmented = withBaseConfig(query)
  return {
    ...augmented,
    products: {
      categoryId: tagging.categoryId(),
      categoryPath: tagging.categoryPath(),
      ...augmented.products,
      // Add category-specific fields
      fields: [
        "productId",
        "name",
        "url",
        "imageUrl",
        "alternateImageUrls",
        "price",
        "listPrice",
        "brand",
        "customFields"  // Include custom fields
      ]
    }
  } satisfies SearchQuery
}
```

#### SERP (Search Results Page) Fields

The SERP configuration uses `baseConfig` by default. To add custom fields:

```typescript
export const serpConfig = {
  ...baseConfig,
  persistentSearchCache: false,
  preservePageScroll: false,
  queryModifications: (query: SearchQuery) => {
    const augmented = withBaseConfig(query)
    return {
      ...augmented,
      products: {
        ...augmented.products,
        fields: [
          "productId",
          "name",
          "url",
          "imageUrl",
          "alternateImageUrls",
          "price",
          "listPrice",
          "priceText",
          "listPriceText",
          "brand",
          "availability",
          "ratingValue",
          "reviewCount",
          "datePublished",
          "tags",
          "customFields"
        ]
      }
    }
  }
} satisfies SerpConfig
```

### Working with Custom Fields

Custom fields from your product data can be accessed through the `Product` type:

```typescript
import { Product } from "@/types"

function CustomProductComponent({ product }: { product: Product }) {
  // Access standard fields
  const name = product.name
  const price = product.price
  
  // Access custom fields (if configured in your Nosto account)
  const customField = product.customFields?.['your-custom-field']
  
  return (
    <div>
      <h3>{name}</h3>
      <span>{price}</span>
      {customField && <div>{customField}</div>}
    </div>
  )
}
```

### Decorators for Field Transformation

Hit decorators transform product data after it's fetched. The default decorators are defined in [`src/config.ts`](src/config.ts):

```typescript
export const hitDecorators = [handleDecorator, priceDecorator()] as const
```

#### Creating Custom Decorators

To add custom field transformations, create a new decorator:

```typescript
import { createHitDecorator } from "@nosto/search-js"

// Example: Add a computed field
export const customFieldDecorator = createHitDecorator((product) => ({
  ...product,
  isNewArrival: product.datePublished 
    ? product.datePublished >= Date.now() - 30 * 24 * 60 * 60 * 1000
    : false,
  formattedBrand: product.brand?.toUpperCase()
}))

// Add to hit decorators
export const hitDecorators = [
  handleDecorator, 
  priceDecorator(), 
  customFieldDecorator
] as const
```

#### Autocomplete-Specific Decorators

The autocomplete configuration includes a thumbnail decorator:

```typescript
export const autocompleteConfig = {
  ...baseConfig,
  search: {
    hitDecorators: [
      ...hitDecorators,
      thumbnailDecorator({ size: "8" }) // 400x400 images
    ]
  }
}
```

Adjust the thumbnail size or add additional decorators:

```typescript
search: {
  hitDecorators: [
    ...hitDecorators,
    thumbnailDecorator({ size: "10" }),  // 800x800 images
    customFieldDecorator                  // Your custom decorator
  ]
}
```

### Type Safety with Custom Fields

To maintain type safety when adding custom fields, extend the `Product` type in [`src/types.ts`](src/types.ts):

```typescript
import { DecoratedProduct } from "@nosto/search-js"
import { hitDecorators } from "./config"

export type Product = DecoratedProduct<typeof hitDecorators> & {
  // Add your custom field types
  customFields?: {
    'material'?: string
    'color'?: string
    'collection'?: string
  }
}
```

## Troubleshooting

### Product Images Not Loading

**Issue:** Images don't appear or have broken aspect ratios.

**Solutions:**
1. Verify the `imageUrl` field is included in your query configuration
2. Check that the CDN URL pattern in `ProductImage.tsx` matches your image URLs
3. Ensure the `imageProps` breakpoints are appropriate for your viewport sizes
4. Verify CSS `aspect-ratio` is supported (or add fallback styles)

```typescript
// Fallback for older browsers
.image {
  aspect-ratio: 1 / 1;
  
  /* Fallback */
  @supports not (aspect-ratio: 1 / 1) {
    padding-bottom: 100%; /* 1:1 ratio */
    height: 0;
  }
}
```

### Dynamic Cards Not Rendering

**Issue:** `DynamicCardProduct` components show nothing on the page.

**Solutions:**
1. Ensure you're using this in a Shopify environment
2. Verify the `@nosto/web-components` library is loaded
3. Check that the `handle` field is available in your product data
4. Confirm the template name matches your Shopify theme's snippet name
5. Check browser console for any CORS or network errors

### Autocomplete Results Not Showing Categories/Popular Searches

**Issue:** Even after enabling in config, categories or popular searches don't appear.

**Solutions:**
1. Verify the features are enabled in your Nosto account settings
2. Check that you've uncommented the correct lines in `withAutocompleteDefaults`
3. Ensure the result components (`Categories.tsx`, `PopularSearches.tsx`) exist in your project
4. Verify the search backend is returning data for these result types
5. Check the browser console for errors during autocomplete queries

### Custom Fields Not Available

**Issue:** Custom fields are undefined or missing from product objects.

**Solutions:**
1. Verify custom fields are configured in your Nosto account
2. Add custom field names to the `fields` array in query modifications
3. Check that field names exactly match those in your Nosto configuration
4. Extend the `Product` type in `src/types.ts` to include custom fields
5. Use optional chaining when accessing: `product.customFields?.['field-name']`

### Search Redirects Not Working

**Issue:** Keyword redirects don't navigate to the target URL.

**Solutions:**
1. Verify redirects are configured in your Nosto account for specific keywords
2. Check that the `_redirect` field is being returned in the keyword response
3. Ensure the `Keyword.tsx` component has not been modified to remove redirect logic
4. Test in the browser console: inspect the keyword object for the `_redirect` property
5. Check for JavaScript errors that might prevent the redirect execution

### Type Errors After Customization

**Issue:** TypeScript errors appear after adding custom configurations.

**Solutions:**
1. Run `npm run typecheck` to see all type errors
2. Ensure you're using `satisfies` operator for config objects
3. Update type definitions in `src/types.ts` for custom decorators
4. Import correct types from `@nosto/search-js` packages
5. Use `as const` for literal types in configuration objects

```typescript
// Correct usage
export const config = {
  size: 5
} satisfies AutocompleteConfig

// Type-safe custom fields
type CustomProduct = DecoratedProduct<typeof hitDecorators> & {
  myCustomField: string
}
```

### Linting Failures

**Issue:** `npm run lint` fails after customization.

**Solutions:**
1. Run `npm run lint-fix` to auto-fix formatting issues
2. Check for unused imports and variables
3. Ensure proper JSX accessibility attributes (use `eslint-plugin-jsx-a11y` rules)
4. Follow the project's ESLint configuration
5. Check `.github/instructions/` files for code style requirements

---

For additional support and advanced customization scenarios, refer to:
- [TechDocs: @nosto/search-js](https://docs.nosto.com/techdocs/apis/frontend/oss/search-js)
- [TechDocs: @nosto/nosto-js](https://docs.nosto.com/techdocs/apis/frontend/oss/nosto-js)
- [Search Templates Starter README](README.md)
- [Nosto Support](https://help.nosto.com)
