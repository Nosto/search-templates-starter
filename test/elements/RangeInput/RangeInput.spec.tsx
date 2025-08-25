import { describe, it, expect } from "vitest"
import { render } from "preact"
import { h } from "preact"
import * as RangeInputStories from "../../../src/elements/RangeInput/RangeInput.stories"

describe("RangeInput Stories", () => {
  it("renders Default story without errors", () => {
    const story = RangeInputStories.Default
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(RangeInputStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders WithValue story without errors", () => {
    const story = RangeInputStories.WithValue
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(RangeInputStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders WithMinMax story without errors", () => {
    const story = RangeInputStories.WithMinMax
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(RangeInputStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders Disabled story without errors", () => {
    const story = RangeInputStories.Disabled
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(RangeInputStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })
})
