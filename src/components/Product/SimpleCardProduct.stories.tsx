import type { Meta, StoryObj } from "@storybook/preact"
import SimpleCardProduct from "./SimpleCardProduct"
import { mockSerpProduct, mockProductWithAlt, mockNewProduct, mockProductOnSale } from "@mocks/products"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/Product/SimpleCardProduct",
  component: SimpleCardProduct,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof SimpleCardProduct>

type Story = StoryObj<typeof SimpleCardProduct>

export const Default: Story = {
  args: {
    product: mockSerpProduct
  }
}

export const WithAlternateImage: Story = {
  args: {
    product: mockProductWithAlt
  }
}

export const NewProduct: Story = {
  args: {
    product: mockNewProduct
  }
}

export const ProductOnSale: Story = {
  args: {
    product: mockProductOnSale
  }
}
