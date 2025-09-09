import type { Meta, StoryObj } from "@storybook/preact"
import SectionHeader from "./SectionHeader"

export default {
  title: "Elements/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"]
} as Meta<typeof SectionHeader>

type Story = StoryObj<typeof SectionHeader>

export const Default: Story = {
  args: {
    children: "Section Header"
  }
}

export const Suggestions: Story = {
  args: {
    children: "Suggestions"
  }
}

export const Products: Story = {
  args: {
    children: "Products"
  }
}
