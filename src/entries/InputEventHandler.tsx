import { useActions } from "@nosto/search-js/preact/hooks"
import { useEffect } from "preact/hooks"

type Props = {
  selector: string
}

export default function InputEventHandler({ selector }: Props) {
  const { newSearch } = useActions()

  useEffect(() => {
    const searchInput = document.querySelector<HTMLInputElement>(selector)

    if (searchInput) {
      const handleInputChange = () => {
        const query = searchInput.value.trim()
        newSearch({ query })
      }

      searchInput.addEventListener("input", handleInputChange)

      return () => {
        searchInput.removeEventListener("input", handleInputChange)
      }
    }
  }, [newSearch, selector])

  return null
}
