import type { Meta, StoryObj } from "@storybook/preact"
import TermsDropdown from "./TermsDropdown"
import { mockCategoryFacet, mockBrandFacet } from "@mocks/facets"
import { withSearchContext, withContainer } from ".storybook/decorators"

export default {
  title: "Components/FilterTopbar/TermsDropdown",
  component: TermsDropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A terms filter dropdown component that displays a list of filterable options with checkboxes. Uses the `useFacet()` hook for filter state management and shows a reset button only when filters are active."
      }
    }
  },
  decorators: [withSearchContext, withContainer],
  tags: ["autodocs"]
} as Meta<typeof TermsDropdown>

type Story = StoryObj<typeof TermsDropdown>

export const Default: Story = {
  args: {
    facet: mockCategoryFacet
  },
  parameters: {
    docs: {
      description: {
        story: "Default category terms dropdown showing facet name as trigger value and expandable checkbox list."
      }
    }
  }
}

export const WithSelectedFilters: Story = {
  args: {
    facet: {
      ...mockCategoryFacet,
      data: [
        { value: "shoes", count: 42, selected: true },
        { value: "clothing", count: 28, selected: true },
        { value: "accessories", count: 15, selected: false }
      ]
    }
  },
  parameters: {
    docs: {
      description: {
        story:
          "Terms dropdown with multiple selected filters showing the selected count and reset button. Notice how the reset button appears when filters are active."
      }
    }
  }
}

export const BrandFacet: Story = {
  args: {
    facet: mockBrandFacet
  },
  parameters: {
    docs: {
      description: {
        story:
          "Brand terms dropdown with a larger list of options, demonstrating the component with many filter choices."
      }
    }
  }
}

export const NoOptions: Story = {
  args: {
    facet: {
      id: "empty",
      name: "Empty Facet",
      field: "empty",
      type: "terms",
      data: []
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Terms dropdown with no available options, showing how the component handles empty data gracefully."
      }
    }
  }
}
