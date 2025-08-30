import type { Meta, StoryObj } from "@storybook/preact"
import ProductCard from "./ProductCard"

export default {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof ProductCard>

type Story = StoryObj<typeof ProductCard>

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
  render: () => <ProductCard product={mockProduct} />
}
