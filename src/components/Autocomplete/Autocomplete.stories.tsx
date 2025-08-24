import type { Meta, StoryObj } from "@storybook/preact"
import Autocomplete from "./Autocomplete"

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Autocomplete 
      onSubmit={(input: string) => console.log("Search submitted:", input)}
    />
  )
}

export const Interactive: Story = {
  render: () => (
    <Autocomplete 
      onSubmit={(input: string) => console.log("Search submitted:", input)}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Type in the search box to see autocomplete suggestions appear. The component uses Nosto search context for suggestions."
      }
    }
  }
}
