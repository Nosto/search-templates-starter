import { describe, it, expect } from "vitest"
import { render } from "@testing-library/preact"
import { default as meta, Default } from "@/components/Toolbar/Toolbar.stories"
import { wrapStory } from "../../storybook"

describe("Toolbar Stories", () => {
  const stories = [{ name: "Default", story: Default }]

  stories.forEach(({ name, story }) => {
    it(`renders ${name} story without errors`, () => {
      const element = wrapStory(story, meta)
      const { container } = render(element)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
