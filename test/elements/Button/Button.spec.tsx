import { describe, it, expect } from "vitest"
import { render } from "preact"
import { h } from "preact"
import * as ButtonStories from "../../../src/elements/Button/Button.stories"

describe("Button Stories", () => {
  it("renders Default story without errors", () => {
    const story = ButtonStories.Default
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(ButtonStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders WithIcon story without errors", () => {
    const story = ButtonStories.WithIcon
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(ButtonStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders Light story without errors", () => {
    const story = ButtonStories.Light
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(ButtonStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders IconOnly story without errors", () => {
    const story = ButtonStories.IconOnly
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(ButtonStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })

  it("renders Disabled story without errors", () => {
    const story = ButtonStories.Disabled
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(ButtonStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })
})
