import type { Meta, StoryObj } from "@storybook/preact"
import Sidebar from "./Sidebar"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { useSidebar } from "@/contexts/SidebarContext"
import Button from "@/elements/Button/Button"
import { mockCategoryFacet, mockBrandFacet, mockPriceFacet } from "../../../mocks/facets"

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} as Meta<typeof Sidebar>

type Story = StoryObj<typeof Sidebar>

function SidebarDemo() {
  const { isOpen, setOpen } = useSidebar()

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div style={{ padding: "20px" }}>
        <Button onClick={() => setOpen(!isOpen)}>{isOpen ? "Close Sidebar" : "Open Sidebar"}</Button>
        <p>Click the button above to see the sidebar slide animation.</p>
        <p>The sidebar slides from left to right when opening and right to left when closing.</p>
        <p>The backdrop also fades in and out smoothly.</p>
      </div>
      <MockSidebar />
    </div>
  )
}

// Mock sidebar component that always shows content for demonstration
function MockSidebar() {
  const { isOpen, setOpen } = useSidebar()

  const handleBackdropClick = () => {
    setOpen(false)
  }

  const mockFacets = [mockCategoryFacet, mockBrandFacet, mockPriceFacet]

  return (
    <>
      {/* Backdrop */}
      <button
        className="backdrop"
        onClick={handleBackdropClick}
        onKeyDown={e => {
          if (e.key === "Escape") {
            handleBackdropClick()
          }
        }}
        aria-label="Close sidebar filters"
        style={{
          top: 0,
          left: 0,
          zIndex: 1051,
          opacity: isOpen ? 0.5 : 0,
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "#000000",
          border: "none",
          cursor: "pointer",
          transition: "opacity 0.3s ease",
          visibility: isOpen ? "visible" : "hidden",
          display: isOpen ? "block" : "none"
        }}
      />
      <div
        className="sidebar-wrapper"
        style={{
          top: 0,
          left: 0,
          zIndex: 1052,
          maxWidth: "400px",
          minWidth: "400px",
          width: "400px",
          height: "100%",
          position: "fixed",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          visibility: isOpen ? "visible" : "hidden"
        }}
      >
        <div
          className="sidebar-content"
          style={{
            overflowY: "auto",
            position: "relative",
            backgroundColor: "#ffffff",
            height: "100%",
            marginRight: 0,
            padding: "0.25rem",
            minWidth: "400px",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              padding: "1rem",
              borderBottom: "1px solid #f0f3f6"
            }}
          >
            <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "bold" }}>Filters</h2>
            <Button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                maxWidth: "38px"
              }}
            >
              ×
            </Button>
          </div>
          <div style={{ padding: "1rem" }}>
            {mockFacets.map(facet => (
              <div
                key={facet.id}
                style={{ marginBottom: "1rem", borderBottom: "1px solid #f0f3f6", paddingBottom: "1rem" }}
              >
                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>{facet.name}</h3>
                {facet.type === "terms" && (
                  <div>
                    {facet.data.map(item => (
                      <label
                        key={item.value}
                        style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.75rem" }}
                      >
                        <input type="checkbox" defaultChecked={item.selected} style={{ marginRight: "0.5rem" }} />
                        {item.value} ({item.count})
                      </label>
                    ))}
                  </div>
                )}
                {facet.type === "stats" && (
                  <div style={{ fontSize: "0.75rem" }}>
                    <label style={{ display: "block", marginBottom: "0.25rem" }}>
                      Min:{" "}
                      <input
                        type="number"
                        min={facet.min}
                        max={facet.max}
                        defaultValue={facet.min}
                        style={{ width: "60px" }}
                      />
                    </label>
                    <label style={{ display: "block" }}>
                      Max:{" "}
                      <input
                        type="number"
                        min={facet.min}
                        max={facet.max}
                        defaultValue={facet.max}
                        style={{ width: "60px" }}
                      />
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const MockedView: Story = {
  render: () => (
    <SidebarProvider>
      <SidebarDemo />
    </SidebarProvider>
  )
}
