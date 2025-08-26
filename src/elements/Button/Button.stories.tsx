import type { Meta, StoryObj } from "@storybook/preact"
import Button from "./Button"

export default {
  title: "Elements/Button",
  component: Button,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    light: {
      control: "boolean",
      description: "Light variant of the button"
    },
    icon: {
      control: "select",
      options: [
        "close",
        "arrow",
        "arrow-left",
        "arrow-right",
        "arrow-up",
        "arrow-down",
        "search",
        "page-prev",
        "page-next",
        "filter"
      ],
      description: "Icon to display in the button"
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled"
    },
    children: {
      control: "text",
      description: "Button content"
    }
  }
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
