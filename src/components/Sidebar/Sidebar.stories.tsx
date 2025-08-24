import type { Meta, StoryObj } from "@storybook/preact"
import Sidebar from "./Sidebar"

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Sidebar />
}
