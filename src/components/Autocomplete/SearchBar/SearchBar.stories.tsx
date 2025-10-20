import type { Meta, StoryObj } from "@storybook/preact"
import SearchBar from "./SearchBar"
import { useState } from "preact/hooks"

export default {
  title: "Autocomplete/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof SearchBar>

type Story = StoryObj<typeof SearchBar>

export const Default: Story = {
  args: {
    value: "",
    placeholder: "Search",
    onSearchInput: (target: HTMLInputElement) => console.log("Search input:", target.value),
    onFocus: () => console.log("Search bar focused")
  }
}

export const WithValue: Story = {
  args: {
    value: "Sample search query",
    placeholder: "Search",
    onSearchInput: (target: HTMLInputElement) => console.log("Search input:", target.value),
    onFocus: () => console.log("Search bar focused")
  }
}

function InteractiveSearchBar() {
  const [value, setValue] = useState("")

  return (
    <SearchBar
      value={value}
      placeholder="Type to search..."
      onSearchInput={target => setValue(target.value)}
      onFocus={() => console.log("Search bar focused")}
    />
  )
}

export const Interactive: Story = {
  render: () => <InteractiveSearchBar />,
  parameters: {
    docs: {
      description: {
        story: "An interactive search bar that you can type in to see the value update in real time."
      }
    }
  }
}
