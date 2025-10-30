import type { Meta, StoryObj } from "@storybook/preact"
import Keyword from "./Keyword"
import { mockKeyword, mockKeywordNoHighlight } from "@mocks/keywords"
import { withAutocompleteContext } from ".storybook/decorators"
import { OnSubmitProvider } from "../OnSubmitContext"

export default {
  title: "Autocomplete/Keyword",
  component: Keyword,
  parameters: {
    layout: "centered"
  },
  decorators: [withAutocompleteContext],
  tags: ["autodocs"]
} as Meta<typeof Keyword>

type Story = StoryObj<typeof Keyword>

export const Default: Story = {
  render: () => (
    <OnSubmitProvider onSubmit={(query: string) => console.info("Search submitted:", query)}>
      <Keyword keyword={mockKeyword} />
    </OnSubmitProvider>
  )
}

export const WithoutHighlight: Story = {
  render: () => (
    <OnSubmitProvider onSubmit={(query: string) => console.info("Search submitted:", query)}>
      <Keyword keyword={mockKeywordNoHighlight} />
    </OnSubmitProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Keyword without highlighting, displays plain text."
      }
    }
  }
}
