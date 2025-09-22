import type { Meta, StoryObj } from "@storybook/preact"
import Image from "./Image"

export default {
  title: "Elements/Image",
  component: Image,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Image>

type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    src: "https://cdn.shopify.com/static/sample-images/bath.jpeg"
  }
}

export const Fixed: Story = {
  args: {
    src: "https://cdn.shopify.com/static/sample-images/bath.jpeg",
    width: 400,
    height: 300,
    layout: "fixed"
  }
}

export const Constrained: Story = {
  args: {
    src: "https://cdn.shopify.com/static/sample-images/bath.jpeg",
    width: 800,
    height: 600,
    layout: "constrained"
  }
}

export const WithCrop: Story = {
  args: {
    src: "https://cdn.shopify.com/static/sample-images/bath.jpeg",
    width: 600,
    height: 400,
    layout: "constrained",
    crop: "center"
  }
}

export const AspectRatio: Story = {
  args: {
    src: "https://cdn.shopify.com/static/sample-images/bath.jpeg",
    aspectRatio: 16 / 9,
    layout: "fullWidth"
  }
}
