import type { Meta, StoryObj } from "@storybook/preact"
import ColorCircle from "./ColorCircle"

const meta: Meta<typeof ColorCircle> = {
  title: "Elements/ColorCircle",
  component: ColorCircle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A color circle component that displays a small circle with the specified color. Used within Pills for color facets."
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof ColorCircle>

export const Red: Story = {
  args: {
    color: "red"
  }
}

export const Blue: Story = {
  args: {
    color: "blue"
  }
}

export const Green: Story = {
  args: {
    color: "green"
  }
}

export const HexColor: Story = {
  args: {
    color: "#ff6600"
  }
}

export const RgbColor: Story = {
  args: {
    color: "rgb(128, 0, 128)"
  }
}

export const WithCustomClass: Story = {
  args: {
    color: "gold",
    className: "custom-class"
  }
}
