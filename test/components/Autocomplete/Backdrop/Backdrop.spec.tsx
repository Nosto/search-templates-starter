import { render } from "@testing-library/preact"
import { describe, it, expect, vi } from "vitest"
import Backdrop from "@/components/Autocomplete/Backdrop/Backdrop"

describe("Backdrop", () => {
  it("renders backdrop when visible", () => {
    const onClick = vi.fn()
    const { container } = render(<Backdrop isVisible={true} onClick={onClick} />)

    const backdrop = container.querySelector("div")
    expect(backdrop).toBeDefined()
    expect(backdrop?.getAttribute("aria-hidden")).toBe("true")
  })

  it("does not render when not visible", () => {
    const onClick = vi.fn()
    const { container } = render(<Backdrop isVisible={false} onClick={onClick} />)

    expect(container.innerHTML).toBe("")
  })

  it("calls onClick when clicked", () => {
    const onClick = vi.fn()
    const { container } = render(<Backdrop isVisible={true} onClick={onClick} />)

    const backdrop = container.querySelector("div")
    backdrop?.click()

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
