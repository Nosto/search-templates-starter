import { describe, it, expect } from "vitest"
import cl from "../../src/utils/cl"

describe("cl - classname joining utility", () => {
  it("joins truthy class names with spaces", () => {
    expect(cl("class1", "class2", "class3")).toBe("class1 class2 class3")
  })

  it("filters out falsy values", () => {
    expect(cl("class1", false, "class2", null, "class3", undefined, "")).toBe("class1 class2 class3")
  })

  it("handles conditional classes", () => {
    const isActive = true
    const isDisabled = false
    expect(cl("btn", isActive && "active", isDisabled && "disabled")).toBe("btn active")
  })

  it("handles numbers", () => {
    expect(cl("class", 0, "other", 1, "final")).toBe("class other 1 final")
  })

  it("returns empty string for all falsy values", () => {
    expect(cl(false, null, undefined, "", 0)).toBe("")
  })

  it("handles no arguments", () => {
    expect(cl()).toBe("")
  })

  it("handles single argument", () => {
    expect(cl("single-class")).toBe("single-class")
  })
})
