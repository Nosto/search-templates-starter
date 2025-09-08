import type { Meta, StoryObj } from "@storybook/preact"
import Products from "./Products"

export default {
  title: "Components/Autocomplete/Products",
  component: Products,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Products>

type Story = StoryObj<typeof Products>

const mockProducts = {
  hits: [
    {
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
    },
    {
      productId: "67890",
      name: "Casual Sneakers",
      brand: "Adidas",
      price: 80.0,
      priceText: "€80.00",
      imageUrl: "https://picsum.photos/300/300?random=2",
      url: "/products/casual-sneakers",
      handle: "casual-sneakers"
    },
    {
      productId: "54321",
      name: "Sports Shoes",
      brand: "Puma",
      price: 95.0,
      listPrice: 110.0,
      priceText: "€95.00",
      listPriceText: "€110.00",
      imageUrl: "https://picsum.photos/300/300?random=3",
      url: "/products/sports-shoes",
      handle: "sports-shoes"
    }
  ],
  total: 3
}

const emptyProducts = {
  hits: [],
  total: 0
}

export const Default: Story = {
  render: () => <Products products={mockProducts} />
}



export const EmptyProducts: Story = {
  render: () => <Products products={emptyProducts} />,
  parameters: {
    docs: {
      description: {
        story: "Products component with no suggestions (should render nothing)."
      }
    }
  }
}
