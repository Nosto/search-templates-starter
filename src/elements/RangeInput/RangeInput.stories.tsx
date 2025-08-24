import type { Meta, StoryObj } from "@storybook/preact"
import RangeInput from "./RangeInput"

const meta: Meta<typeof RangeInput> = {
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
}

export default meta
type Story = StoryObj<typeof meta>

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
