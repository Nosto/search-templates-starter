import type { Meta, StoryObj } from "@storybook/preact"
import Products from "./Products"

const meta: Meta<typeof Products> = {
  title: "Components/Products",
  component: Products,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Products />
}
