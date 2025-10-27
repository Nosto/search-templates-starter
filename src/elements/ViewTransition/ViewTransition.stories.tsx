import type { Meta, StoryObj } from "@storybook/preact"
import ViewTransition from "./ViewTransition"

export default {
  title: "Elements/ViewTransition",
  component: ViewTransition,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof ViewTransition>

type Story = StoryObj<typeof ViewTransition>

export const Default: Story = {
  args: {
    children: "Static content - no transitions"
  }
}

export const WithCustomName: Story = {
  args: {
    name: "custom-transition",
    children: "Content with custom transition name"
  }
}

export const MockedView: Story = {
  args: {
    name: "demo-counter",
    children: (
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "blue",
          padding: "20px",
          border: "2px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f8f9fa",
          textAlign: "center"
        }}
      >
        Count: 42
        <p style={{ fontSize: "14px", marginTop: "10px", color: "#666" }}>
          This is a mocked view showing how the component appears when integrated with state changes. In a real
          application, changing state would trigger view transitions.
        </p>
      </div>
    )
  }
}
