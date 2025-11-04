import type { Meta, StoryObj } from "@storybook/preact-vite"
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
