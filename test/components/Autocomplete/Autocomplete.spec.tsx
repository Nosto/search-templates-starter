import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/preact"
import { default as meta, Default, Interactive } from "@/components/Autocomplete/Autocomplete.stories"
import { wrapStory } from "../../storybook"

describe("Autocomplete Stories", () => {
  const stories = [
    { name: "Default", story: Default },
    { name: "Interactive", story: Interactive }
  ]

  stories.forEach(({ name, story }) => {
    it(`renders ${name} story without errors`, () => {
      const element = wrapStory(story, meta)
      const { container } = render(element)
      expect(container.firstChild).toBeInTheDocument()
      expect(screen.getByRole("searchbox")).toBeInTheDocument()
    })
  })
})
