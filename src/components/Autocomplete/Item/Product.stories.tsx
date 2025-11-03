import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"
import { mockProduct, mockProductNoSale, mockProductNoBrand } from "@mocks/products"
import { withAutocompleteContext } from ".storybook/decorators"

export default {
  title: "Autocomplete/Product",
  component: Product,
  parameters: {
    layout: "centered"
  },
  decorators: [withAutocompleteContext],
  tags: ["autodocs"]
} as Meta<typeof Product>

type Story = StoryObj<typeof Product>

export const Default: Story = {
  args: {
    hit: mockProduct
  }
}

export const RegularPrice: Story = {
  args: {
    hit: mockProductNoSale
  }
}

export const NoBrand: Story = {
  args: {
    hit: mockProductNoBrand
  }
}
