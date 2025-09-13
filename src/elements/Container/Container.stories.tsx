import type { Meta, StoryObj } from "@storybook/preact"
import Container from "./Container"

export default {
  title: "Elements/Container",
  component: Container,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Container>

type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    children: "Default container with default padding (--ns-space-2)",
    style: { border: "1px solid #ccc", minWidth: "200px" }
  }
}

export const SmallPadding: Story = {
  args: {
    padding: "1",
    children: "Container with small padding (--ns-space-1)",
    style: { border: "1px solid #ccc", minWidth: "200px" }
  }
}

export const MediumPadding: Story = {
  args: {
    padding: "3",
    children: "Container with medium padding (--ns-space-3)",
    style: { border: "1px solid #ccc", minWidth: "200px" }
  }
}

export const LargePadding: Story = {
  args: {
    padding: "5",
    children: "Container with large padding (--ns-space-5)",
    style: { border: "1px solid #ccc", minWidth: "200px" }
  }
}

export const ExtraSmallPadding: Story = {
  args: {
    padding: "05",
    children: "Container with extra small padding (--ns-space-05)",
    style: { border: "1px solid #ccc", minWidth: "200px" }
  }
}

export const PixelBasedPadding10: Story = {
  args: {
    padding: "10",
    children: "Container with 10px padding (--ns-space-10)",
    style: { border: "1px solid #ccc", minWidth: "200px" }
  }
}

export const PixelBasedPadding16: Story = {
  args: {
    padding: "16",
    children: "Container with 16px padding (--ns-space-16)",
    style: { border: "1px solid #ccc", minWidth: "200px" }
  }
}

export const WithNestedContent: Story = {
  args: {
    padding: "4",
    children: (
      <>
        <h3>Nested Content</h3>
        <p>This container has padding and contains multiple elements.</p>
        <button>Click me</button>
      </>
    ),
    style: { border: "1px solid #ccc", minWidth: "300px" }
  }
}
