import type { Meta, StoryObj } from "@storybook/preact"
import Facet from "./Facet"

// Mock facet data for Storybook
const mockFacet = {
  id: "category",
  name: "Category",
  field: "categories",
  type: "terms" as const,
  data: [
    { value: "shoes", count: 42, selected: false },
    { value: "clothing", count: 28, selected: true },
    { value: "accessories", count: 15, selected: false }
  ]
}

const meta: Meta<typeof Facet> = {
  title: "Components/Facet/Facet",
  component: Facet,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Facet facet={mockFacet} />
}

export const WithSelectedFilters: Story = {
  render: () => (
    <Facet 
      facet={{
        ...mockFacet,
        data: [
          { value: "shoes", count: 42, selected: true },
          { value: "clothing", count: 28, selected: true },
          { value: "accessories", count: 15, selected: false }
        ]
      }} 
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Facet with multiple selected filters showing the selected count badge."
      }
    }
  }
}

export const LargeFacet: Story = {
  render: () => (
    <Facet 
      facet={{
        id: "brand",
        name: "Brand",
        field: "brand",
        type: "terms" as const,
        data: [
          { value: "nike", count: 125, selected: false },
          { value: "adidas", count: 98, selected: true },
          { value: "puma", count: 67, selected: false },
          { value: "reebok", count: 45, selected: false },
          { value: "new-balance", count: 34, selected: false },
          { value: "under-armour", count: 23, selected: false }
        ]
      }}
    />
  )
}
