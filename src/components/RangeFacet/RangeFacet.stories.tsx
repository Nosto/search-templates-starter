import type { Meta, StoryObj } from "@storybook/preact"
import RangeFacet from "./RangeFacet"
import { mockPriceFacet, mockRatingFacet, mockWeightFacet } from "@mocks/facets"

export default {
  title: "Components/RangeFacet/RangeFacet",
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
  },
  parameters: {
    docs: {
      description: {
        story:
          "Range facet with dual slider for price selection. Users can drag both ends of the slider to set minimum and maximum values."
      }
    }
  }
}

export const LargeRange: Story = {
  args: {
    facet: mockRatingFacet
  },
  parameters: {
    docs: {
      description: {
        story:
          "Range facet with a smaller numeric range for ratings (1-5). The dual slider adapts to different value ranges."
      }
    }
  }
}

export const WeightRange: Story = {
  args: {
    facet: mockWeightFacet
  },
  parameters: {
    docs: {
      description: {
        story: "Range facet for weight values (0.1-25.0). Demonstrates dual slider with decimal ranges."
      }
    }
  }
}
