import { useActions } from "@nosto/search-js/preact/hooks"
import { useEffect } from "preact/hooks"

type Props = {
  inputSelector: string
  formSelector?: string
}

export default function FormSubmitHandler({ inputSelector, formSelector }: Props) {
  const { newSearch } = useActions()

  useEffect(() => {
    const searchForm = formSelector ? document.querySelector<HTMLFormElement>(formSelector) : null
    const searchInput = document.querySelector<HTMLInputElement>(inputSelector)

    if (searchInput && (searchForm || !formSelector)) {
      const handleFormSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        const query = searchInput.value.trim()
        if (query) {
          newSearch({ query })
        }
      }

      if (searchForm) {
        searchForm.addEventListener("submit", handleFormSubmit)
      }

      return () => {
        if (searchForm) {
          searchForm.removeEventListener("submit", handleFormSubmit)
        }
      }
    }
  }, [newSearch, inputSelector, formSelector])

  return null
}
