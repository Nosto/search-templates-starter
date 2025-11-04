import type { Meta, StoryObj } from "@storybook/preact-vite"
import AutocompleteNative from "./AutocompleteNative"
import { withAutocompleteContext } from ".storybook/decorators"

export default {
  title: "Autocomplete/Autocomplete",
  component: AutocompleteNative,
  parameters: {
    layout: "centered"
  },
  decorators: [withAutocompleteContext],
  tags: ["autodocs"]
} as Meta<typeof AutocompleteNative>

type Story = StoryObj<typeof AutocompleteNative>

export const Default: Story = {
  args: {
    onSubmit: (input: string) => console.info("Search submitted:", input)
  }
}

export const Interactive: Story = {
  args: {
    onSubmit: (input: string) => console.info("Search submitted:", input)
  },
  parameters: {
    docs: {
      description: {
        story:
          "Type in the search box to see autocomplete suggestions appear. The component uses Nosto search context for suggestions."
      }
    }
  }
}
