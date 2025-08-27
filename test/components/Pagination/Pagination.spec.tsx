import { describe, it, expect } from "vitest"
import { render } from "@testing-library/preact"
import { default as meta, Default } from "@/components/Pagination/Pagination.stories"
import { wrapStory } from "../../storybook"

describe("Pagination Stories", () => {
  const stories = [{ name: "Default", story: Default }]

  stories.forEach(({ name, story }) => {
    it(`renders ${name} story without errors`, () => {
      const element = wrapStory(story, meta)
      const { container } = render(element)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
