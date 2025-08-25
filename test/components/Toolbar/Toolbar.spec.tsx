import { describe, it, expect } from "vitest"
import { render } from "preact"
import { default as meta, Default } from "@/components/Toolbar/Toolbar.stories"
import { wrapStory } from "../../storybook"

describe("Toolbar Stories", () => {
  const stories = [{ name: "Default", story: Default }]

  stories.forEach(({ name, story }) => {
    it(`renders ${name} story without errors`, () => {
      const container = document.createElement("div")
      const element = wrapStory(story, meta)
      render(element, container)
      expect(container.firstChild).toBeDefined()
    })
  })
})
