import type { Meta, StoryObj } from "@storybook/preact"
import { Search } from "./Search"

export default {
  title: "Components/Search",
  component: Search,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Search>

type Story = StoryObj<typeof Search>

export const Default: Story = {
  args: {}
}
