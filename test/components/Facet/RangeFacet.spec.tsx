import { describe, it, expect } from "vitest"
import { render } from "@testing-library/preact"
import { default as meta, Default, LargeRange, WeightRange } from "@/components/Facet/RangeFacet.stories"
import { wrapStory } from "../../storybook"

describe("RangeFacet Stories", () => {
  const stories = [
    { name: "Default", story: Default },
    { name: "LargeRange", story: LargeRange },
    { name: "WeightRange", story: WeightRange }
  ]

  stories.forEach(({ name, story }) => {
    it(`renders ${name} story without errors`, () => {
      const element = wrapStory(story, meta)
      const { container } = render(element)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
