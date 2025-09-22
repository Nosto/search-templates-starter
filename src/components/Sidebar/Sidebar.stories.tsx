import type { Meta, StoryObj } from "@storybook/preact"
import Sidebar from "./Sidebar"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Sidebar component displays filtering options and selected filters. 

Key features:
- **Clear Filters button** positioned at the bottom for improved UX
- **Range filter pills** show filter names as prefix (e.g., "Price: 10–50")
- **Mobile-responsive** with overlay behavior on smaller screens
        `
      }
    }
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
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows the sidebar component with mock data. The Clear Filters button appears at the bottom when filters are active."
      }
    }
  }
}

export const OpenState: Story = {
  render: () => (
    <SidebarProvider>
      <div style={{ position: "relative", width: "300px", height: "500px", border: "1px solid #ccc" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "250px",
              height: "100%",
              backgroundColor: "white",
              padding: "16px"
            }}
          >
            <h3>Filters</h3>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                <span style={{ backgroundColor: "#f0f0f0", padding: "4px 8px", borderRadius: "4px" }}>
                  Price: 10–50
                </span>
                <span style={{ backgroundColor: "#f0f0f0", padding: "4px 8px", borderRadius: "4px" }}>Nike</span>
              </div>
            </div>
            <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid #eee" }}>
              <button
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer"
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the sidebar in open state with sample filters applied. Notice how range filters (like 'Price: 10–50') include the filter name prefix while regular filters (like 'Nike') show only the value."
      }
    }
  }
}
