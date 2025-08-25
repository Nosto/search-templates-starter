import { describe, it, expect } from "vitest"
import { render } from "preact"
import { h } from "preact"
import * as LoaderStories from "../../../src/elements/Loader/Loader.stories"

describe("Loader Stories", () => {
  it("renders Default story without errors", () => {
    const story = LoaderStories.Default
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(LoaderStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })
})
