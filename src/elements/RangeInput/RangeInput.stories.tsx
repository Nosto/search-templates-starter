import type { Meta, StoryObj } from "@storybook/preact"
import RangeInput from "./RangeInput"

export default {
  title: "Elements/RangeInput",
  component: RangeInput,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text"
    },
    value: {
      control: "number",
      description: "Input value"
    },
    min: {
      control: "number",
      description: "Minimum value"
    },
    max: {
      control: "number",
      description: "Maximum value"
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled"
    }
  }
} as Meta<typeof RangeInput>

type Story = StoryObj<typeof RangeInput>

export const Default: Story = {
  args: {
    placeholder: "Enter a number"
  }
}

export const WithValue: Story = {
  args: {
    value: 42,
    placeholder: "Enter a number"
  }
}

export const WithMinMax: Story = {
  args: {
    min: 0,
    max: 100,
    placeholder: "Enter 0-100"
  }
}

export const Disabled: Story = {
  args: {
    value: 25,
    disabled: true,
    placeholder: "Disabled input"
  }
}
