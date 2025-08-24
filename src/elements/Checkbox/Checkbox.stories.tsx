import type { Meta, StoryObj } from "@storybook/preact"
import Checkbox from "./Checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Elements/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Label text for the checkbox"
    },
    selected: {
      control: "boolean",
      description: "Whether the checkbox is checked"
    },
    className: {
      control: "text",
      description: "Additional CSS classes"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

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
