import type { Meta, StoryObj } from "@storybook/preact-vite"
import Campaign from "./Campaign"

export default {
  title: "Elements/Campaign",
  component: Campaign,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Campaign>

type Story = StoryObj<typeof Campaign>

export const WithPlacement: Story = {
  args: {
    placement: "homepage-banner"
  },
  render: (args) => (
    <div style={{ width: "600px", padding: "20px", border: "1px solid #ccc" }}>
      <Campaign {...args}>
        <div style={{ padding: "20px", background: "#f5f5f5", textAlign: "center" }}>
          Campaign content with placement
        </div>
      </Campaign>
    </div>
  )
}

export const WithId: Story = {
  args: {
    id: "campaign-123"
  },
  render: (args) => (
    <div style={{ width: "600px", padding: "20px", border: "1px solid #ccc" }}>
      <Campaign {...args}>
        <div style={{ padding: "20px", background: "#f5f5f5", textAlign: "center" }}>
          Campaign content with id
        </div>
      </Campaign>
    </div>
  )
}

export const WithBothIdAndPlacement: Story = {
  args: {
    id: "campaign-456",
    placement: "homepage-banner"
  },
  render: (args) => (
    <div style={{ width: "600px", padding: "20px", border: "1px solid #ccc" }}>
      <Campaign {...args}>
        <div style={{ padding: "20px", background: "#f5f5f5", textAlign: "center" }}>
          Campaign content with both id and placement
        </div>
      </Campaign>
    </div>
  )
}
