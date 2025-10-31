import type { Meta, StoryObj } from "@storybook/preact"
import SimpleCard from "./SimpleCard"

const meta: Meta<typeof SimpleCard> = {
  title: "Elements/SimpleCard",
  component: SimpleCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
}

export default meta
type Story = StoryObj<typeof SimpleCard>

export const Default: Story = {
  args: {
    handle: "nike-air-max"
  }
}

export const WithAlternate: Story = {
  args: {
    handle: "nike-air-max",
    alternate: true
  }
}

export const WithBrand: Story = {
  args: {
    handle: "nike-air-max",
    brand: true
  }
}

export const WithDiscount: Story = {
  args: {
    handle: "nike-air-max",
    discount: true
  }
}

export const WithRating: Story = {
  args: {
    handle: "nike-air-max",
    rating: 4.5
  }
}

export const WithAllFeatures: Story = {
  args: {
    handle: "nike-air-max",
    alternate: true,
    brand: true,
    discount: true,
    rating: 4.8,
    sizes: "(min-width: 768px) 33vw, 100vw"
  }
}
