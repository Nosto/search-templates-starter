import type { Meta, StoryObj } from "@storybook/preact"
import RangeFacet from "./RangeFacet"
import { mockPriceFacet, mockRatingFacet, mockWeightFacet } from "@mocks/facets"

export default {
  title: "Components/Facet/RangeFacet",
  component: RangeFacet,
  parameters: {
    layout: "centered"
  },
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
