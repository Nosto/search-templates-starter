import type { Meta, StoryObj } from "@storybook/preact"
import Sidebar from "./Sidebar"

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Sidebar>

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: () => <Sidebar isOpen={false} onSetOpen={open => console.log(`Set sidebar open: ${open}`)} />
}

export const Open: Story = {
  render: () => <Sidebar isOpen={true} onSetOpen={open => console.log(`Set sidebar open: ${open}`)} />
}
