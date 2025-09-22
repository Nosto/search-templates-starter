import type { Meta, StoryObj } from "@storybook/preact"
import Campaign from "./Campaign"

export default {
  title: "Elements/Campaign",
  component: Campaign,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Campaign>

type Story = StoryObj<typeof Campaign>

export const Default: Story = {
  args: {
    placement: "home-top"
  }
}

export const WithProductId: Story = {
  args: {
    placement: "product-page",
    productId: "123",
    variantId: "456"
  }
}

export const WithTemplate: Story = {
  args: {
    placement: "category-top",
    template: "custom-template",
    init: "true"
  }
}

export const Lazy: Story = {
  args: {
    placement: "footer",
    lazy: true
  }
}
