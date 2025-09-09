import type { Meta, StoryObj } from "@storybook/preact"
import BottomToolbar from "./BottomToolbar"

export default {
  title: "Components/BottomToolbar",
  component: BottomToolbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "The BottomToolbar component displays pagination controls and items per page selection."
      }
    }
  },
  tags: ["autodocs"]
} as Meta<typeof BottomToolbar>

type Story = StoryObj<typeof BottomToolbar>

export const Default: Story = {
  args: {}
}
