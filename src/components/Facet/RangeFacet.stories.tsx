import type { Meta, StoryObj } from "@storybook/preact"
import RangeFacet from "./RangeFacet"

const mockRangeFacet = {
  id: "price",
  name: "Price",
  field: "price",
  type: "stats" as const,
  min: 10,
  max: 500
}

export default {
  title: "Components/Facet/RangeFacet",
  component: RangeFacet,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    facet: {
      control: "object",
      description: "Range facet configuration object"
    }
  }
} as Meta<typeof RangeFacet>

type Story = StoryObj<typeof RangeFacet>

export const Default: Story = {
  args: {
    facet: mockRangeFacet
  }
}

export const LargeRange: Story = {
  args: {
    facet: {
      id: "rating",
      name: "Customer Rating",
      field: "rating",
      type: "stats" as const,
      min: 1,
      max: 5
    }
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
    facet: {
      id: "weight",
      name: "Weight (kg)",
      field: "weight",
      type: "stats" as const,
      min: 0.1,
      max: 25.0
    }
  }
}
