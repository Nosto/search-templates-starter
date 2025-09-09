import type { Meta, StoryObj } from "@storybook/preact"
import Products from "./Products"
import { mockAutocompleteProducts, mockEmptyProducts } from "@/mocks/products"

export default {
  title: "Autocomplete/Products",
  component: Products,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Products>

type Story = StoryObj<typeof Products>

export const Default: Story = {
  args: {
    products: mockAutocompleteProducts
  }
}

export const EmptyProducts: Story = {
  args: {
    products: mockEmptyProducts
  },
  parameters: {
    docs: {
      description: {
        story: "Products component with no suggestions (should render nothing)."
      }
    }
  }
}
