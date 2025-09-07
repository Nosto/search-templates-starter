import { useActions } from "@nosto/search-js/preact/hooks"
import { useEffect } from "preact/hooks"

export default function InputEventHandler() {
  const { newSearch } = useActions()

  useEffect(() => {
    const searchInput = document.querySelector<HTMLInputElement>("#search")

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
  }, [newSearch])

  return null
}
