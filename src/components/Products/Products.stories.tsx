import type { Meta, StoryObj } from "@storybook/preact-vite"
import Products from "./Products"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/Products",
  component: Products,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof Products>

type Story = StoryObj<typeof Products>

export const Default: Story = {
  args: {}
}
