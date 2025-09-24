import { render, screen, fireEvent } from "@testing-library/preact"
import { describe, it, expect } from "vitest"
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext"

function TestSidebarComponent() {
  const { isOpen, toggle, setOpen } = useSidebar()

  return (
    <>
      <div data-testid="sidebar-status">{isOpen ? "open" : "closed"}</div>
      <button data-testid="toggle-button" onClick={toggle}>
        Toggle
      </button>
      <button data-testid="open-button" onClick={() => setOpen(true)}>
        Open
      </button>
      <button data-testid="close-button" onClick={() => setOpen(false)}>
        Close
      </button>
    </>
  )
}

describe("SidebarContext", () => {
  it("should provide default closed state", () => {
    render(
      <SidebarProvider>
        <TestSidebarComponent />
      </SidebarProvider>
    )

    expect(screen.getByTestId("sidebar-status").textContent).toBe("closed")
  })

  it("should accept initialOpen prop to start with open state", () => {
    render(
      <SidebarProvider initialOpen={true}>
        <TestSidebarComponent />
      </SidebarProvider>
    )

    expect(screen.getByTestId("sidebar-status").textContent).toBe("open")
  })

  it("should toggle sidebar state", () => {
    render(
      <SidebarProvider>
        <TestSidebarComponent />
      </SidebarProvider>
    )

    const toggleButton = screen.getByTestId("toggle-button")
    const status = screen.getByTestId("sidebar-status")

    expect(status.textContent).toBe("closed")

    fireEvent.click(toggleButton)
    expect(status.textContent).toBe("open")

    fireEvent.click(toggleButton)
    expect(status.textContent).toBe("closed")
  })

  it("should set sidebar state directly", () => {
    render(
      <SidebarProvider>
        <TestSidebarComponent />
      </SidebarProvider>
    )

    const openButton = screen.getByTestId("open-button")
    const closeButton = screen.getByTestId("close-button")
    const status = screen.getByTestId("sidebar-status")

    fireEvent.click(openButton)
    expect(status.textContent).toBe("open")

    fireEvent.click(closeButton)
    expect(status.textContent).toBe("closed")
  })

  it("should throw error when used outside provider", () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = () => {}

    expect(() => {
      render(<TestSidebarComponent />)
    }).toThrow("useSidebar must be used within a SidebarProvider")

    console.error = originalError
  })
})
