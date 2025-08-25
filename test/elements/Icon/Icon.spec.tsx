import { describe, it, expect } from "vitest"
import { render } from "preact"
import { default as meta, Default, All } from "@/elements/Icon/Icon.stories"
import { wrapStory } from "../../storybook"

describe("Icon Stories", () => {
  const stories = [
    { name: "Default", story: Default },
    { name: "All", story: All }
  ]

  stories.forEach(({ name, story }) => {
    it(`renders ${name} story without errors`, () => {
      const container = document.createElement("div")
      const element = wrapStory(story, meta)
      render(element, container)
      expect(container.firstChild).toBeDefined()
    })
  })
})
