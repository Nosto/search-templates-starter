import type { Meta, StoryObj } from "@storybook/preact"
import SelectedFilters from "./SelectedFilters"

export default {
  title: "Components/SelectedFilters",
  component: SelectedFilters,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof SelectedFilters>

type Story = StoryObj<typeof SelectedFilters>

export const Default: Story = {
  render: () => (
    <div style="width: 600px">
      <SelectedFilters />
    </div>
  )
}
