import { describe, it, expect } from "vitest"
import { render } from "@testing-library/preact"
import { default as meta, Default, WithValue, WithMinMax, Disabled } from "@/elements/RangeInput/RangeInput.stories"
import { wrapStory } from "../../storybook"

describe("RangeInput Stories", () => {
  const stories = [
    { name: "Default", story: Default },
    { name: "WithValue", story: WithValue },
    { name: "WithMinMax", story: WithMinMax },
    { name: "Disabled", story: Disabled }
  ]

  stories.forEach(({ name, story }) => {
    it(`renders ${name} story without errors`, () => {
      const element = wrapStory(story, meta)
      const { container } = render(element)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
