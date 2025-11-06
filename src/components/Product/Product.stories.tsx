import type { Meta, StoryObj } from "@storybook/preact-vite"
import Product from "./Product"
import {
  mockSerpProduct,
  mockProductWithAlt,
  mockNewProduct,
  mockOldProduct,
  mockProductOnSale,
  mockProductNoSalePrice,
  createMockProduct
} from "@mocks/products"
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

const mockSkeletonProduct = createMockProduct({
  productId: "skeleton-product",
  name: "Loading Product Name",
  url: "#",
  imageUrl:
    "data:image/svg+xml,%3Csvg width='300' height='400' fill='lightgrey' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='400'/%3E%3C/svg%3E",
  price: 100,
  priceText: "$100.00",
  listPrice: 100,
  listPriceText: "$100.00",
  brand: "Brand Name",
  tags1: ["skeleton"],
  ratingValue: 5,
  reviewCount: 100
})

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

export const ProductOnSale: Story = {
  args: {
    product: mockProductOnSale
  },
  parameters: {
    docs: {
      description: {
        story: "Product with 'Sale' ribbon displayed because the price is lower than the list price."
      }
    }
  }
}

export const ProductNoSale: Story = {
  args: {
    product: mockProductNoSalePrice
  },
  parameters: {
    docs: {
      description: {
        story: "Product without 'Sale' ribbon because the price equals the list price."
      }
    }
  }
}

export const SkeletonState: Story = {
  args: {
    product: mockSkeletonProduct
  },
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton loader state displayed while the actual product content is being fetched. Features shimmer animation and disabled pointer events."
      }
    }
  }
}
