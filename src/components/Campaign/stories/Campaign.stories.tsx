import type { Meta, StoryObj } from "@storybook/preact-vite"
import Campaign from "../Campaign"

const meta: Meta<typeof Campaign> = {
  title: "Components/Campaign",
  component: Campaign,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "text",
      description: "The placement identifier for the campaign"
    },
    useTemplate: {
      control: "boolean",
      description: "Whether to use template-based rendering"
    },
    api: {
      control: "text",
      description: "API endpoint configuration"
    },
    className: {
      control: "text",
      description: "Custom CSS class name"
    }
  }
}

export default meta
type Story = StoryObj<typeof Campaign>

export const Default: Story = {
  args: {}
}

export const WithPlacement: Story = {
  args: {
    placement: "homepage"
  }
}

export const WithTemplate: Story = {
  args: {
    placement: "category-page",
    useTemplate: true
  }
}

export const WithAPI: Story = {
  args: {
    placement: "product-page",
    useTemplate: true,
    api: "recommendations"
  }
}

export const WithCustomClass: Story = {
  args: {
    placement: "homepage",
    className: "custom-campaign-style"
  }
}

export const Complete: Story = {
  args: {
    placement: "homepage",
    useTemplate: true,
    api: "recommendations",
    className: "complete-campaign"
  }
}
