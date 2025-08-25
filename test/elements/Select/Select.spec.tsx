import { describe, it, expect } from "vitest"
import { render } from "preact"
import { h } from "preact"
import * as SelectStories from "../../../src/elements/Select/Select.stories"

describe("Select Stories", () => {
  it("renders Default story without errors", () => {
    const story = SelectStories.Default
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(SelectStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders WithSelectedValue story without errors", () => {
    const story = SelectStories.WithSelectedValue
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(SelectStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders ManyOptions story without errors", () => {
    const story = SelectStories.ManyOptions
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(SelectStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })
})
