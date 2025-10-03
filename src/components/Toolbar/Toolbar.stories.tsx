import type { Meta, StoryObj } from "@storybook/preact"
import Toolbar from "./Toolbar"
import { FilterSidebarProvider } from "@/contexts/FilterSidebarContext"
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
    <FilterSidebarProvider>
      <Toolbar />
    </FilterSidebarProvider>
  )
}
