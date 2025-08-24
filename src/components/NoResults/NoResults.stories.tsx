import type { Meta, StoryObj } from "@storybook/preact"
import NoResults from "./NoResults"

export default {
  title: "Components/NoResults",
  component: NoResults,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof NoResults>

type Story = StoryObj<typeof NoResults>

export const Default: Story = {}
