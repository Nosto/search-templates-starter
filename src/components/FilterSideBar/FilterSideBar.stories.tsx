import type { Meta, StoryObj } from "@storybook/preact"
import FilterSideBar from "./FilterSideBar"
import { FilterSideBarProvider } from "@/contexts/FilterSideBarContext"
import { withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/FilterSideBar",
  component: FilterSideBar,
  parameters: {
    layout: "centered"
  },
  decorators: [withSearchContext],
  tags: ["autodocs"]
} as Meta<typeof FilterSideBar>

type Story = StoryObj<typeof FilterSideBar>

export const MockedView: Story = {
  render: () => (
    <FilterSideBarProvider initialOpen={true}>
      <div style={{ position: "relative", width: "300px", height: "800px" }}>
        <FilterSideBar />
      </div>
    </FilterSideBarProvider>
  )
}
