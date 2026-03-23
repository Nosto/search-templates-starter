import type { Meta, StoryObj } from "@storybook/preact-vite"
import QuickAdd from "./QuickAdd"
import type { Product } from "@/types"
import { mockProduct, mockProductNoSale, createMockProduct } from "@mocks/products"
import { withSearchContext } from ".storybook/decorators"

const meta: Meta<typeof QuickAdd> = {
  title: "Components/QuickAdd",
  component: QuickAdd,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "QuickAdd component that handles single and multiple SKU products. For single SKU products, it adds to cart directly. For multiple SKU products, it shows a modal with variant selection."
      }
    }
  },
  decorators: [withSearchContext]
}

export default meta
type Story = StoryObj<typeof QuickAdd>

const singleSkuProduct: Product = {
  ...mockProduct,
  name: "Single SKU T-Shirt",
  handle: "single-sku-tshirt",
  skus: [
    {
      id: "sku-single-001",
      price: mockProduct.price,
      priceText: mockProduct.priceText,
      name: "Single SKU T-Shirt"
    }
  ]
}

const noSkuProduct: Product = {
  ...mockProductNoSale,
  name: "Simple Product",
  handle: "simple-product"
}

const multipleSkuProduct: Product = createMockProduct({
  productId: "multiple-sku-product",
  name: "Multi-Variant Hoodie",
  handle: "multi-variant-hoodie",
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
})

export const SingleSKU: Story = {
  args: {
    product: singleSkuProduct,
    children: "Add to Cart"
  }
}

export const NoSKU: Story = {
  args: {
    product: noSkuProduct,
    children: "Add to Cart"
  }
}

export const MultipleSKUs: Story = {
  args: {
    product: multipleSkuProduct,
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
    children: "Quick Add"
  }
}

export const FromCategory: Story = {
  args: {
    product: multipleSkuProduct,
    children: "Add to Bag"
  }
}
