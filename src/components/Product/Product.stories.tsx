import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"
import { mockSerpProduct, mockProductNoRating } from "@mocks/products"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/Product",
  component: Product,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof Product>

type Story = StoryObj<typeof Product>

export const Default: Story = {
  args: {
    product: mockSerpProduct
  }
}

export const WithoutRating: Story = {
  args: {
    product: mockProductNoRating
  }
}
