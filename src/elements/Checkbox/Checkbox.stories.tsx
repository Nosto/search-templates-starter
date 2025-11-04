import type { Meta, StoryObj } from "@storybook/preact-vite"
import Checkbox from "./Checkbox"

export default {
  title: "Elements/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Checkbox>

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    value: "Checkbox Label",
    selected: false,
    onChange: () => {}
  }
}

export const Selected: Story = {
  args: {
    value: "Selected Checkbox",
    selected: true,
    onChange: () => {}
  }
}

export const LongLabel: Story = {
  args: {
    value: "This is a checkbox with a very long label that might wrap to multiple lines",
    selected: false,
    onChange: () => {}
  }
}
