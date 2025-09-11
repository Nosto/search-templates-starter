import type { Meta, StoryObj } from "@storybook/preact"
import Sidebar from "./Sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext"
import { useState } from "preact/hooks"

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Sidebar>

type Story = StoryObj<typeof Sidebar>

function SidebarTestComponent() {
  const [isOpen, setOpen] = useState(false)

  // Mock the useFacets hook by providing fake data to test animation
  const mockFacets = [
    {
      id: "color",
      type: "terms",
      name: "Color",
      values: [
        { value: "red", count: 5, selected: false },
        { value: "blue", count: 3, selected: false }
      ]
    },
    {
      id: "size",
      type: "terms",
      name: "Size",
      values: [
        { value: "small", count: 4, selected: false },
        { value: "large", count: 2, selected: false }
      ]
    }
  ]

  // Temporarily override the facets check to test animation
  const SidebarWithData = () => {
    const { isOpen, setOpen } = useSidebar()

    const handleBackdropClick = () => {
      setOpen(false)
    }

    // Always render to test animation regardless of facets
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <button
            className="backdrop-test"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1051,
              opacity: 0.5,
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              border: "none",
              cursor: "pointer"
            }}
            onClick={handleBackdropClick}
            onKeyDown={e => {
              if (e.key === "Escape") {
                handleBackdropClick()
              }
            }}
            aria-label="Close sidebar filters"
          />
        )}
        <div
          className={`sidebar-wrapper ${isOpen ? "open" : ""}`}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1052,
            maxWidth: "400px",
            transition: "transform 0.3s ease",
            height: "100%",
            transform: isOpen ? "translateX(0)" : "translateX(-100%)"
          }}
        >
          <div
            style={{
              overflowY: "auto",
              position: "relative",
              backgroundColor: "white",
              height: "100%",
              marginRight: 0,
              padding: "1.5rem",
              minWidth: "400px"
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
              <span style={{ fontWeight: 500, color: "black" }}>Filters</span>
              <button
                onClick={() => setOpen(false)}
                style={{
                  border: "none",
                  maxWidth: "38px",
                  top: "10px",
                  right: "10px",
                  position: "absolute",
                  display: "block",
                  textAlign: "right",
                  alignItems: "center",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  background: "transparent"
                }}
              >
                ✕
              </button>
            </div>
            <div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {mockFacets.map(facet => (
                  <li key={facet.id} style={{ borderBottom: "1px solid #f0f3f6" }}>
                    <button
                      style={{
                        cursor: "pointer",
                        display: "inline-block",
                        position: "relative",
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "1rem",
                        background: "none",
                        border: "none",
                        textAlign: "left"
                      }}
                    >
                      <span
                        style={{
                          color: "black",
                          fontSize: "0.9rem",
                          fontWeight: 500
                        }}
                      >
                        {facet.name}
                      </span>
                      <span
                        style={{
                          whiteSpace: "nowrap",
                          verticalAlign: "baseline",
                          lineHeight: 1,
                          display: "inline-block",
                          textAlign: "center",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          borderRadius: "50px",
                          color: "white",
                          backgroundColor: "#2473d6",
                          padding: "0.1rem 0.35rem",
                          marginLeft: "0.25rem"
                        }}
                      >
                        {facet.values.length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <SidebarProvider>
      <div style={{ position: "relative", width: "500px", height: "400px", overflow: "hidden" }}>
        <div style={{ padding: "1rem" }}>
          <button
            onClick={() => setOpen(!isOpen)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#2473d6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {isOpen ? "Close" : "Open"} Sidebar
          </button>
          <p style={{ margin: "1rem 0", fontSize: "0.9rem" }}>
            Click the button to test the slide animation. The sidebar should slide in from the left when opened and
            slide out to the left when closed.
          </p>
        </div>
        <SidebarWithData />
      </div>
    </SidebarProvider>
  )
}

export const MockedView: Story = {
  render: () => <SidebarTestComponent />
}
