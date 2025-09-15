import type { Meta, StoryObj } from "@storybook/preact"
import DualRange from "./DualRange"

export default {
  title: "Elements/DualRange",
  component: DualRange,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof DualRange>

type Story = StoryObj<typeof DualRange>

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    value: [0, 100],
    onChange: () => {},
    id: "default-range"
  }
}

export const PriceRange: Story = {
  args: {
    min: 10,
    max: 500,
    value: [25, 75],
    onChange: () => {},
    id: "price-range"
  }
}

export const RatingRange: Story = {
  args: {
    min: 1,
    max: 5,
    value: [2, 4],
    onChange: () => {},
    id: "rating-range"
  }
}
