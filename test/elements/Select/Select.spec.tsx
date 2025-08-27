import { describe, it, expect } from "vitest"
import { render } from "@testing-library/preact"
import { default as meta, Default, WithSelectedValue, ManyOptions } from "@/elements/Select/Select.stories"
import { wrapStory } from "../../storybook"

describe("Select Stories", () => {
  const stories = [
    { name: "Default", story: Default },
    { name: "WithSelectedValue", story: WithSelectedValue },
    { name: "ManyOptions", story: ManyOptions }
  ]

  stories.forEach(({ name, story }) => {
    it(`renders ${name} story without errors`, () => {
      const element = wrapStory(story, meta)
      const { container } = render(element)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
