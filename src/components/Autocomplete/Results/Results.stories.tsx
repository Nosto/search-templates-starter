import type { Meta, StoryObj } from "@storybook/preact"
import Results from "./Results"

export default {
  title: "Components/Autocomplete/Results",
  component: Results,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Results>

type Story = StoryObj<typeof Results>

export const MockedView: Story = {
  render: () => <Results onSubmit={(query: string) => console.log("Search submitted:", query)} />,
  parameters: {
    docs: {
      description: {
        story:
          "The Results component integrates with Nosto's search context to display autocomplete suggestions. Note: This component depends on Nosto hooks which are not available in Storybook, so it may not render properly."
      }
    }
  }
}
