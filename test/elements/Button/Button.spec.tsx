import { describe, it, expect } from "vitest"
import { render } from "preact"
import { default as meta, Default, WithIcon, Light, IconOnly, Disabled } from "@/elements/Button/Button.stories"
import { wrapStory } from "../../storybook"

describe("Button Stories", () => {
  const stories = [
    { name: "Default", story: Default },
    { name: "WithIcon", story: WithIcon },
    { name: "Light", story: Light },
    { name: "IconOnly", story: IconOnly },
    { name: "Disabled", story: Disabled }
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
