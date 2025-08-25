import { describe, it, expect } from "vitest"
import { render } from "preact"
import { h } from "preact"
import * as IconStories from "../../../src/elements/Icon/Icon.stories"

describe("Icon Stories", () => {
  it("renders Default story without errors", () => {
    const story = IconStories.Default
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(IconStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders All story without errors", () => {
    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = IconStories.All.render()
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })
})
