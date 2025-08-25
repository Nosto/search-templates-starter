import { describe, it, expect } from "vitest"
import { render } from "preact"
import { default as meta, Default, Selected, LongLabel } from "@/elements/Checkbox/Checkbox.stories"
import { wrapStory } from "../../storybook"

describe("Checkbox Stories", () => {
  const stories = [
    { name: "Default", story: Default },
    { name: "Selected", story: Selected },
    { name: "LongLabel", story: LongLabel }
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
