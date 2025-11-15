import type { Meta, StoryObj } from "@storybook/preact-vite"
import SectionProducts from "./SectionProducts"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/SectionProducts",
  component: SectionProducts,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof SectionProducts>

type Story = StoryObj<typeof SectionProducts>

/**
 * The SectionProducts component requires integration with Nosto search context to work.
 * This story demonstrates what the component structure looks like when properly integrated.
 *
 * In a real Shopify environment, this component fetches HTML from:
 * `/search?section_id={sectionId}&q={productHandles}`
 *
 * The component:
 * - Gets product handles from current search results via `useDecoratedSearchResults`
 * - Fetches rendered section HTML from Shopify
 * - Displays the HTML using `dangerouslySetInnerHTML`
 * - Maintains loading states matching the `Products` component
 */
export const MockedView: Story = {
  args: {
    sectionId: "product-grid"
  }
}
