import type { Meta, StoryObj } from "@storybook/preact"
import Results from "./Results"

export default {
  title: "Autocomplete/Results",
  component: Results,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} as Meta<typeof Results>

type Story = StoryObj<typeof Results>

export const Default: Story = {
  args: {
    onSubmit: (query: string) => console.log("Search submitted:", query)
  }
}
