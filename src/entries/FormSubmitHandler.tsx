import { useActions } from "@nosto/search-js/preact/hooks"
import { useEffect } from "preact/hooks"

export default function FormSubmitHandler() {
  const { newSearch } = useActions()

  useEffect(() => {
    const searchForm = document.querySelector<HTMLFormElement>("#search-form")
    const searchInput = document.querySelector<HTMLInputElement>("#search")

    if (searchForm && searchInput) {
      const handleFormSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        const query = searchInput.value.trim()
        if (query) {
          newSearch({ query })
        }
      }

      searchForm.addEventListener("submit", handleFormSubmit)

      return () => {
        searchForm.removeEventListener("submit", handleFormSubmit)
      }
    }
  }, [newSearch])

  return null
}
