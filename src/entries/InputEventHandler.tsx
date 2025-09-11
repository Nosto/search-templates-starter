import { useEventListener } from "@/hooks/useEventListener"
import { useActions } from "@nosto/search-js/preact/hooks"
import { useCallback } from "preact/hooks"

type Props = {
  inputElement: HTMLInputElement
}

export default function InputEventHandler({ inputElement }: Props) {
  const { newSearch } = useActions()

  const onInput = useCallback(() => {
    const query = inputElement.value.trim()
    newSearch({ query })
  }, [newSearch, inputElement])

  useEventListener({
    target: inputElement,
    eventName: "input",
    listener: onInput
  })
  return null
}
