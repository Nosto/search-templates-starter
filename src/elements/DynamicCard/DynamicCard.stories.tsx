import type { Meta, StoryObj } from "@storybook/preact"
import DynamicCard from "./DynamicCard"

export default {
  title: "Elements/DynamicCard",
  component: DynamicCard,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof DynamicCard>

type Story = StoryObj<typeof DynamicCard>

export const Default: Story = {
  args: {
    handle: "product-handle"
  }
}

export const WithTemplate: Story = {
  args: {
    handle: "sample-product",
    template: "card",
    section: "main"
  }
}

export const WithVariant: Story = {
  args: {
    handle: "variant-product",
    variantId: "789",
    template: "detailed"
  }
}

export const Lazy: Story = {
  args: {
    handle: "lazy-product",
    lazy: true,
    placeholder: true
  }
}
