import type { Meta, StoryObj } from "@storybook/preact-vite"
import Button from "./Button"

export default {
  title: "Elements/Button",
  component: Button,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: "Button"
  }
}

export const WithIcon: Story = {
  args: {
    children: "Search",
    icon: "search"
  }
}

export const Light: Story = {
  args: {
    children: "Light Button",
    light: true
  }
}

export const IconOnly: Story = {
  args: {
    icon: "close"
  }
}

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true
  }
}
