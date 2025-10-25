import type { Meta, StoryObj } from "@storybook/preact"
import Toolbar from "./Toolbar"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { withContainer, withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/Toolbar",
  component: Toolbar,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext, withContainer],
  tags: ["autodocs"]
} as Meta<typeof Toolbar>

type Story = StoryObj<typeof Toolbar>

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Toolbar />
    </SidebarProvider>
  )
}
