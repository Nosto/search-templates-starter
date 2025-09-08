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
    <div style={{ width: "400px", padding: "20px", border: "1px solid #ccc" }}>
      <p>
        <strong>Results Component</strong>
      </p>
      <p>
        This component displays autocomplete search results including keywords and products. It requires Nosto search
        context to function properly and uses the useResponse hook to get search data.
      </p>
      <p>In a real application, this would show:</p>
      <ul>
        <li>Keyword suggestions</li>
        <li>Product suggestions</li>
        <li>Proper styling and interactions</li>
      </ul>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The Results component requires Nosto search context and useResponse hook. This mocked view shows the component structure."
      }
    }
  }
}
