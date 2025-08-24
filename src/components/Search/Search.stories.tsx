import type { Meta, StoryObj } from "@storybook/preact"
import { Search } from "./Search"

const meta: Meta<typeof Search> = {
  title: "Components/Search",
  component: Search,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Search />
}
