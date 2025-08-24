import type { Meta, StoryObj } from "@storybook/preact"
import SelectedFilters from "./SelectedFilters"

const meta: Meta<typeof SelectedFilters> = {
  title: "Components/SelectedFilters",
  component: SelectedFilters,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <SelectedFilters />
}
