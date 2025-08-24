import type { Meta, StoryObj } from "@storybook/preact"
import BottomToolbar from "./BottomToolbar"

const meta: Meta<typeof BottomToolbar> = {
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
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <BottomToolbar />
}
