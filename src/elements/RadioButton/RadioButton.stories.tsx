import type { Meta, StoryObj } from "@storybook/preact-vite"
import RadioButton from "./RadioButton"

export default {
  title: "Elements/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof RadioButton>

type Story = StoryObj<typeof RadioButton>

export const Default: Story = {
  args: {
    name: "example",
    value: "Radio Button Label",
    selected: false,
    onChange: () => {}
  }
}

export const Selected: Story = {
  args: {
    name: "example",
    value: "Selected Radio Button",
    selected: true,
    onChange: () => {}
  }
}

export const LongLabel: Story = {
  args: {
    name: "example",
    value: "This is a radio button with a very long label that might wrap to multiple lines",
    selected: false,
    onChange: () => {}
  }
}

export const PriceRange: Story = {
  args: {
    name: "price",
    value: "£0 - £250",
    selected: false,
    onChange: () => {}
  },
  parameters: {
    docs: {
      description: {
        story: "Radio button displaying a price range label, similar to its usage in RangeSelector."
      }
    }
  }
}
