import type { Meta, StoryObj } from "@storybook/preact"
import Facet from "./Facet"
import { mockCategoryFacet, mockBrandFacet } from "@mocks/mocks"

export default {
  title: "Components/Facet/Facet",
  component: Facet,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Facet>

type Story = StoryObj<typeof Facet>

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
