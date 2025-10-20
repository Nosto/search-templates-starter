import type { Meta, StoryObj } from "@storybook/preact"
import RangeDropdown from "./RangeDropdown"
import { mockPriceFacet, mockRatingFacet, mockWeightFacet } from "@mocks/facets"
import { withSearchContext, withContainer } from ".storybook/decorators"

export default {
  title: "Components/FilterTopbar/RangeDropdown",
  component: RangeDropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A range filter dropdown component that allows users to set minimum and maximum values for numeric facets. Uses the `useRange()` hook for filter state management and provides input fields for precise range selection."
      }
    }
  },
  decorators: [withSearchContext, withContainer],
  tags: ["autodocs"]
} as Meta<typeof RangeDropdown>

type Story = StoryObj<typeof RangeDropdown>

export const Default: Story = {
  args: {
    facet: mockPriceFacet
  },
  parameters: {
    docs: {
      description: {
        story: "Default price range dropdown showing facet name as trigger value and expandable range input controls."
      }
    }
  }
}

export const CustomerRating: Story = {
  args: {
    facet: mockRatingFacet
  },
  parameters: {
    docs: {
      description: {
        story: "Customer rating range filter with a smaller numeric range (1-5 stars)."
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
        story: "Weight range filter demonstrating decimal value support (0.1 - 25.0 kg)."
      }
    }
  }
}
