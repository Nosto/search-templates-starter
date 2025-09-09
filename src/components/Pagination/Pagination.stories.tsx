import type { Meta, StoryObj } from "@storybook/preact"
import Pagination from "./Pagination"

export default {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Pagination>

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {}
}
