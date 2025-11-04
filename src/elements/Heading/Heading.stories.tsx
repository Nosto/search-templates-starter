import type { Meta, StoryObj } from "@storybook/preact-vite"
import Heading from "./Heading"

export default {
  title: "Elements/Heading",
  component: Heading,
  tags: ["autodocs"]
} as Meta<typeof Heading>

type Story = StoryObj<typeof Heading>

export const Default: Story = {
  args: {
    children: "Default Heading (h3)"
  }
}

export const H1: Story = {
  args: {
    as: "h1",
    children: "Heading Level 1"
  }
}

export const H2: Story = {
  args: {
    as: "h2",
    children: "Heading Level 2"
  }
}

export const H4: Story = {
  args: {
    as: "h4",
    children: "Heading Level 4"
  }
}

export const H5: Story = {
  args: {
    as: "h5",
    children: "Heading Level 5"
  }
}

export const H6: Story = {
  args: {
    as: "h6",
    children: "Heading Level 6"
  }
}

export const Suggestions: Story = {
  args: {
    children: "Suggestions"
  }
}

export const Products: Story = {
  args: {
    children: "Products"
  }
}
