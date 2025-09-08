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
  render: () => (
    <div style={{ padding: "20px", border: "1px dashed #ccc", borderRadius: "4px" }}>
      <h3>Results Component</h3>
      <p>This component requires Nosto&apos;s useResponse hook which is not available in Storybook.</p>
      <p>In the actual application, this component renders search suggestions including keywords and products.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The Results component integrates with Nosto&apos;s search context to display autocomplete suggestions. This story shows a documentation mockup since the Nosto hooks are not available in Storybook."
      }
    }
  }
}
