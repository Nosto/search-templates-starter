import type { Meta, StoryObj } from "@storybook/preact-vite"
import DynamicCardProduct from "./DynamicCardProduct"
import { createMockProduct } from "@mocks/products"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/DynamicCardProduct",
  component: DynamicCardProduct,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof DynamicCardProduct>

type Story = StoryObj<typeof DynamicCardProduct>

const skeletonProduct = createMockProduct({
  productId: "skeleton-product",
  name: "Loading Product Name",
  url: "#",
  imageUrl:
    "data:image/svg+xml,%3Csvg width='300' height='400' fill='lightgrey' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='400'/%3E%3C/svg%3E",
  price: 100,
  priceText: "$100.00",
  listPrice: 100,
  listPriceText: "$100.00",
  brand: "Brand Name",
  tags1: ["skeleton"],
  ratingValue: 5,
  reviewCount: 100
})

const normalProduct = createMockProduct({
  productId: "normal-product",
  name: "Normal Product",
  handle: "normal-product",
  url: "https://example.com/normal-product",
  price: 50,
  priceText: "$50.00",
  brand: "Test Brand"
})

export const SkeletonState: Story = {
  args: {
    product: skeletonProduct
  },
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton loader state displayed while the actual product content is being fetched. Features shimmer animation and disabled interactions."
      }
    }
  }
}

export const NormalState: Story = {
  args: {
    product: normalProduct
  },
  parameters: {
    docs: {
      description: {
        story: "Normal product state with DynamicCard rendering real content from Shopify."
      }
    }
  }
}
