import type { Meta, StoryObj } from "@storybook/preact"
import Facet from "./Facet"
import { mockCategoryFacet, mockBrandFacet, mockColorFacet } from "@mocks/facets"

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

export const ColorFacet: Story = {
  args: {
    facet: mockColorFacet
  },
  parameters: {
    docs: {
      description: {
        story: "Color facet showing color circles inside pills for each color option."
      }
    }
  }
}

export const ColorFacetWithSelection: Story = {
  args: {
    facet: {
      ...mockColorFacet,
      data: [
        { value: "red", count: 35, selected: false },
        { value: "blue", count: 28, selected: true },
        { value: "green", count: 22, selected: false },
        { value: "black", count: 41, selected: true },
        { value: "white", count: 33, selected: false },
        { value: "yellow", count: 19, selected: false }
      ]
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Color facet with selected colors showing both color circles and selection states."
      }
    }
  }
}
