import type { Meta, StoryObj } from "@storybook/preact-vite"
import Pagination from "./Pagination"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof Pagination>

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {}
}
