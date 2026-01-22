import type { Meta, StoryObj } from "@storybook/preact-vite"
import Content from "./Content"
import { withAutocompleteContext } from ".storybook/decorators"
import { mockContentProducts } from "@mocks/products"

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
