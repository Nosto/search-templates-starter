import type { Meta, StoryObj } from "@storybook/preact"
import { useState } from "preact/hooks"
import Backdrop from "./Backdrop"

function InteractiveBackdrop() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? "Hide" : "Show"} Backdrop</button>
      <div style={{ marginTop: "20px", color: "#666" }}>
        {isVisible ? "Click the backdrop to hide it" : "Click the button to show the backdrop"}
      </div>
      <Backdrop isVisible={isVisible} onClick={() => setIsVisible(false)} />
    </div>
  )
}

export default {
  title: "Autocomplete/Backdrop",
  component: Backdrop,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} as Meta<typeof Backdrop>

type Story = StoryObj<typeof Backdrop>

export const Default: Story = {
  args: {
    isVisible: true,
    onClick: () => console.log("Backdrop clicked")
  }
}

export const Interactive: Story = {
  render: () => <InteractiveBackdrop />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo showing the backdrop with minimal opacity that can be toggled on/off. Click the backdrop to dismiss it."
      }
    }
  }
}
