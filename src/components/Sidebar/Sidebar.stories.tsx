import type { Meta, StoryObj } from "@storybook/preact"
import Sidebar from "./Sidebar"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof Sidebar>

type Story = StoryObj<typeof Sidebar>

export const MockedView: Story = {
  render: () => (
    <SidebarProvider>
      <div style={{ position: "relative", width: "300px", height: "500px", border: "1px solid #ccc" }}>
        <Sidebar />
      </div>
    </SidebarProvider>
  )
}
