import type { Meta, StoryObj } from "@storybook/preact"
import Keyword from "./Keyword"
import {
  mockKeyword,
  mockKeywordNoHighlight,
  mockKeywordWithRedirect,
  mockKeywordWithRedirectNoHighlight
} from "@mocks/keywords"
import { withAutocompleteContext } from ".storybook/decorators"

export default {
  title: "Autocomplete/Keyword",
  component: Keyword,
  parameters: {
    layout: "centered"
  },
  decorators: [withAutocompleteContext],
  tags: ["autodocs"]
} as Meta<typeof Keyword>

type Story = StoryObj<typeof Keyword>

export const Default: Story = {
  args: {
    keyword: mockKeyword,
    onSubmit: (query: string) => console.info("Search submitted:", query)
  }
}

export const WithoutHighlight: Story = {
  args: {
    keyword: mockKeywordNoHighlight,
    onSubmit: (query: string) => console.info("Search submitted:", query)
  },
  parameters: {
    docs: {
      description: {
        story: "Keyword without highlighting, displays plain text."
      }
    }
  }
}

export const WithRedirect: Story = {
  args: {
    keyword: mockKeywordWithRedirect,
    onSubmit: (query: string) => console.info("Search submitted:", query)
  },
  parameters: {
    docs: {
      description: {
        story: "Keyword with redirect URL - clicking will redirect instead of submitting search."
      }
    }
  }
}

export const WithRedirectNoHighlight: Story = {
  args: {
    keyword: mockKeywordWithRedirectNoHighlight,
    onSubmit: (query: string) => console.info("Search submitted:", query)
  },
  parameters: {
    docs: {
      description: {
        story: "Keyword with redirect URL but no highlighting."
      }
    }
  }
}
