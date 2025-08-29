import type { Meta, StoryObj } from "@storybook/preact"
import NostoCampaign from "./NostoCampaign"

export default {
  title: "Components/NostoCampaign",
  component: NostoCampaign,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "text",
      description: "The placement identifier for the Nosto campaign"
    }
  }
} as Meta<typeof NostoCampaign>

type Story = StoryObj<typeof NostoCampaign>

export const Default: Story = {
  render: () => <NostoCampaign placement="frontpage-nosto-1" />
}

export const MockedView: Story = {
  parameters: {
    docs: {
      description: {
        story: `This component requires Nosto to be initialized and a valid merchant ID. 
        In a real environment, it would fetch and display HTML content from the specified placement.
        The component shows a loading state while fetching and handles errors gracefully.`
      }
    }
  },
  render: () => (
    <div style={{ width: "400px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3 style={{ marginTop: 0 }}>NostoCampaign Component</h3>
      <p style={{ fontSize: "14px", color: "#666" }}>
        Placement: <code>product-recommendations</code>
      </p>
      <NostoCampaign placement="product-recommendations" />
      <p style={{ fontSize: "12px", color: "#999", marginBottom: 0 }}>
        Note: This component needs Nosto initialization to display actual content.
      </p>
    </div>
  )
}
