import type { Meta, StoryObj } from "@storybook/preact"
import ProductImages from "./ProductImages"
import { createMockRandomImage } from "@mocks/images"

export default {
  title: "Components/Product/ProductImages",
  component: ProductImages,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof ProductImages>

type Story = StoryObj<typeof ProductImages>

const mockImageUrl = createMockRandomImage()
const mockAlternateUrls = [createMockRandomImage(), createMockRandomImage(), createMockRandomImage()]

export const SingleMode: Story = {
  args: {
    imageUrl: mockImageUrl,
    alternateImageUrls: mockAlternateUrls,
    alt: "Single mode product image",
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
    imageUrl: mockImageUrl,
    alternateImageUrls: [mockAlternateUrls[0]],
    alt: "Alternate mode product image",
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
    imageUrl: mockImageUrl,
    alternateImageUrls: [],
    alt: "No alternate image",
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
    imageUrl: mockImageUrl,
    alternateImageUrls: mockAlternateUrls,
    alt: "Carousel mode product images",
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
    imageUrl: mockImageUrl,
    alternateImageUrls: [],
    alt: "Carousel with single image",
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
    imageUrl: mockImageUrl,
    alternateImageUrls: mockAlternateUrls,
    alt: "Product with new ribbon",
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
    imageUrl: mockImageUrl,
    alternateImageUrls: mockAlternateUrls,
    alt: "Default mode"
  },
  parameters: {
    docs: {
      description: {
        story: "When no mode is specified, defaults to 'alternate' mode for backward compatibility."
      }
    }
  }
}
