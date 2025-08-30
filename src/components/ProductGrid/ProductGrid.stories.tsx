import type { Meta, StoryObj } from "@storybook/preact"
import ProductGrid from "./ProductGrid"

export default {
  title: "Components/ProductGrid",
  component: ProductGrid,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof ProductGrid>

type Story = StoryObj<typeof ProductGrid>

export const Default: Story = {
  render: () => <ProductGrid />
}
