import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"
import { mockSerpProduct, mockProductWithAlt } from "@mocks/products"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/Product",
  component: Product,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof Product>

type Story = StoryObj<typeof Product>

export const Default: Story = {
  args: {
    product: mockSerpProduct
  }
}

export const WithHoverDisabled: Story = {
  args: {
    product: mockProductWithAlt,
    showAltOnHover: false
  },
  parameters: {
    docs: {
      description: {
        story: "Product with alternate image available but hover feature disabled (showAltOnHover=false)"
      }
    }
  }
}

export const WithHoverEnabled: Story = {
  args: {
    product: mockProductWithAlt,
    showAltOnHover: true
  },
  parameters: {
    docs: {
      description: {
        story:
          "Product with hover-to-alternate-image feature enabled. Hover over the product to see the alternate image."
      }
    }
  }
}

export const NoAlternateImage: Story = {
  args: {
    product: mockSerpProduct,
    showAltOnHover: true
  },
  parameters: {
    docs: {
      description: {
        story: "Product with hover enabled but no alternate image available. Hover has no effect."
      }
    }
  }
}
