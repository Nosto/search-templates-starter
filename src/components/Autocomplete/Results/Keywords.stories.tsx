import type { Meta, StoryObj } from "@storybook/preact"
import Keywords from "./Keywords"
import { mockKeywords, mockEmptyKeywords } from "@mocks/keywords"
import { withAutocompleteContext } from ".storybook/decorators"
import { OnSubmitProvider } from "../OnSubmitContext"

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
  render: () => (
    <OnSubmitProvider onSubmit={(query: string) => console.info("Search submitted:", query)}>
      <Keywords keywords={mockKeywords} />
    </OnSubmitProvider>
  )
}

export const EmptyKeywords: Story = {
  render: () => (
    <OnSubmitProvider onSubmit={(query: string) => console.info("Search submitted:", query)}>
      <Keywords keywords={mockEmptyKeywords} />
    </OnSubmitProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Keywords component with no suggestions (should render nothing)."
      }
    }
  }
}
