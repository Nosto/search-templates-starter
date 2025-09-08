import type { Meta, StoryObj } from "@storybook/preact"
import Sidebar from "./Sidebar"
import { SidebarProvider } from "@/contexts/SidebarContext"

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Sidebar>

type Story = StoryObj<typeof Sidebar>

export const MockedView: Story = {
  render: () => (
    <SidebarProvider>
      <div style={{ position: "relative", width: "300px", height: "400px" }}>
        <Sidebar />
      </div>
    </SidebarProvider>
  )
}
