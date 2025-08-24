import type { Meta, StoryObj } from "@storybook/preact"
import Select from "./Select"

const meta: Meta<typeof Select> = {
  title: "Elements/Select",
  component: Select,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description: "Array of options with value and label"
    },
    label: {
      control: "text",
      description: "Label for the select"
    },
    value: {
      control: "text",
      description: "Selected value"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" }
    ],
    label: "Choose an option",
    onChange: () => {}
  }
}

export const WithSelectedValue: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" }
    ],
    label: "Choose an option",
    value: "option2",
    onChange: () => {}
  }
}

export const ManyOptions: Story = {
  args: {
    options: [
      { value: 24, label: "24 items per page" },
      { value: 48, label: "48 items per page" },
      { value: 72, label: "72 items per page" },
      { value: 96, label: "96 items per page" }
    ],
    label: "Items per page",
    onChange: () => {}
  }
}
