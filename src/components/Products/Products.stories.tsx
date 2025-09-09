import type { Meta, StoryObj } from "@storybook/preact"
import Products from "./Products"

export default {
  title: "Components/Products",
  component: Products,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Products>

type Story = StoryObj<typeof Products>

export const Default: Story = {
  args: {}
}
