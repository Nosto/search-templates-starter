import type { Meta, StoryObj } from "@storybook/preact"
import Rating from "./Rating"

export default {
  title: "Elements/Rating",
  component: Rating,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Rating>

type Story = StoryObj<typeof Rating>

export const Default: Story = {
  args: {
    ratingValue: 4.5,
    reviewCount: 127
  }
}

export const FiveStars: Story = {
  args: {
    ratingValue: 5,
    reviewCount: 89
  }
}

export const ThreeStars: Story = {
  args: {
    ratingValue: 3,
    reviewCount: 42
  }
}

export const OneAndHalf: Story = {
  args: {
    ratingValue: 1.5,
    reviewCount: 8
  }
}

export const NoRating: Story = {
  args: {
    ratingValue: 0,
    reviewCount: 0
  }
}

export const HighReviewCount: Story = {
  args: {
    ratingValue: 4.2,
    reviewCount: 1582
  }
}
