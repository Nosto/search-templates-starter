import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/preact"
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
      const element = wrapStory(story, meta)
      const { container } = render(element)
      expect(container.firstChild).toBeInTheDocument()
      expect(screen.getByRole("checkbox")).toBeInTheDocument()
    })
  })
})
