import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"
import { mockSerpProduct } from "@/mocks/products"

export default {
  title: "Components/Product",
  component: Product,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Product>

type Story = StoryObj<typeof Product>

export const Default: Story = {
  args: {
    product: mockSerpProduct
  }
}
