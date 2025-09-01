import type { Meta, StoryObj } from "@storybook/preact-vite"
import DynamicCard from "../DynamicCard"

const meta: Meta<typeof DynamicCard> = {
  title: "Components/DynamicCard",
  component: DynamicCard,
  tags: ["autodocs"],
  argTypes: {
    keyProp: {
      control: "text",
      description: "Unique identifier for the card (maps to key attribute)"
    },
    handles: {
      control: "text",
      description: "Product handles for Shopify integration"
    },
    product: {
      control: "text",
      description: "Product identifier"
    },
    target: {
      control: "text",
      description: "Target selector for recommendations"
    },
    className: {
      control: "text",
      description: "Custom CSS class name"
    }
  }
}

export default meta
type Story = StoryObj<typeof DynamicCard>

export const Default: Story = {
  args: {}
}

export const WithKey: Story = {
  args: {
    keyProp: "product-card"
  }
}

export const WithHandles: Story = {
  args: {
    keyProp: "shopify-product",
    handles: "example-product-handle"
  }
}

export const WithProduct: Story = {
  args: {
    keyProp: "featured-product",
    product: "product-123"
  }
}

export const WithTarget: Story = {
  args: {
    keyProp: "recommendation-card",
    target: ".recommendation-container"
  }
}

export const WithCustomClass: Story = {
  args: {
    keyProp: "styled-card",
    className: "custom-dynamic-card"
  }
}

export const Complete: Story = {
  args: {
    keyProp: "complete-card",
    handles: "example-product",
    product: "product-456",
    target: ".target-container",
    className: "complete-dynamic-card"
  }
}
