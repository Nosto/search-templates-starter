import type { Meta, StoryObj } from "@storybook/preact"
import Toolbar from "./Toolbar"

const meta: Meta<typeof Toolbar> = {
  title: "Components/Toolbar",
  component: Toolbar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Toolbar />
}
