import type { Meta, StoryObj } from "@storybook/preact-vite"

import Pill from "./Pill"

const meta: Meta<typeof Pill> = {
  title: "Elements/Pill",
  component: Pill,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" }
  }
}

export default meta
type Story = StoryObj<typeof Pill>

export const Default: Story = {
  args: {
    children: "Nike (42)",
    selected: false,
    onClick: () => {}
  }
}

export const Selected: Story = {
  args: {
    children: "Adidas (28)",
    selected: true,
    onClick: () => {}
  }
}

export const LowCount: Story = {
  args: {
    children: "Reebok (3)",
    selected: false,
    onClick: () => {}
  }
}

export const LongName: Story = {
  args: {
    children: "New Balance Running Shoes (157)",
    selected: false,
    onClick: () => {}
  }
}

export const FilterStyle: Story = {
  args: {
    children: "Brand: Nike",
    selected: true,
    onClick: () => {}
  }
}

export const DefaultUnselected: Story = {
  args: {
    children: "Optional Selected Prop"
  }
}

export const NoClickHandler: Story = {
  args: {
    children: "No Click Handler",
    selected: false
  }
}
