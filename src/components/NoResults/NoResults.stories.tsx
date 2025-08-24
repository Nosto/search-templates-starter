import type { Meta, StoryObj } from "@storybook/preact"
import NoResults from "./NoResults"

const meta: Meta<typeof NoResults> = {
  title: "Components/NoResults",
  component: NoResults,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
