import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"

export default {
  title: "Components/Product",
  component: Product,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Product>

type Story = StoryObj<typeof Product>

const mockProduct = {
  productId: "1",
  name: "Sample Product",
  price: 30.0,
  listPrice: 40.0,
  currency: "EUR",
  priceText: "€30.00",
  listPriceText: "€40.00",
  imageUrl: "https://picsum.photos/300/300?random=1",
  url: "#"
}

const mockProductWithAlternate = {
  productId: "2",
  name: "Product with Alternate Image",
  price: 25.0,
  priceText: "€25.00",
  imageUrl: "https://picsum.photos/300/300?random=2",
  alternateImageUrls: ["https://picsum.photos/300/300?random=3"],
  url: "#"
}

export const Default: Story = {
  render: () => <Product product={mockProduct} />
}

export const WithAlternateImage: Story = {
  render: () => <Product product={mockProductWithAlternate} />,
  parameters: {
    docs: {
      description: {
        story:
          "Hover over this product to see the alternate image. The component shows `alternateImageUrls[0]` when hovering if available."
      }
    }
  }
}
