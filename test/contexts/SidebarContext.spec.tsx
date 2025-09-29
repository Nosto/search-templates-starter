import { render, screen, fireEvent } from "@testing-library/preact"
import { describe, it, expect } from "vitest"
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext"

function TestSidebarComponent() {
  const { isOpen, toggle, setOpen, openedFacets, setFacetOpen, closeAllFacets } = useSidebar()

  return (
    <>
      <div data-testid="sidebar-status">{isOpen ? "open" : "closed"}</div>
      <div data-testid="opened-facets">{Array.from(openedFacets).join(",")}</div>
      <button data-testid="toggle-button" onClick={toggle}>
        Toggle
      </button>
      <button data-testid="open-button" onClick={() => setOpen(true)}>
        Open
      </button>
      <button data-testid="close-button" onClick={() => setOpen(false)}>
        Close
      </button>
      <button data-testid="open-facet-1" onClick={() => setFacetOpen("facet-1", true)}>
        Open Facet 1
      </button>
      <button data-testid="close-facet-1" onClick={() => setFacetOpen("facet-1", false)}>
        Close Facet 1
      </button>
      <button data-testid="open-facet-2" onClick={() => setFacetOpen("facet-2", true)}>
        Open Facet 2
      </button>
      <button data-testid="close-all-facets" onClick={closeAllFacets}>
        Close All Facets
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

  describe("Facet State Management", () => {
    it("should start with no opened facets", () => {
      render(
        <SidebarProvider>
          <TestSidebarComponent />
        </SidebarProvider>
      )

      expect(screen.getByTestId("opened-facets").textContent).toBe("")
    })

    it("should open and close individual facets", () => {
      render(
        <SidebarProvider>
          <TestSidebarComponent />
        </SidebarProvider>
      )

      const openedFacets = screen.getByTestId("opened-facets")
      const openFacet1 = screen.getByTestId("open-facet-1")
      const closeFacet1 = screen.getByTestId("close-facet-1")

      // Open facet 1
      fireEvent.click(openFacet1)
      expect(openedFacets.textContent).toBe("facet-1")

      // Close facet 1
      fireEvent.click(closeFacet1)
      expect(openedFacets.textContent).toBe("")
    })

    it("should manage multiple facets independently", () => {
      render(
        <SidebarProvider>
          <TestSidebarComponent />
        </SidebarProvider>
      )

      const openedFacets = screen.getByTestId("opened-facets")
      const openFacet1 = screen.getByTestId("open-facet-1")
      const openFacet2 = screen.getByTestId("open-facet-2")
      const closeFacet1 = screen.getByTestId("close-facet-1")

      // Open both facets
      fireEvent.click(openFacet1)
      fireEvent.click(openFacet2)

      // Should contain both facets (order may vary)
      const facetsList = openedFacets.textContent?.split(",") || []
      expect(facetsList).toContain("facet-1")
      expect(facetsList).toContain("facet-2")
      expect(facetsList.length).toBe(2)

      // Close facet 1
      fireEvent.click(closeFacet1)
      expect(openedFacets.textContent).toBe("facet-2")
    })

    it("should close all facets when closeAllFacets is called", () => {
      render(
        <SidebarProvider>
          <TestSidebarComponent />
        </SidebarProvider>
      )

      const openedFacets = screen.getByTestId("opened-facets")
      const openFacet1 = screen.getByTestId("open-facet-1")
      const openFacet2 = screen.getByTestId("open-facet-2")
      const closeAllFacets = screen.getByTestId("close-all-facets")

      // Open both facets
      fireEvent.click(openFacet1)
      fireEvent.click(openFacet2)

      // Verify both are open
      const facetsList = openedFacets.textContent?.split(",") || []
      expect(facetsList.length).toBe(2)

      // Close all facets
      fireEvent.click(closeAllFacets)
      expect(openedFacets.textContent).toBe("")
    })
  })
})
