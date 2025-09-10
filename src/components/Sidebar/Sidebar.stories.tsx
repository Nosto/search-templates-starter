import type { Meta, StoryObj } from "@storybook/preact"
import { useState } from "preact/hooks"
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
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
      <SidebarProvider>
        <div style={{ position: "relative", width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
              position: "absolute", 
              top: "20px", 
              left: "20px", 
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              zIndex: 1000
            }}
          >
            {isOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>
          
          {/* Mock sidebar implementation to test animations */}
          <div>
            {/* Backdrop */}
            <button
              className={`backdrop ${isOpen ? 'visible' : ''}`}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                border: "none",
                cursor: "pointer",
                opacity: isOpen ? 0.5 : 0,
                pointerEvents: isOpen ? "auto" : "none",
                transition: "opacity 0.3s ease",
                zIndex: 999
              }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Sidebar */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "300px",
                height: "100%",
                backgroundColor: "white",
                transform: isOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.3s ease",
                zIndex: 1000,
                boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                  <h2 style={{ margin: 0 }}>Filters</h2>
                  <button 
                    onClick={() => setIsOpen(false)}
                    style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}
                  >
                    ×
                  </button>
                </div>
                
                {/* Mock filter sections */}
                <div style={{ marginBottom: "10px" }}>
                  <FilterSection title="Brand" isOpen={true} />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <FilterSection title="Color" isOpen={false} />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <FilterSection title="Size" isOpen={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )
  }
}

function FilterSection({ title, isOpen: initialOpen }: { title: string; isOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "4px" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "transparent",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span>{title}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      
      <div
        style={{
          maxHeight: isOpen ? "200px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          backgroundColor: "#f9f9f9"
        }}
      >
        <div style={{ padding: "12px" }}>
          <div style={{ marginBottom: "8px" }}>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" style={{ marginRight: "8px" }} />
              Option 1
            </label>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" style={{ marginRight: "8px" }} />
              Option 2
            </label>
          </div>
          <div>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" style={{ marginRight: "8px" }} />
              Option 3
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
