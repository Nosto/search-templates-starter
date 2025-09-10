import type { Meta, StoryObj } from "@storybook/preact"
import Sidebar from "./Sidebar"
import { SidebarProvider } from "@/contexts/SidebarContext"

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} as Meta<typeof Sidebar>

type Story = StoryObj<typeof Sidebar>

export const MockedView: Story = {
  render: () => (
    <SidebarProvider initialOpen={true}>
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <Sidebar />
      </div>
    </SidebarProvider>
  )
}
