import type { Meta, StoryObj } from "@storybook/preact"
import Results from "./Results"
import { withAutocompleteContext } from ".storybook/decorators"
import { OnSubmitProvider } from "../OnSubmitContext"

export default {
  title: "Autocomplete/Results",
  component: Results,
  decorators: [withAutocompleteContext],
  tags: ["autodocs"]
} as Meta<typeof Results>

type Story = StoryObj<typeof Results>

const styles = `
  *[data-nosto-element="autocomplete"] {
    position: unset !important;
  }
`

export const Default: Story = {
  render: () => (
    <>
      <style>{styles}</style>
      <OnSubmitProvider onSubmit={() => {}}>
        <Results onKeyDown={() => {}} />
      </OnSubmitProvider>
    </>
  )
}
