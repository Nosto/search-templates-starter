import { describe, it, expect } from "vitest"
import { render } from "preact"
import { default as meta, Default, WithSelectedFilters, LargeFacet } from "@/components/Facet/Facet.stories"
import { wrapStory } from "../../storybook"

describe("Facet Stories", () => {
  const stories = [
    { name: "Default", story: Default },
    { name: "WithSelectedFilters", story: WithSelectedFilters },
    { name: "LargeFacet", story: LargeFacet }
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
