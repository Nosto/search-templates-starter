import { describe, it, expect } from "vitest"
import { render } from "preact"
import { h } from "preact"
import * as NoResultsStories from "../../../src/components/NoResults/NoResults.stories"

describe("NoResults Stories", () => {
  it("renders Default story without errors", () => {
    const story = NoResultsStories.Default
    const args = story.args || {}

    const container = document.createElement("div")
    document.body.appendChild(container)

    const element = h(NoResultsStories.default.component, args)
    render(element, container)

    expect(container.firstChild).toBeDefined()

    document.body.removeChild(container)
  })
})
