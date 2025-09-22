import type { Meta, StoryObj } from "@storybook/preact"
import Products from "./Products"
import { mockProducts, mockEmptyProducts } from "@mocks/products"
import { withAutocompleteContext } from ".storybook/decorators"

export default {
  title: "Autocomplete/Products",
  component: Products,
  parameters: {
    layout: "centered"
  },
  decorators: [withAutocompleteContext],
  tags: ["autodocs"]
} as Meta<typeof Products>

type Story = StoryObj<typeof Products>

export const Default: Story = {
  args: {
    products: mockProducts
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
