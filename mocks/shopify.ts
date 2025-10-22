// Local type definitions based on @nosto/search-js/preact/hooks
interface ShopifyImage {
  id: number
  product_id: number
  position: number
  created_at: string
  updated_at: string
  alt: string | null
  width: number
  height: number
  src: string
  variant_ids: number[]
}

interface ShopifyMedia {
  alt: string | null
  id: number
  position: number
  preview_image: ShopifyImage
}

interface ShopifyVariant {
  id: number
  title: string
  option1: string | null
  option2: string | null
  option3: string | null
  sku: string
  requires_shipping: boolean
  taxable: boolean
  featured_image: ShopifyImage | null
  available: boolean
  name: string
  public_title: string
  options: string[]
  price: number
  weight: number
  compare_at_price: number | null
  inventory_management: string
  barcode: string
  featured_media: ShopifyMedia
}

interface ShopifyOption {
  name: string
  position: number
  values: string[]
}

interface ShopifyProduct {
  id: number
  title: string
  handle: string
  description: string
  published_at: string
  created_at: string
  vendor: string
  type: string
  tags: string[]
  price: number
  price_min: number
  price_max: number
  available: boolean
  price_varies: boolean
  compare_at_price: number | null
  compare_at_price_min: number
  compare_at_price_max: number
  compare_at_price_varies: boolean
  variants: ShopifyVariant[]
  images: string[]
  featured_image: string
  options: ShopifyOption[]
  url: string
}

/**
 * Mock Shopify product with multiple color and size options for testing Swatches component
 */
export const mockShopifyProduct: ShopifyProduct = {
  id: 123456789,
  title: "Premium Cotton T-Shirt",
  handle: "premium-cotton-t-shirt",
  description: "A high-quality cotton t-shirt available in multiple colors and sizes.",
  published_at: "2023-01-01T00:00:00Z",
  created_at: "2023-01-01T00:00:00Z",
  vendor: "Nosto Clothing",
  type: "T-Shirt",
  tags: ["cotton", "premium", "casual"],
  price: 2999, // $29.99 in cents
  price_min: 2999,
  price_max: 3499,
  available: true,
  price_varies: true,
  compare_at_price: 3999,
  compare_at_price_min: 3999,
  compare_at_price_max: 4499,
  compare_at_price_varies: true,
  variants: [
    {
      id: 1001,
      title: "Red / Small",
      option1: "Red",
      option2: "Small",
      option3: null,
      sku: "TSHIRT-RED-S",
      requires_shipping: true,
      taxable: true,
      featured_image: null,
      available: true,
      name: "Red / Small",
      public_title: "Red / Small",
      options: ["Red", "Small"],
      price: 2999,
      weight: 200,
      compare_at_price: 3999,
      inventory_management: "shopify",
      barcode: "123456789001",
      featured_media: {
        alt: null,
        id: 1001,
        position: 1,
        preview_image: {
          id: 1001,
          product_id: 123456789,
          position: 1,
          created_at: "2023-01-01T00:00:00Z",
          updated_at: "2023-01-01T00:00:00Z",
          alt: null,
          width: 800,
          height: 800,
          src: "https://cdn.shopify.com/s/files/1/0001/0001/products/red-small.jpg",
          variant_ids: [1001]
        }
      }
    },
    {
      id: 1002,
      title: "Red / Medium",
      option1: "Red",
      option2: "Medium",
      option3: null,
      sku: "TSHIRT-RED-M",
      requires_shipping: true,
      taxable: true,
      featured_image: null,
      available: true,
      name: "Red / Medium",
      public_title: "Red / Medium",
      options: ["Red", "Medium"],
      price: 2999,
      weight: 200,
      compare_at_price: 3999,
      inventory_management: "shopify",
      barcode: "123456789002",
      featured_media: {
        alt: null,
        id: 1002,
        position: 1,
        preview_image: {
          id: 1002,
          product_id: 123456789,
          position: 1,
          created_at: "2023-01-01T00:00:00Z",
          updated_at: "2023-01-01T00:00:00Z",
          alt: null,
          width: 800,
          height: 800,
          src: "https://cdn.shopify.com/s/files/1/0001/0001/products/red-medium.jpg",
          variant_ids: [1002]
        }
      }
    },
    {
      id: 1003,
      title: "Blue / Small",
      option1: "Blue",
      option2: "Small",
      option3: null,
      sku: "TSHIRT-BLUE-S",
      requires_shipping: true,
      taxable: true,
      featured_image: null,
      available: false, // Out of stock
      name: "Blue / Small",
      public_title: "Blue / Small",
      options: ["Blue", "Small"],
      price: 2999,
      weight: 200,
      compare_at_price: 3999,
      inventory_management: "shopify",
      barcode: "123456789003",
      featured_media: {
        alt: null,
        id: 1003,
        position: 1,
        preview_image: {
          id: 1003,
          product_id: 123456789,
          position: 1,
          created_at: "2023-01-01T00:00:00Z",
          updated_at: "2023-01-01T00:00:00Z",
          alt: null,
          width: 800,
          height: 800,
          src: "https://cdn.shopify.com/s/files/1/0001/0001/products/blue-small.jpg",
          variant_ids: [1003]
        }
      }
    },
    {
      id: 1004,
      title: "Blue / Medium",
      option1: "Blue",
      option2: "Medium",
      option3: null,
      sku: "TSHIRT-BLUE-M",
      requires_shipping: true,
      taxable: true,
      featured_image: null,
      available: true,
      name: "Blue / Medium",
      public_title: "Blue / Medium",
      options: ["Blue", "Medium"],
      price: 3199,
      weight: 200,
      compare_at_price: 4199,
      inventory_management: "shopify",
      barcode: "123456789004",
      featured_media: {
        alt: null,
        id: 1004,
        position: 1,
        preview_image: {
          id: 1004,
          product_id: 123456789,
          position: 1,
          created_at: "2023-01-01T00:00:00Z",
          updated_at: "2023-01-01T00:00:00Z",
          alt: null,
          width: 800,
          height: 800,
          src: "https://cdn.shopify.com/s/files/1/0001/0001/products/blue-medium.jpg",
          variant_ids: [1004]
        }
      }
    },
    {
      id: 1005,
      title: "Green / Large",
      option1: "Green",
      option2: "Large",
      option3: null,
      sku: "TSHIRT-GREEN-L",
      requires_shipping: true,
      taxable: true,
      featured_image: null,
      available: true,
      name: "Green / Large",
      public_title: "Green / Large",
      options: ["Green", "Large"],
      price: 3499,
      weight: 200,
      compare_at_price: 4499,
      inventory_management: "shopify",
      barcode: "123456789005",
      featured_media: {
        alt: null,
        id: 1005,
        position: 1,
        preview_image: {
          id: 1005,
          product_id: 123456789,
          position: 1,
          created_at: "2023-01-01T00:00:00Z",
          updated_at: "2023-01-01T00:00:00Z",
          alt: null,
          width: 800,
          height: 800,
          src: "https://cdn.shopify.com/s/files/1/0001/0001/products/green-large.jpg",
          variant_ids: [1005]
        }
      }
    }
  ],
  images: [
    "https://cdn.shopify.com/s/files/1/0001/0001/products/main.jpg",
    "https://cdn.shopify.com/s/files/1/0001/0001/products/red-small.jpg",
    "https://cdn.shopify.com/s/files/1/0001/0001/products/red-medium.jpg",
    "https://cdn.shopify.com/s/files/1/0001/0001/products/blue-small.jpg",
    "https://cdn.shopify.com/s/files/1/0001/0001/products/blue-medium.jpg",
    "https://cdn.shopify.com/s/files/1/0001/0001/products/green-large.jpg"
  ],
  featured_image: "https://cdn.shopify.com/s/files/1/0001/0001/products/main.jpg",
  options: [
    {
      name: "Color",
      position: 1,
      values: ["Red", "Blue", "Green"]
    },
    {
      name: "Size",
      position: 2,
      values: ["Small", "Medium", "Large"]
    }
  ],
  url: "/products/premium-cotton-t-shirt"
}

/**
 * Mock Shopify product with single option for testing edge cases
 */
export const mockShopifyProductSingleOption: ShopifyProduct = {
  ...mockShopifyProduct,
  id: 987654321,
  title: "Simple Cotton T-Shirt",
  handle: "simple-cotton-t-shirt",
  variants: [
    {
      ...mockShopifyProduct.variants[0],
      id: 2001,
      title: "Red",
      option1: "Red",
      option2: null,
      option3: null,
      options: ["Red"],
      sku: "SIMPLE-TSHIRT-RED"
    },
    {
      ...mockShopifyProduct.variants[1],
      id: 2002,
      title: "Blue",
      option1: "Blue",
      option2: null,
      option3: null,
      options: ["Blue"],
      sku: "SIMPLE-TSHIRT-BLUE"
    }
  ],
  options: [
    {
      name: "Color",
      position: 1,
      values: ["Red", "Blue"]
    }
  ]
}

/**
 * Mock Shopify product with no variants for testing edge cases
 */
export const mockShopifyProductNoVariants: ShopifyProduct = {
  ...mockShopifyProduct,
  id: 555555555,
  title: "Basic Cotton T-Shirt",
  handle: "basic-cotton-t-shirt",
  variants: [
    {
      ...mockShopifyProduct.variants[0],
      id: 3001,
      title: "Default Title",
      option1: null,
      option2: null,
      option3: null,
      options: [],
      sku: "BASIC-TSHIRT"
    }
  ],
  options: []
}
