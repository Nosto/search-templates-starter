import type { Meta, StoryObj } from "@storybook/preact"
import FilterTopbar from "./FilterTopbar"
import { withSearchContext } from ".storybook/decorators"

const meta: Meta<typeof FilterTopbar> = {
  title: "Components/FilterTopbar",
  component: FilterTopbar,
  tags: ["autodocs"],
  decorators: [withSearchContext],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A horizontal filter bar component that displays facets as dropdown filters. Uses the `useFacets()` hook to access available filters and provides both terms and range filter types."
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof FilterTopbar>

export const Default: Story = {
  name: "Default",
  parameters: {
    docs: {
      description: {
        story: "Default FilterTopbar showing multiple facet types including terms and range filters."
      }
    }
  }
}

export const WithMockData: Story = {
  name: "With Mock Data",
  parameters: {
    docs: {
      description: {
        story:
          "FilterTopbar with mock search context data showing real dropdown functionality for both terms and range facets."
      }
    }
  }
}
