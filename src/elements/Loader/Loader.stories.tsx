import type { Meta, StoryObj } from "@storybook/preact"
import Loader from "./Loader"

export default {
  title: "Elements/Loader",
  component: Loader,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes"
    }
  }
} as Meta<typeof Loader>

type Story = StoryObj<typeof Loader>

export const Default: Story = {
  args: {}
}
