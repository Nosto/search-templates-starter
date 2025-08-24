import type { Meta, StoryObj } from "@storybook/preact"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import BottomToolbar from "./BottomToolbar"

const meta: Meta<typeof BottomToolbar> = {
  title: "Components/BottomToolbar",
  component: BottomToolbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The BottomToolbar component displays pagination controls and items per page selection."
      }
    }
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

// Mock config for Storybook that provides search context
const mockConfig = {
  defaultCurrency: "EUR",
  search: {
    hitDecorators: []
  }
}

export const Default: Story = {
  render: () => (
    <div style={{ padding: "1rem" }}>
      <p style={{ color: "#666", marginBottom: "1rem" }}>
        This component requires Nosto search context to function properly.
      </p>
      <BottomToolbar />
    </div>
  )
}

export const WithMockedContext: Story = {
  render: () => (
    <SearchPageProvider 
      config={mockConfig}
      initialState={{
        search: {
          query: "",
          filters: [],
          sort: { field: "_score", order: "desc" }
        },
        products: {
          from: 1,
          size: 24,
          total: 142,
          hits: []
        }
      }}
    >
      <BottomToolbar />
    </SearchPageProvider>
  )
}
