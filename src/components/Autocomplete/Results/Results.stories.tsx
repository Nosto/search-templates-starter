import type { Meta, StoryObj } from "@storybook/preact"
import Results from "./Results"

export default {
  title: "Components/Autocomplete/Results",
  component: Results,
  tags: ["autodocs"]
} as Meta<typeof Results>

type Story = StoryObj<typeof Results>

export const Default: Story = {
  render: () => <Results onSubmit={(query: string) => console.log("Search submitted:", query)} />
}
