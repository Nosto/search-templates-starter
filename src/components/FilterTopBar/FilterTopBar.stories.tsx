import type { Meta, StoryObj } from "@storybook/preact"
import FilterTopBar from "./FilterTopBar"
import { withSearchContext } from ".storybook/decorators"

const meta: Meta<typeof FilterTopBar> = {
  title: "Components/FilterTopBar",
  component: FilterTopBar,
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
type Story = StoryObj<typeof FilterTopBar>

export const Default: Story = {
  name: "Default",
  parameters: {
    docs: {
      description: {
        story: "Default FilterTopBar showing multiple facet types including terms and range filters."
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
          "FilterTopBar with mock search context data showing real dropdown functionality for both terms and range facets."
      }
    }
  }
}
