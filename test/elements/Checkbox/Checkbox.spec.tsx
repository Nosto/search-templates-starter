import { describe, it, expect } from "vitest"
import { render } from "preact"
import { h } from "preact"
import * as CheckboxStories from "../../../src/elements/Checkbox/Checkbox.stories"

describe("Checkbox Stories", () => {
  it("renders Default story without errors", () => {
    const story = CheckboxStories.Default
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(CheckboxStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders Selected story without errors", () => {
    const story = CheckboxStories.Selected
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(CheckboxStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders LongLabel story without errors", () => {
    const story = CheckboxStories.LongLabel
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(CheckboxStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })
})
