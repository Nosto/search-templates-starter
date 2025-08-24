import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"

const meta: Meta<typeof Product> = {
  title: "Components/Product",
  component: Product,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

const mockProduct = {
  product_id: "1",
  name: "Sample Product",
  price: 29.99,
  currency: "EUR",
  image_url: "https://via.placeholder.com/300x300",
  url: "#"
}

export const Default: Story = {
  render: () => <Product product={mockProduct} />
}
