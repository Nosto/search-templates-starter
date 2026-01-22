import type { Meta, StoryObj } from "@storybook/preact-vite"
import Content from "./Content"
import { withAutocompleteContext } from ".storybook/decorators"
import type { Product } from "@/types"

const mockContentProducts: Product[] = [
  {
    productId: "content-1",
    name: "Blog Post: Summer Fashion Trends",
    url: "https://example.com/blog/summer-fashion-trends",
    customFields: [{ key: "type", value: "content" }]
  } as Product,
  {
    productId: "content-2",
    name: "Guide: How to Choose Running Shoes",
    url: "https://example.com/guides/running-shoes",
    customFields: [{ key: "type", value: "content" }]
  } as Product,
  {
    productId: "content-3",
    name: "Article: Top 10 Tech Gadgets",
    url: "https://example.com/articles/tech-gadgets",
    customFields: [{ key: "type", value: "content" }]
  } as Product
]

export default {
  title: "Autocomplete/Content",
  component: Content,
  parameters: {
    layout: "centered"
  },
  decorators: [withAutocompleteContext],
  tags: ["autodocs"]
} as Meta<typeof Content>

type Story = StoryObj<typeof Content>

export const Default: Story = {
  args: {
    content: mockContentProducts
  }
}

export const EmptyContent: Story = {
  args: {
    content: []
  },
  parameters: {
    docs: {
      description: {
        story: "Content component with no items (should render nothing)."
      }
    }
  }
}
