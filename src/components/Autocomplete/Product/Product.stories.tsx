import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"
import {
  mockAutocompleteProduct,
  mockAutocompleteProductNoSale,
  mockAutocompleteProductNoBrand
} from "@/mocks/products"

export default {
  title: "Autocomplete/Product",
  component: Product,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Product>

type Story = StoryObj<typeof Product>

export const Default: Story = {
  args: {
    hit: mockAutocompleteProduct
  }
}

export const RegularPrice: Story = {
  args: {
    hit: mockAutocompleteProductNoSale
  }
}

export const NoBrand: Story = {
  args: {
    hit: mockAutocompleteProductNoBrand
  }
}
