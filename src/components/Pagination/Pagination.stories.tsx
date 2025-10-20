import type { Meta, StoryObj } from "@storybook/preact"
import Pagination from "./Pagination"
import { withSearchContext } from ".storybook/decorators"
import { h } from "preact"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { createStore } from "@nosto/search-js/preact/common"
import { mockConfig } from "@mocks/mocks"

export default {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof Pagination>

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {}
}

export const SinglePageHidden: Story = {
  decorators: [
    (Story) => {
      const singlePageState = {
        loading: false,
        initialized: true,
        query: {
          query: "limited results",
          products: {}
        },
        response: {
          query: "limited results", 
          products: {
            from: 0,
            size: 24,
            total: 5, // Only 5 results, so single page
            hits: [
              { id: "1", title: "Product 1", price: "10.00", currency: "EUR" },
              { id: "2", title: "Product 2", price: "20.00", currency: "EUR" },
              { id: "3", title: "Product 3", price: "30.00", currency: "EUR" },
              { id: "4", title: "Product 4", price: "40.00", currency: "EUR" },
              { id: "5", title: "Product 5", price: "50.00", currency: "EUR" }
            ],
            facets: []
          }
        }
      }

      return h(SearchPageProvider, {
        config: mockConfig,
        store: createStore(singlePageState),
        children: h(Story, {})
      })
    }
  ],
  parameters: {
    docs: {
      description: {
        story: "When there's only one page of results (totalPages <= 1), the pagination component returns null and renders nothing."
      }
    }
  }
}

export const MultiPageVisible: Story = {
  decorators: [
    (Story) => {
      const multiPageState = {
        loading: false,
        initialized: true,
        query: {
          query: "many results",
          products: {}
        },
        response: {
          query: "many results",
          products: {
            from: 0,
            size: 10,
            total: 25, // 25 results with size 10 = 3 pages
            hits: Array.from({ length: 10 }, (_, i) => ({
              id: `${i + 1}`,
              title: `Product ${i + 1}`,
              price: `${(i + 1) * 10}.00`,
              currency: "EUR"
            })),
            facets: []
          }
        }
      }

      return h(SearchPageProvider, {
        config: mockConfig,
        store: createStore(multiPageState),
        children: h(Story, {})
      })
    }
  ],
  parameters: {
    docs: {
      description: {
        story: "When there are multiple pages of results (totalPages > 1), the pagination component renders with page navigation."
      }
    }
  }
}
