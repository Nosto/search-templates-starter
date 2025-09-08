import type { Meta, StoryObj } from "@storybook/preact"
import Skeleton from "./Skeleton"

export default {
  title: "Elements/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "text",
      description: "Width of the skeleton (string or number in pixels)"
    },
    height: {
      control: "text",
      description: "Height of the skeleton (string or number in pixels)"
    },
    className: {
      control: "text",
      description: "Additional CSS classes"
    }
  }
} as Meta<typeof Skeleton>

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {}
}

export const CustomSize: Story = {
  args: {
    width: 300,
    height: 400
  }
}

export const WithStringDimensions: Story = {
  args: {
    width: "100%",
    height: "250px"
  }
}

export const ProductCardSize: Story = {
  args: {
    width: 200,
    height: 300
  }
}
