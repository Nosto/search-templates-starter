import type { Meta, StoryObj } from "@storybook/preact-vite"
import RangeFacet from "./RangeFacet"
import { mockPriceFacet, mockRatingFacet, mockWeightFacet } from "@mocks/facets"
import { withContainer, withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/FilterSidebar/RangeFacet",
  component: RangeFacet,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext, withContainer],
  tags: ["autodocs"]
} as Meta<typeof RangeFacet>

type Story = StoryObj<typeof RangeFacet>

export const Default: Story = {
  args: {
    facet: mockPriceFacet,
    defaultActive: true
  }
}

export const LargeRange: Story = {
  args: {
    facet: mockRatingFacet
  },
  parameters: {
    docs: {
      description: {
        story: "Range facet with a smaller numeric range for ratings."
      }
    }
  }
}

export const WeightRange: Story = {
  args: {
    facet: mockWeightFacet
  }
}
