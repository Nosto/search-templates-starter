import type { Meta, StoryObj } from "@storybook/preact"
import Results from "./Results"

export default {
  title: "Autocomplete/Results",
  component: Results,
  tags: ["autodocs"],
  argTypes: {
    onSubmit: {
      action: "submitted",
      description: "Function called when a search is submitted"
    }
  }
} as Meta<typeof Results>

type Story = StoryObj<typeof Results>

export const Default: Story = {
  args: {
    onSubmit: (query: string) => console.log("Search submitted:", query)
  }
}
