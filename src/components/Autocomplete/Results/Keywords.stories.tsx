import type { Meta, StoryObj } from "@storybook/preact"
import Keywords from "./Keywords"
import { mockKeywords, mockEmptyKeywords } from "@mocks/keywords"
import { withAutocompleteContext } from ".storybook/decorators"

export default {
  title: "Autocomplete/Keywords",
  component: Keywords,
  parameters: {
    layout: "centered"
  },
  decorators: [withAutocompleteContext],
  tags: ["autodocs"]
} as Meta<typeof Keywords>

type Story = StoryObj<typeof Keywords>

export const Default: Story = {
  args: {
    keywords: mockKeywords,
    onSubmit: (query: string) => console.info("Search submitted:", query)
  }
}

export const EmptyKeywords: Story = {
  args: {
    keywords: mockEmptyKeywords,
    onSubmit: (query: string) => console.info("Search submitted:", query)
  },
  parameters: {
    docs: {
      description: {
        story: "Keywords component with no suggestions (should render nothing)."
      }
    }
  }
}
