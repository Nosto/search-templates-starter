import type { Meta, StoryObj } from "@storybook/preact"
import RangeFacet from "./RangeFacet"
import { mockPriceFacet, mockRatingFacet, mockWeightFacet } from "@mocks/facets"
import { withContainer, withSearchContext, withSidebarContext } from ".storybook/decorators"

export default {
  title: "Components/RangeFacet",
  component: RangeFacet,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext, withSidebarContext, withContainer],
  tags: ["autodocs"]
} as Meta<typeof RangeFacet>

type Story = StoryObj<typeof RangeFacet>

export const Default: Story = {
  args: {
    facet: mockPriceFacet
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
