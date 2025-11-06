import { render, waitFor } from "@testing-library/preact"
import { describe, it, expect, beforeEach } from "vitest"
import Portal from "@/elements/Portal/Portal"

describe("Portal", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
  })

  it("should render children into target element", async () => {
    const targetElement = document.createElement("div")
    targetElement.id = "portal-target"
    document.body.appendChild(targetElement)

    render(
      <Portal target="#portal-target">
        <div data-testid="portal-content">Portal Content</div>
      </Portal>
    )

    await waitFor(() => {
      const content = targetElement.querySelector('[data-testid="portal-content"]')
      expect(content).toBeTruthy()
      expect(content?.textContent).toBe("Portal Content")
    })
  })

  it("should append to existing content by default", async () => {
    const targetElement = document.createElement("div")
    targetElement.id = "portal-target"
    targetElement.innerHTML = "<div>Existing Content</div>"
    document.body.appendChild(targetElement)

    render(
      <Portal target="#portal-target">
        <div data-testid="portal-content">New Content</div>
      </Portal>
    )

    await waitFor(() => {
      expect(targetElement.innerHTML).toContain("Existing Content")
      expect(targetElement.innerHTML).toContain("New Content")
    })
  })

  it("should append to existing content when replace is false", async () => {
    const targetElement = document.createElement("div")
    targetElement.id = "portal-target"
    targetElement.innerHTML = "<div>Existing Content</div>"
    document.body.appendChild(targetElement)

    render(
      <Portal target="#portal-target" replace={false}>
        <div data-testid="portal-content">New Content</div>
      </Portal>
    )

    await waitFor(() => {
      expect(targetElement.innerHTML).toContain("Existing Content")
      expect(targetElement.innerHTML).toContain("New Content")
    })
  })

  it("should replace existing content when replace is true", async () => {
    const targetElement = document.createElement("div")
    targetElement.id = "portal-target"
    targetElement.innerHTML = "<div>Existing Content</div>"
    document.body.appendChild(targetElement)

    render(
      <Portal target="#portal-target" replace>
        <div data-testid="portal-content">New Content</div>
      </Portal>
    )

    await waitFor(() => {
      expect(targetElement.innerHTML).not.toContain("Existing Content")
      expect(targetElement.innerHTML).toContain("New Content")
      const content = targetElement.querySelector('[data-testid="portal-content"]')
      expect(content?.textContent).toBe("New Content")
    })
  })

  it("should wait for target element to appear in DOM", async () => {
    render(
      <Portal target="#delayed-target">
        <div data-testid="portal-content">Delayed Content</div>
      </Portal>
    )

    setTimeout(() => {
      const targetElement = document.createElement("div")
      targetElement.id = "delayed-target"
      document.body.appendChild(targetElement)
    }, 50)

    await waitFor(
      () => {
        const targetElement = document.getElementById("delayed-target")
        const content = targetElement?.querySelector('[data-testid="portal-content"]')
        expect(content).toBeTruthy()
        expect(content?.textContent).toBe("Delayed Content")
      },
      { timeout: 2000 }
    )
  })

  it("should clear existing content only once when replace is true", async () => {
    const targetElement = document.createElement("div")
    targetElement.id = "portal-target"
    targetElement.innerHTML = "<div>Initial Content</div>"
    document.body.appendChild(targetElement)

    const { rerender } = render(
      <Portal target="#portal-target" replace>
        <div data-testid="portal-content">First Render</div>
      </Portal>
    )

    await waitFor(() => {
      expect(targetElement.innerHTML).not.toContain("Initial Content")
      expect(targetElement.innerHTML).toContain("First Render")
    })

    rerender(
      <Portal target="#portal-target" replace>
        <div data-testid="portal-content">Second Render</div>
      </Portal>
    )

    await waitFor(() => {
      expect(targetElement.innerHTML).toContain("Second Render")
    })
  })

  it("should render nothing when target element does not exist and never appears", () => {
    const { container } = render(
      <Portal target="#nonexistent-target">
        <div data-testid="portal-content">Content</div>
      </Portal>
    )

    expect(container.innerHTML).toBe("")
  })

  it("should handle complex children content", async () => {
    const targetElement = document.createElement("div")
    targetElement.id = "portal-target"
    document.body.appendChild(targetElement)

    render(
      <Portal target="#portal-target">
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </div>
      </Portal>
    )

    await waitFor(() => {
      expect(targetElement.querySelector("h1")?.textContent).toBe("Title")
      expect(targetElement.querySelector("p")?.textContent).toBe("Description")
      expect(targetElement.querySelector("button")?.textContent).toBe("Action")
    })
  })
})
