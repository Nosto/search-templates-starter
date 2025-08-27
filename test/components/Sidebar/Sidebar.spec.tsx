import { describe, it, expect } from "vitest"
import { render } from "@testing-library/preact"
import { default as meta, Default } from "@/components/Sidebar/Sidebar.stories"
import { wrapStory } from "../../storybook"

describe("Sidebar Stories", () => {
  const stories = [{ name: "Default", story: Default }]

  stories.forEach(({ name, story }) => {
    it(`renders ${name} story without errors`, () => {
      const element = wrapStory(story, meta)
      expect(() => render(element)).not.toThrow()
    })
  })
})
