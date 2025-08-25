import { describe, it, expect } from "vitest"
import { render } from "preact"
import { default as meta, Default } from "@/components/SelectedFilters/SelectedFilters.stories"
import { wrapStory } from "../../storybook"

describe("SelectedFilters Stories", () => {
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
