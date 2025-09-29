import type { Meta, StoryObj } from "@storybook/preact"
import TermsFacet from "./TermsFacet"
import { mockCategoryFacet, mockBrandFacet } from "@mocks/facets"
import { withContainer, withSearchContext, withSidebarContext } from ".storybook/decorators"

export default {
  title: "Components/TermsFacet",
  component: TermsFacet,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext, withSidebarContext, withContainer],
  tags: ["autodocs"]
} as Meta<typeof TermsFacet>

type Story = StoryObj<typeof TermsFacet>

export const Default: Story = {
  args: {
    facet: mockCategoryFacet
  }
}

export const WithSelectedFilters: Story = {
  args: {
    facet: {
      ...mockCategoryFacet,
      data: [
        { value: "shoes", count: 42, selected: true },
        { value: "clothing", count: 28, selected: true },
        { value: "accessories", count: 15, selected: false }
      ]
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Facet with multiple selected filters showing the selected count badge."
      }
    }
  }
}

export const LargeFacet: Story = {
  args: {
    facet: mockBrandFacet
  }
}
