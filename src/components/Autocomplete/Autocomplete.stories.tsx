import type { Meta, StoryObj } from "@storybook/preact"
import Autocomplete from "./Autocomplete"

export default {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Autocomplete>

type Story = StoryObj<typeof Autocomplete>

export const Default: Story = {
  render: () => <Autocomplete onSubmit={(input: string) => console.log("Search submitted:", input)} />
}

export const Interactive: Story = {
  render: () => <Autocomplete onSubmit={(input: string) => console.log("Search submitted:", input)} />,
  parameters: {
    docs: {
      description: {
        story:
          "Type in the search box to see autocomplete suggestions appear. The component uses Nosto search context for suggestions."
      }
    }
  }
}
