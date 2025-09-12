import type { Meta, StoryObj } from "@storybook/preact"

import Pill from "./Pill"

const meta: Meta<typeof Pill> = {
  title: "Elements/Pill",
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
    children: "Nike (42)",
    selected: false,
    onChange: () => {}
  }
}

export const Selected: Story = {
  args: {
    children: "Adidas (28)",
    selected: true,
    onChange: () => {}
  }
}

export const LowCount: Story = {
  args: {
    children: "Reebok (3)",
    selected: false,
    onChange: () => {}
  }
}

export const LongName: Story = {
  args: {
    children: "New Balance Running Shoes (157)",
    selected: false,
    onChange: () => {}
  }
}

export const FilterStyle: Story = {
  args: {
    children: "Brand: Nike",
    selected: true,
    onChange: () => {}
  }
}

export const DefaultUnselected: Story = {
  args: {
    children: "Optional Selected Prop",
    onChange: () => {}
  }
}
