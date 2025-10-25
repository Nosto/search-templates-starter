import type { Meta, StoryObj } from "@storybook/preact"
import AddToCart from "./AddToCart"
import type { Product } from "@/types"

const meta: Meta<typeof AddToCart> = {
  title: "Components/AddToCart",
  component: AddToCart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "AddToCart component that handles single and multiple SKU products. For single SKU products, it adds to cart directly. For multiple SKU products, it shows a modal with variant selection."
      }
    }
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["serp", "autocomplete", "category"]
    }
  }
}

export default meta
type Story = StoryObj<typeof AddToCart>

const singleSkuProduct: Product = {
  productId: "single-sku-product",
  name: "Single SKU T-Shirt",
  url: "https://example.com/products/single-sku-tshirt",
  handle: "single-sku-tshirt",
  imageUrl: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=T-Shirt",
  price: 24.99,
  priceText: "$24.99",
  skus: [
    {
      id: "sku-single-001",
      price: 24.99,
      priceText: "$24.99",
      name: "Single SKU T-Shirt"
    }
  ]
}

const noSkuProduct: Product = {
  productId: "no-sku-product",
  name: "Simple Product",
  url: "https://example.com/products/simple-product",
  handle: "simple-product",
  imageUrl: "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Simple",
  price: 19.99,
  priceText: "$19.99"
}

const multipleSkuProduct: Product = {
  productId: "multiple-sku-product",
  name: "Multi-Variant Hoodie",
  url: "https://example.com/products/multi-variant-hoodie",
  handle: "multi-variant-hoodie",
  imageUrl: "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Hoodie",
  price: 49.99,
  priceText: "$49.99",
  skus: [
    {
      id: "sku-hoodie-s-red",
      price: 49.99,
      priceText: "$49.99",
      name: "Multi-Variant Hoodie - Small Red"
    },
    {
      id: "sku-hoodie-m-red",
      price: 49.99,
      priceText: "$49.99",
      name: "Multi-Variant Hoodie - Medium Red"
    },
    {
      id: "sku-hoodie-l-red",
      price: 54.99,
      priceText: "$54.99",
      name: "Multi-Variant Hoodie - Large Red"
    },
    {
      id: "sku-hoodie-s-blue",
      price: 49.99,
      priceText: "$49.99",
      name: "Multi-Variant Hoodie - Small Blue"
    },
    {
      id: "sku-hoodie-m-blue",
      price: 49.99,
      priceText: "$49.99",
      name: "Multi-Variant Hoodie - Medium Blue"
    }
  ]
}

export const SingleSKU: Story = {
  args: {
    product: singleSkuProduct,
    type: "serp",
    children: "Add to Cart"
  }
}

export const NoSKU: Story = {
  args: {
    product: noSkuProduct,
    type: "serp",
    children: "Add to Cart"
  }
}

export const MultipleSKUs: Story = {
  args: {
    product: multipleSkuProduct,
    type: "serp",
    children: "Choose Variants & Add to Cart"
  },
  parameters: {
    docs: {
      description: {
        story:
          "When a product has multiple SKUs, clicking the button opens a modal dialog for variant selection. The modal includes the product image, name, variant selector, and an add to cart button that is enabled only when a variant is selected."
      }
    }
  }
}

export const FromAutocomplete: Story = {
  args: {
    product: singleSkuProduct,
    type: "autocomplete",
    children: "Quick Add"
  }
}

export const FromCategory: Story = {
  args: {
    product: multipleSkuProduct,
    type: "category",
    children: "Add to Bag"
  }
}
