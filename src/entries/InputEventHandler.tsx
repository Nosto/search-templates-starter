import { useActions } from "@nosto/search-js/preact/hooks"
import { useEffect } from "preact/hooks"

type Props = {
  inputElement: HTMLInputElement
}

export default function InputEventHandler({ inputElement }: Props) {
  const { newSearch } = useActions()

  useEffect(() => {
    const handleInputChange = () => {
      const query = inputElement.value.trim()
      newSearch({ query })
    }

    inputElement.addEventListener("input", handleInputChange)

    return () => {
      inputElement.removeEventListener("input", handleInputChange)
    }
  }, [newSearch, inputElement])

  return null
}
