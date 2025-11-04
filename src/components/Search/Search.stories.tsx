import type { Meta, StoryObj } from "@storybook/preact-vite"
import Search from "./Search"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/Search",
  component: Search,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof Search>

type Story = StoryObj<typeof Search>

export const Default: Story = {
  args: {}
}
