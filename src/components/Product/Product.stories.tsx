import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"
import { mockSerpProduct, mockProductWithAlt, mockNewProduct, mockOldProduct } from "@mocks/products"
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

export const WithSingleMode: Story = {
  args: {
    product: mockProductWithAlt,
    imageMode: "single"
  },
  parameters: {
    docs: {
      description: {
        story: "Product with single image mode - only shows the primary image, ignoring alternates."
      }
    }
  }
}

export const WithAlternateMode: Story = {
  args: {
    product: mockProductWithAlt,
    imageMode: "alternate"
  },
  parameters: {
    docs: {
      description: {
        story: "Product with alternate image mode - hover over the product to see the alternate image."
      }
    }
  }
}

export const NoAlternateImage: Story = {
  args: {
    product: mockSerpProduct,
    imageMode: "alternate"
  },
  parameters: {
    docs: {
      description: {
        story: "Product with alternate mode but no alternate image available. Hover has no effect."
      }
    }
  }
}

export const NewProduct: Story = {
  args: {
    product: mockNewProduct
  },
  parameters: {
    docs: {
      description: {
        story: "Product with 'New' ribbon displayed because it was published within the last 14 days."
      }
    }
  }
}

export const OldProduct: Story = {
  args: {
    product: mockOldProduct
  },
  parameters: {
    docs: {
      description: {
        story: "Product without 'New' ribbon because it was published more than 14 days ago."
      }
    }
  }
}
