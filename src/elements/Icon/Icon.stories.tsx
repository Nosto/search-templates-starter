import type { Meta, StoryObj } from "@storybook/preact"
import Icon from "./Icon"

const meta: Meta<typeof Icon> = {
  title: "Elements/Icon",
  component: Icon,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
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
      description: "Icon name to display"
    },
    className: {
      control: "text",
      description: "Additional CSS classes"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Close: Story = {
  args: {
    name: "close"
  }
}

export const Search: Story = {
  args: {
    name: "search"
  }
}

export const ArrowUp: Story = {
  args: {
    name: "arrow-up"
  }
}

export const ArrowDown: Story = {
  args: {
    name: "arrow-down"
  }
}

export const ArrowLeft: Story = {
  args: {
    name: "arrow-left"
  }
}

export const ArrowRight: Story = {
  args: {
    name: "arrow-right"
  }
}

export const PagePrev: Story = {
  args: {
    name: "page-prev"
  }
}

export const PageNext: Story = {
  args: {
    name: "page-next"
  }
}

export const Filter: Story = {
  args: {
    name: "filter"
  }
}
