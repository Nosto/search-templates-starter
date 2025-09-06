import type { Meta, StoryObj } from "@storybook/preact"
import SectionHeader from "./SectionHeader"

const meta: Meta<typeof SectionHeader> = {
  title: "Elements/SectionHeader",
  component: SectionHeader,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    children: {
      control: "text",
      description: "The text content to display in the section header"
    }
  }
}

export default meta
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
