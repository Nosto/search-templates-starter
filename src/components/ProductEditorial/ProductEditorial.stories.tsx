import type { Meta, StoryObj } from "@storybook/preact"
import ProductEditorial from "./ProductEditorial"

export default {
  title: "Components/ProductEditorial",
  component: ProductEditorial,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof ProductEditorial>

type Story = StoryObj<typeof ProductEditorial>

export const Default: Story = {
  render: () => (
    <ProductEditorial>
      <h3>Featured Collection</h3>
      <p>Discover our curated selection of premium products.</p>
    </ProductEditorial>
  )
}

export const Empty: Story = {
  render: () => <ProductEditorial />
}
