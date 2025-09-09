import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"

export default {
  title: "Components/Product",
  component: Product,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    product: {
      control: "object",
      description: "Product data object"
    },
    previewImage: {
      control: "text",
      description: "Optional preview image URL"
    }
  }
} as Meta<typeof Product>

type Story = StoryObj<typeof Product>

const mockProduct = {
  product_id: "1",
  name: "Sample Product",
  price: 30.0,
  listPrice: 40.0,
  currency: "EUR",
  imageUrl: "https://picsum.photos/300/300",
  url: "#"
}

export const Default: Story = {
  args: {
    product: mockProduct
  }
}
