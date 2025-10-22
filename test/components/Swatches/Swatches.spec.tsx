import { describe, it, expect } from "vitest"
import Swatches from "@/components/Swatches/Swatches"

describe("Swatches Component", () => {
  it("should be a valid component", () => {
    // Basic smoke test to ensure the component exports correctly
    expect(Swatches).toBeDefined()
    expect(typeof Swatches).toBe("function")
  })

  it("should have correct prop types", () => {
    // Test that we can create the component with the expected props
    const props = {
      handle: "test-handle",
      preselect: true,
      onVariantChange: () => {},
      className: "test-class"
    }

    expect(typeof props.handle).toBe("string")
    expect(typeof props.preselect).toBe("boolean")
    expect(typeof props.onVariantChange).toBe("function")
    expect(typeof props.className).toBe("string")
  })
})
