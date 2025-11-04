import type { Meta, StoryObj } from "@storybook/preact-vite"
import SelectedFilters from "./SelectedFilters"
import { withContainer, withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/SelectedFilters",
  component: SelectedFilters,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext, withContainer],
  tags: ["autodocs"]
} as Meta<typeof SelectedFilters>

type Story = StoryObj<typeof SelectedFilters>

export const Default: Story = {}
