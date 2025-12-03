import type { Meta, StoryObj } from "@storybook/preact-vite"
import RangeSelector from "./RangeSelector"
import { mockPriceFacet, mockWeightFacet } from "@mocks/facets"
import { withContainer, withSearchContext } from ".storybook/decorators"

export default {
  title: "Elements/RangeSelector",
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
    facet: mockPriceFacet
  }
}

export const CustomBuckets: Story = {
  args: {
    facet: mockPriceFacet,
    buckets: [
      { min: 0, max: 250, label: "£0 - £250" },
      { min: 250, max: 500, label: "£250 - £500" },
      { min: 500, max: 750, label: "£500 - £750" },
      { min: 750, max: 1000, label: "£750 - £1,000" },
      { min: 1000, max: 1250, label: "£1,000 - £1,250" },
      { min: 1250, max: 7992, label: "£1,250 - £7,992" }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: "Range selector with custom price buckets matching the Holloways example."
      }
    }
  }
}

export const WeightBuckets: Story = {
  args: {
    facet: mockWeightFacet,
    buckets: [
      { min: 0.1, max: 5, label: "0.1kg - 5kg" },
      { min: 5, max: 10, label: "5kg - 10kg" },
      { min: 10, max: 15, label: "10kg - 15kg" },
      { min: 15, max: 20, label: "15kg - 20kg" },
      { min: 20, max: 25, label: "20kg - 25kg" }
    ]
  }
}
