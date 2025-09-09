import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"

export default {
  title: "Autocomplete/Product",
  component: Product,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Product>

type Story = StoryObj<typeof Product>

const mockProduct = {
  productId: "12345",
  name: "Running Shoes",
  brand: "Nike",
  price: 120.0,
  listPrice: 150.0,
  priceText: "€120.00",
  listPriceText: "€150.00",
  imageUrl: "https://picsum.photos/300/300",
  url: "/products/running-shoes",
  handle: "running-shoes"
}

const mockProductNoSale = {
  productId: "67890",
  name: "Casual Sneakers",
  brand: "Adidas",
  price: 80.0,
  priceText: "€80.00",
  imageUrl: "https://picsum.photos/300/300?random=2",
  url: "/products/casual-sneakers",
  handle: "casual-sneakers"
}

const mockProductNoBrand = {
  productId: "54321",
  name: "Generic Sports Shoes",
  price: 60.0,
  priceText: "€60.00",
  imageUrl: "https://picsum.photos/300/300?random=3",
  url: "/products/generic-sports-shoes",
  handle: "generic-sports-shoes"
}

export const Default: Story = {
  render: () => <Product hit={mockProduct} />
}

export const RegularPrice: Story = {
  render: () => <Product hit={mockProductNoSale} />
}

export const NoBrand: Story = {
  render: () => <Product hit={mockProductNoBrand} />
}
