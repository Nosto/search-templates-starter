import type { Meta, StoryObj } from "@storybook/preact"
import Toolbar from "./Toolbar"

export default {
  title: "Components/Toolbar",
  component: Toolbar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Toolbar>

type Story = StoryObj<typeof Toolbar>

export const Default: Story = {
  render: () => <Toolbar toggleSidebar={() => {}} />
}
