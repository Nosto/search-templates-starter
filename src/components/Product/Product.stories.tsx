import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"
import { mockSerpProduct } from "@mocks/products"
import { withSearchContext } from ".storybook/decorators"
import type { Product as ProductType } from "@/types"

// Create mock products with alternate images for demo
const mockProductWithAlt: ProductType = {
  ...mockSerpProduct,
  name: "Hover-enabled Product",
  imageUrl: "https://picsum.photos/500/750?random=1",
  alternateImageUrls: ["https://picsum.photos/500/750?random=2"]
}

const mockProductMultipleAlts: ProductType = {
  ...mockSerpProduct,
  name: "Multiple Alt Images",
  imageUrl: "https://picsum.photos/500/750?random=3",
  alternateImageUrls: ["https://picsum.photos/500/750?random=4", "https://picsum.photos/500/750?random=5"]
}

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

export const WithMultipleAlternateImages: Story = {
  args: {
    product: mockProductMultipleAlts,
    showAltOnHover: true
  },
  parameters: {
    docs: {
      description: {
        story: "Product with multiple alternate images. Only the first alternate image is shown on hover."
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
