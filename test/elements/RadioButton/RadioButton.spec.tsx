import { fireEvent, render } from "@testing-library/preact"
import { describe, expect, it, vi } from "vitest"
import RadioButton from "@/elements/RadioButton/RadioButton"

describe("RadioButton", () => {
  it("fires onClick when the selected option is clicked again", () => {
    const onClick = vi.fn()
    const { container } = render(<RadioButton name="price" value="0 - 100" selected={true} onClick={onClick} />)

    const input = container.querySelector('input[type="radio"]')

    expect(input).toBeTruthy()
    fireEvent.click(input!)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
