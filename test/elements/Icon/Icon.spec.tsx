import { describe, it, expect } from "vitest"
import { render } from "@testing-library/preact"
import { default as meta, Default, All } from "@/elements/Icon/Icon.stories"
import { wrapStory } from "../../storybook"

describe("Icon Stories", () => {
  const stories = [
    { name: "Default", story: Default },
    { name: "All", story: All }
  ]

  stories.forEach(({ name, story }) => {
    it(`renders ${name} story without errors`, () => {
      const element = wrapStory(story, meta)
      const { container } = render(element)
      expect(container).toBeInTheDocument()
      // Check that something was rendered (element or text content)
      expect(container.innerHTML.length).toBeGreaterThan(0)
    })
  })
})
