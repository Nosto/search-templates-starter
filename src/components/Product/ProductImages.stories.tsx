import type { Meta, StoryObj } from "@storybook/preact"
import ProductImages from "./ProductImages"
import { createMockProduct } from "@mocks/products"

export default {
  title: "Components/Product/ProductImages",
  component: ProductImages,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof ProductImages>

type Story = StoryObj<typeof ProductImages>

const mockProductWithAlts = createMockProduct({
  name: "Product with Multiple Images"
})

const mockProductNoAlts = createMockProduct({
  name: "Single Image Product",
  alternateImageUrls: []
})

export const SingleMode: Story = {
  args: {
    product: mockProductWithAlts,
    mode: "single"
  },
  parameters: {
    docs: {
      description: {
        story: "Single mode displays only the primary image, ignoring alternate images."
      }
    }
  }
}

export const AlternateMode: Story = {
  args: {
    product: mockProductWithAlts,
    mode: "alternate"
  },
  parameters: {
    docs: {
      description: {
        story: "Alternate mode shows the alternate image on hover (current default behavior)."
      }
    }
  }
}

export const AlternateModeNoAlt: Story = {
  args: {
    product: mockProductNoAlts,
    mode: "alternate"
  },
  parameters: {
    docs: {
      description: {
        story: "Alternate mode with no alternate images behaves like single mode."
      }
    }
  }
}

export const CarouselMode: Story = {
  args: {
    product: mockProductWithAlts,
    mode: "carousel"
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel mode displays navigation buttons and indicators for multiple images. Hover to see controls."
      }
    }
  }
}

export const CarouselModeSingleImage: Story = {
  args: {
    product: mockProductNoAlts,
    mode: "carousel"
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel mode with only one image falls back to single mode (no controls shown)."
      }
    }
  }
}

export const WithNewRibbon: Story = {
  args: {
    product: mockProductWithAlts,
    mode: "carousel",
    children: (
      <div style="position: absolute; top: 8px; left: 8px; background: white; padding: 8px; z-index: 1;">New</div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "ProductImages supports additional children like new ribbons or badges."
      }
    }
  }
}

export const DefaultMode: Story = {
  args: {
    product: mockProductWithAlts
  },
  parameters: {
    docs: {
      description: {
        story: "When no mode is specified, defaults to 'alternate' mode for backward compatibility."
      }
    }
  }
}
