import type { Meta, StoryObj } from "@storybook/preact"

import Pill from "./Pill"

const meta: Meta<typeof Pill> = {
  title: "Components/Facet/Pill",
  component: Pill,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" }
  }
}

export default meta
type Story = StoryObj<typeof Pill>

export const Default: Story = {
  args: {
    value: "Nike",
    count: 42,
    selected: false,
    onChange: () => {}
  }
}

export const Selected: Story = {
  args: {
    value: "Adidas",
    count: 28,
    selected: true,
    onChange: () => {}
  }
}

export const LowCount: Story = {
  args: {
    value: "Reebok",
    count: 3,
    selected: false,
    onChange: () => {}
  }
}

export const LongName: Story = {
  args: {
    value: "New Balance Running Shoes",
    count: 157,
    selected: false,
    onChange: () => {}
  }
}
