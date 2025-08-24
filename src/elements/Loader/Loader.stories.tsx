import type { Meta, StoryObj } from "@storybook/preact"
import Loader from "./Loader"

const meta: Meta<typeof Loader> = {
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
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
