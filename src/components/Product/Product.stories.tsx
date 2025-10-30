import type { Meta, StoryObj } from "@storybook/preact"
import DynamicCardProduct from "./DynamicCardProduct"
import { mockSerpProduct, mockNewProduct, mockProductOnSale } from "@mocks/products"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/Product",
  component: DynamicCardProduct,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof DynamicCardProduct>

type Story = StoryObj<typeof DynamicCardProduct>

export const Default: Story = {
  args: {
    product: mockSerpProduct
  }
}

export const NewProduct: Story = {
  args: {
    product: mockNewProduct
  },
  parameters: {
    docs: {
      description: {
        story: "Product card rendered using DynamicCardProduct web component."
      }
    }
  }
}

export const ProductOnSale: Story = {
  args: {
    product: mockProductOnSale
  },
  parameters: {
    docs: {
      description: {
        story: "Product card rendered using DynamicCardProduct web component."
      }
    }
  }
}
