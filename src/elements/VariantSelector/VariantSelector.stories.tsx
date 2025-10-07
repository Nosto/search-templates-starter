import type { Meta, StoryObj } from "@storybook/preact"
import VariantSelector from "./VariantSelector"

export default {
  title: "Elements/VariantSelector",
  component: VariantSelector,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof VariantSelector>

type Story = StoryObj<typeof VariantSelector>

export const Default: Story = {
  args: {
    handle: "sample-product"
  }
}

export const MockedView: Story = {
  args: {
    handle: "variant-product-demo"
  },
  parameters: {
    docs: {
      description: {
        story: "This component requires Nosto web-components to be loaded and a valid Shopify product handle to function properly. In a real implementation, it would display variant options like size, color, etc. as clickable pills."
      }
    }
  }
}