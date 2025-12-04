import type { Meta, StoryObj } from "@storybook/preact-vite"
import RangeSelector from "./RangeSelector"
import { mockPriceFacet, mockWeightFacet } from "@mocks/facets"
import { withContainer, withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/FilterSidebar/RangeSelector",
  component: RangeSelector,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext, withContainer],
  tags: ["autodocs"]
} as Meta<typeof RangeSelector>

type Story = StoryObj<typeof RangeSelector>

export const Default: Story = {
  args: {
    facet: mockPriceFacet,
    defaultActive: true
  }
}

export const WithCustomRangeSize: Story = {
  args: {
    facet: mockPriceFacet,
    rangeSize: 250
  },
  parameters: {
    docs: {
      description: {
        story: "Range selector with custom range size for larger bucket intervals."
      }
    }
  }
}

export const WeightRanges: Story = {
  args: {
    facet: mockWeightFacet,
    rangeSize: 5
  },
  parameters: {
    docs: {
      description: {
        story: "Range selector with weight ranges demonstrating smaller bucket intervals."
      }
    }
  }
}
