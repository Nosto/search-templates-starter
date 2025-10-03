import type { Meta, StoryObj } from "@storybook/preact"
import FilterSidebar from "./FilterSidebar"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/FilterSidebar",
  component: FilterSidebar,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof FilterSidebar>

type Story = StoryObj<typeof FilterSidebar>

export const MockedView: Story = {
  render: () => (
    <SidebarProvider initialOpen={true}>
      <div style={{ position: "relative", width: "300px", height: "800px" }}>
        <FilterSidebar />
      </div>
    </SidebarProvider>
  )
}
